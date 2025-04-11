import { Hoagie } from 'src/domain/entities/hoagie'

export interface FindHoagieByIdResult {
  hoagie: Hoagie
  creatorName: string
  comments: {
    id: string
    text: string
    createdAt: Date
    user: {
      id: string
      name: string
    }
  }[]
}
