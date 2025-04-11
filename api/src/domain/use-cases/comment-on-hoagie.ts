import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { HoagieComment } from '../entities/hoagie-comment'
import { HoagieCommentsRepository } from '../repositories/hoagie-comments-repository'

interface CommentOnHoagieUseCaseRequest {
  text: string
  userId: string
  hoagieId: string
}

type CommentOnHoagieUseCaseResponse = {
  hoagieComment: HoagieComment
}

@Injectable()
export class CommentOnHoagieUseCase {
  constructor(
    private readonly hoagieCommentsRepository: HoagieCommentsRepository,
  ) {}

  async execute({
    text,
    userId,
    hoagieId,
  }: CommentOnHoagieUseCaseRequest): Promise<CommentOnHoagieUseCaseResponse> {
    const hoagieComment = HoagieComment.create({
      text,
      userId: new UniqueEntityID(userId),
      hoagieId: new UniqueEntityID(hoagieId),
    })

    await this.hoagieCommentsRepository.create(hoagieComment)

    return {
      hoagieComment,
    }
  }
}
