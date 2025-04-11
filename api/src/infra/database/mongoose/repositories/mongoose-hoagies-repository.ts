import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

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
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .select('-picture')
        .exec(),
      this.hoagieModel.countDocuments().exec(),
    ])

    const hoagies = hoagieDocs.map(HoagieMapper.toDomain)

    return { hoagies, total, perPage }
  }

  async findById(id: string): Promise<FindHoagieByIdResult | null> {
    const hoagie = await this.hoagieModel
      .findById(id)
      .populate('creatorId', 'name')
      .exec()

    if (!hoagie) return null

    if (hasPopulatedField(hoagie.creatorId, 'name')) {
      const creatorName = hoagie.creatorId.name as string

      return {
        hoagie: HoagieMapper.toDomain(hoagie),
        creatorName,
      }
    }

    return {
      hoagie: HoagieMapper.toDomain(hoagie),
      creatorName: 'Unknown creator',
    }
  }

  async findByUserId(userId: string): Promise<Hoagie[]> {
    const hoagies = await this.hoagieModel
      .find({ creatorId: userId })
      .sort({ createdAt: -1 })
      .select('-picture')
      .exec()

    return hoagies.map(HoagieMapper.toDomain)
  }

  async save(hoagie: Hoagie): Promise<void> {
    const data = HoagieMapper.toMongoose(hoagie)

    await this.hoagieModel.updateOne(
      { _id: hoagie.id.toValue },
      { $set: data },
      { upsert: false },
    )
  }

  async create(hoagie: Hoagie): Promise<void> {
    const data = HoagieMapper.toMongoose(hoagie)

    await this.hoagieModel.create(data)
  }
}
