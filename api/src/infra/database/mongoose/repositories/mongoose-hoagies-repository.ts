import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Hoagie } from 'src/domain/entities/hoagie'
import { HoagiesRepository } from 'src/domain/repositories/hoagies-repository'
import { FindAllHoagiesResult } from 'src/domain/dtos/find-all-hoagies-result'
import { FindHoagieByIdResult } from 'src/domain/dtos/find-hoagie-by-id-result'
import { HoagieDocument } from '../schemas/hoagie.schema'
import { HoagieMapper } from '../mappers/mongoose-hoagie-mapper'
import { hasPopulatedField } from '../utils/has-populated-field'

@Injectable()
export class MongooseHoagiesRepository implements HoagiesRepository {
  constructor(
    @InjectModel('Hoagie') private hoagieModel: Model<HoagieDocument>,
  ) {}

  async findAll(page: number): Promise<FindAllHoagiesResult> {
    const perPage = 10
    const skip = (page - 1) * perPage

    const [hoagieDocs, total] = await Promise.all([
      this.hoagieModel
        .aggregate([
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: perPage },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'hoagieId',
              as: 'comments',
            },
          },
          {
            $addFields: {
              commentCount: { $size: '$comments' },
            },
          },
          {
            $project: {
              picture: 0,
              comments: 0,
            },
          },
        ])
        .exec(),
      this.hoagieModel.countDocuments().exec(),
    ])

    const hoagies = hoagieDocs.map((hoagie) => {
      return {
        item: HoagieMapper.toDomain(hoagie),
        commentCount: hoagie.commentCount as number,
      }
    })

    return { hoagies, total, perPage }
  }

  async findById(id: string): Promise<FindHoagieByIdResult | null> {
    const hoagie = await this.hoagieModel
      .findById(id)
      .populate('creatorId', 'name')
      .exec()

    if (!hoagie) return null

    const creatorName = hasPopulatedField(hoagie.creatorId, 'name')
      ? (hoagie.creatorId.name as string)
      : 'Unknown creator'

    const comments = await this.hoagieModel.db
      .collection('comments')
      .aggregate([
        { $match: { hoagieId: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            _id: 1,
            text: 1,
            createdAt: 1,
            user: {
              _id: '$user._id',
              name: '$user.name',
            },
          },
        },
      ])
      .toArray()

    return {
      hoagie: HoagieMapper.toDomain(hoagie),
      creatorName,
      comments: comments.map((comment) => ({
        id: comment._id.toString(),
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user._id.toString(),
          name: comment.user.name,
        },
      })),
    }
  }

  async findByUserId(userId: string): Promise<Hoagie[]> {
    const hoagies = await this.hoagieModel
      .find({ creatorId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .select('-picture')
      .exec()

    return hoagies.map(HoagieMapper.toDomain)
  }

  async create(hoagie: Hoagie): Promise<void> {
    const data = HoagieMapper.toMongoose(hoagie)

    await this.hoagieModel.create(data)
  }
}
