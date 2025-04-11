import { Controller, Get, HttpCode } from '@nestjs/common'

import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { GetHoagiesByUserUseCase } from 'src/domain/use-cases/get-hoagies-by-user'
import { HoagiePresenter } from '../presenters/hoagie-presenter'

@Controller('/hoagies/by-user')
export class GetHoagiesByUserController {
  constructor(private readonly getHoagies: GetHoagiesByUserUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @CurrentUser()
    user: UserPayload,
  ) {
    const userId = user.sub

    const { hoagies } = await this.getHoagies.execute({ userId })

    return {
      hoagies: hoagies.map((hoagie) => HoagiePresenter.toHTTP(hoagie)),
    }
  }
}
