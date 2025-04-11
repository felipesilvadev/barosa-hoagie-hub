import { HoagieComment } from '../entities/hoagie-comment'

export abstract class HoagieCommentsRepository {
  abstract create(hoagieComment: HoagieComment): Promise<void>
}
