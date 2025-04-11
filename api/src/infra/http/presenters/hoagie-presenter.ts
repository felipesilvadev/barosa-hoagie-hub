import { Hoagie } from 'src/domain/entities/hoagie'

export class HoagiePresenter {
  static toHTTP(hoagie: Hoagie, creatorName?: string) {
    return {
      id: hoagie.id.toString(),
      name: hoagie.name,
      ingredients: hoagie.ingredients,
      picture: hoagie.picture,
      creator: {
        id: hoagie.creatorId.toString(),
        name: creatorName,
      },
      createdAt: hoagie.createdAt,
      updatedAt: hoagie.updatedAt,
    }
  }
}
