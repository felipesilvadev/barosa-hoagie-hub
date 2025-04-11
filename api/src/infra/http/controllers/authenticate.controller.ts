import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { z } from 'zod'
import { Public } from 'src/infra/auth/public'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private readonly authenticateUser: AuthenticateUserUseCase) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    const { accessToken } = result

    return {
      access_token: accessToken,
    }
  }
}
