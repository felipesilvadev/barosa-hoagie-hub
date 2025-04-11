import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { HoagieCommentsRepository } from 'src/domain/repositories/hoagie-comments-repository'
import { CommentDocument } from '../schemas/comment.schema'
import { HoagieComment } from 'src/domain/entities/hoagie-comment'
import { HoagieCommentMapper } from '../mappers/mongoose-hoagie-comment-mapper'

@Injectable()
export class MongooseHoagieCommentsRepository
  implements HoagieCommentsRepository
{
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
  ) {}

  async create(hoagieComment: HoagieComment): Promise<void> {
    const data = HoagieCommentMapper.toMongoose(hoagieComment)

    await this.commentModel.create(data)
  }
}
