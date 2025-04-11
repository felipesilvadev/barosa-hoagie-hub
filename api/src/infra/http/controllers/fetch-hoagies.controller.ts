import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchHoagiesUseCase } from 'src/domain/use-cases/fetch-hoagies'
import { HoagiePresenter } from '../presenters/hoagie-presenter'

const fetchHoagiesQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
})

type FetchHoagiesQuerySchema = z.infer<typeof fetchHoagiesQuerySchema>

@Controller('/hoagies')
export class FetchHoagiesController {
  constructor(private readonly fetchHoagies: FetchHoagiesUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query(new ZodValidationPipe(fetchHoagiesQuerySchema))
    query: FetchHoagiesQuerySchema,
  ) {
    const { page } = query
    const { hoagies, total, perPage } = await this.fetchHoagies.execute({
      page,
    })

    return {
      hoagies: hoagies.map(({ item, commentCount }) =>
        HoagiePresenter.toHTTP(item, { commentCount }),
      ),
      total,
      perPage,
    }
  }
}
