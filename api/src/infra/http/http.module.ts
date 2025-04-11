import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterUserUseCase } from 'src/domain/use-cases/register-user'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user'
import { CreateHoagieController } from './controllers/create-hoagie.controller'
import { CreateHoagieUseCase } from 'src/domain/use-cases/create-hoagie'
import { FetchHoagiesController } from './controllers/fetch-hoagies.controller'
import { FetchHoagiesUseCase } from 'src/domain/use-cases/fetch-hoagies'
import { GetHoagieByIdController } from './controllers/get-hoagie-by-id.controller'
import { GetHoagieByIdUseCase } from 'src/domain/use-cases/get-hoagie-by-id'
import { GetHoagiesByUserController } from './controllers/get-hoagies-by-user.controller'
import { GetHoagiesByUserUseCase } from 'src/domain/use-cases/get-hoagies-by-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateHoagieController,
    FetchHoagiesController,
    GetHoagiesByUserController,
    GetHoagieByIdController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateHoagieUseCase,
    FetchHoagiesUseCase,
    GetHoagieByIdUseCase,
    GetHoagiesByUserUseCase,
  ],
})
export class HttpModule {}
