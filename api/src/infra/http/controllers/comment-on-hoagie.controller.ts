import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { CommentOnHoagieUseCase } from 'src/domain/use-cases/comment-on-hoagie'

const commentOnHoagieParamSchema = z.object({
  hoagieId: z.string().refine((value) => isValidObjectId(value), {
    message: 'Invalid MongoDB ObjectId',
  }),
})

const commentOnHoagieBodySchema = z.object({
  text: z.string().max(100),
})

type CommentOnHoagieParamSchema = z.infer<typeof commentOnHoagieParamSchema>
type CommentOnHoagieBodySchema = z.infer<typeof commentOnHoagieBodySchema>

@Controller('/hoagies/comments')
export class CommentOnHoagieController {
  constructor(private readonly commentOnHoagie: CommentOnHoagieUseCase) {}

  @Post(':hoagieId')
  @HttpCode(201)
  async handle(
    @Param(new ZodValidationPipe(commentOnHoagieParamSchema))
    param: CommentOnHoagieParamSchema,
    @Body(new ZodValidationPipe(commentOnHoagieBodySchema))
    body: CommentOnHoagieBodySchema,
    @CurrentUser()
    user: UserPayload,
  ) {
    const { hoagieId } = param
    const { text } = body
    const userId = user.sub

    await this.commentOnHoagie.execute({
      text,
      userId,
      hoagieId,
    })
  }
}
