import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { GetHoagieByIdUseCase } from 'src/domain/use-cases/get-hoagie-by-id'
import { HoagiePresenter } from '../presenters/hoagie-presenter'

const getHoagieByIdParamSchema = z.object({
  hoagieId: z.string().refine((value) => isValidObjectId(value), {
    message: 'Invalid MongoDB ObjectId',
  }),
})

type GetHoagieByIdParamSchema = z.infer<typeof getHoagieByIdParamSchema>

@Controller('/hoagies')
export class GetHoagieByIdController {
  constructor(private readonly getHoagie: GetHoagieByIdUseCase) {}

  @Get(':hoagieId')
  @HttpCode(200)
  async handle(
    @Param(new ZodValidationPipe(getHoagieByIdParamSchema))
    param: GetHoagieByIdParamSchema,
  ) {
    const { hoagieId } = param

    const { hoagie, creatorName, comments } = await this.getHoagie.execute({
      hoagieId,
    })

    return { hoagie: HoagiePresenter.toHTTP(hoagie, { creatorName, comments }) }
  }
}
