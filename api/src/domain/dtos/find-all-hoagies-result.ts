import { Hoagie } from 'src/domain/entities/hoagie'

export interface FindAllHoagiesResult {
  hoagies: Hoagie[]
  total: number
  perPage: number
}
