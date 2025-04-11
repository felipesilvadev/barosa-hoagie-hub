import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { CreateHoagieUseCase } from 'src/domain/use-cases/create-hoagie'

const createHoagieBodySchema = z.object({
  name: z.string(),
  ingredients: z.array(z.string()).min(1),
  picture: z.string().optional(),
})

type CreateHoagieBodySchema = z.infer<typeof createHoagieBodySchema>

@Controller('/hoagies')
export class CreateHoagieController {
  constructor(private readonly createHoagie: CreateHoagieUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createHoagieBodySchema))
    body: CreateHoagieBodySchema,
    @CurrentUser()
    user: UserPayload,
  ) {
    const { name, ingredients, picture } = body
    const userId = user.sub

    await this.createHoagie.execute({
      name,
      ingredients,
      picture,
      creatorId: userId,
    })
  }
}
