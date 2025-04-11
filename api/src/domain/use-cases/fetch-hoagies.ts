import { Injectable } from '@nestjs/common'

import { Hoagie } from '../entities/hoagie'
import { HoagiesRepository } from '../repositories/hoagies-repository'

interface FetchHoagiesUseCaseRequest {
  page: number
}

type FetchHoagiesUseCaseResponse = {
  hoagies: Hoagie[]
  total: number
  perPage: number
}

@Injectable()
export class FetchHoagiesUseCase {
  constructor(private readonly hoagiesRepository: HoagiesRepository) {}

  async execute({
    page,
  }: FetchHoagiesUseCaseRequest): Promise<FetchHoagiesUseCaseResponse> {
    const { hoagies, total, perPage } =
      await this.hoagiesRepository.findAll(page)

    return { hoagies, total, perPage }
  }
}
