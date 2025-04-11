import { Types } from 'mongoose'

import { Hoagie } from 'src/domain/entities/hoagie'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { HoagieDocument } from '../schemas/hoagie.schema'
import { extractEntityId } from '../utils/extract-entity-id'

export class HoagieMapper {
  static toDomain(hoagie: HoagieDocument) {
    return Hoagie.create(
      {
        name: hoagie.name,
        ingredients: hoagie.ingredients,
        picture: hoagie.picture,
        creatorId: new UniqueEntityID(extractEntityId(hoagie.creatorId)),
        createdAt: hoagie.createdAt,
        updatedAt: hoagie.updatedAt,
      },
      new UniqueEntityID(hoagie._id.toString()),
    )
  }

  static toMongoose(hoagie: Hoagie) {
    return {
      name: hoagie.name,
      ingredients: hoagie.ingredients,
      picture: hoagie.picture,
      creatorId: new Types.ObjectId(hoagie.creatorId.toValue()),
    }
  }
}
