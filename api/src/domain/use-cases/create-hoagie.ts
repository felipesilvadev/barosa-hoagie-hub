import { Injectable } from '@nestjs/common'

import { Hoagie } from '../entities/hoagie'
import { HoagiesRepository } from '../repositories/hoagies-repository'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

interface CreateHoagieUseCaseRequest {
  name: string
  ingredients: string[]
  picture?: string
  creatorId: string
}

type CreateHoagieUseCaseResponse = {
  hoagie: Hoagie
}

@Injectable()
export class CreateHoagieUseCase {
  constructor(private readonly hoagiesRepository: HoagiesRepository) {}

  async execute({
    name,
    ingredients,
    picture,
    creatorId,
  }: CreateHoagieUseCaseRequest): Promise<CreateHoagieUseCaseResponse> {
    const hoagie = Hoagie.create({
      name,
      ingredients,
      picture,
      creatorId: new UniqueEntityID(creatorId),
    })

    await this.hoagiesRepository.create(hoagie)

    return {
      hoagie,
    }
  }
}
