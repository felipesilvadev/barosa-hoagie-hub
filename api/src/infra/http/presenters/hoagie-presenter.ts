import { Hoagie } from 'src/domain/entities/hoagie'
import { FindHoagieByIdResult } from 'src/domain/dtos/find-hoagie-by-id-result'

export class HoagiePresenter {
  static toHTTP(
    hoagie: Hoagie,
    extras?: {
      creatorName?: string
      commentCount?: number
      comments?: FindHoagieByIdResult['comments']
    },
  ) {
    return {
      id: hoagie.id.toString(),
      name: hoagie.name,
      ingredients: hoagie.ingredients,
      picture: hoagie.picture,
      creator: {
        id: hoagie.creatorId.toString(),
        name: extras?.creatorName,
      },
      commentCount: extras?.commentCount,
      comments: extras?.comments,
      createdAt: hoagie.createdAt,
      updatedAt: hoagie.updatedAt,
    }
  }
}
