import { Injectable } from '@nestjs/common'

import { Hoagie } from '../entities/hoagie'
import { HoagiesRepository } from '../repositories/hoagies-repository'

interface GetHoagiesByUserUseCaseRequest {
  userId: string
}

type GetHoagiesByUserUseCaseResponse = {
  hoagies: Hoagie[]
}

@Injectable()
export class GetHoagiesByUserUseCase {
  constructor(private readonly hoagiesRepository: HoagiesRepository) {}

  async execute({
    userId,
  }: GetHoagiesByUserUseCaseRequest): Promise<GetHoagiesByUserUseCaseResponse> {
    const hoagies = await this.hoagiesRepository.findByUserId(userId)

    return { hoagies }
  }
}
