import { Hoagie } from 'src/domain/entities/hoagie'

export interface FindAllHoagiesResult {
  hoagies: {
    item: Hoagie
    commentCount: number
  }[]
  total: number
  perPage: number
}
