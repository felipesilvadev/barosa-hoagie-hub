import { Hoagie } from '../entities/hoagie'
import { FindAllHoagiesResult } from '../dtos/find-all-hoagies-result'
import { FindHoagieByIdResult } from '../dtos/find-hoagie-by-id-result'

export abstract class HoagiesRepository {
  abstract findAll(page: number): Promise<FindAllHoagiesResult>
  abstract findById(id: string): Promise<FindHoagieByIdResult | null>
  abstract findByUserId(userId: string): Promise<Hoagie[]>
  abstract save(hoagie: Hoagie): Promise<void>
  abstract create(hoagie: Hoagie): Promise<void>
}
