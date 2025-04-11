import { Hoagie } from 'src/domain/entities/hoagie'

export interface FindHoagieByIdResult {
  hoagie: Hoagie
  creatorName: string
}
