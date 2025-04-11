import { Types } from 'mongoose'

import { HoagieComment } from 'src/domain/entities/hoagie-comment'

export class HoagieCommentMapper {
  static toMongoose(hoagieComment: HoagieComment) {
    return {
      text: hoagieComment.text,
      userId: new Types.ObjectId(hoagieComment.userId.toValue()),
      hoagieId: new Types.ObjectId(hoagieComment.hoagieId.toValue()),
    }
  }
}
