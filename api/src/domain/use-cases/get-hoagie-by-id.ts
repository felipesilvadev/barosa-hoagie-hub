import { Injectable, NotFoundException } from '@nestjs/common'

import { Hoagie } from '../entities/hoagie'
import { HoagiesRepository } from '../repositories/hoagies-repository'

interface GetHoagieByIdUseCaseRequest {
  hoagieId: string
}

type GetHoagieByIdUseCaseResponse = {
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

@Injectable()
export class GetHoagieByIdUseCase {
  constructor(private readonly hoagiesRepository: HoagiesRepository) {}

  async execute({
    hoagieId,
  }: GetHoagieByIdUseCaseRequest): Promise<GetHoagieByIdUseCaseResponse> {
    const result = await this.hoagiesRepository.findById(hoagieId)

    if (!result) {
      throw new NotFoundException('Hoagie does not exists')
    }

    const { hoagie, creatorName, comments } = result

    return { hoagie, creatorName, comments }
  }
}
