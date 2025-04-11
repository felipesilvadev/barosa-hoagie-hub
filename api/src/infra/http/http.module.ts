import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateHoagieController } from './controllers/create-hoagie.controller'
import { FetchHoagiesController } from './controllers/fetch-hoagies.controller'
import { GetHoagieByIdController } from './controllers/get-hoagie-by-id.controller'
import { GetHoagiesByUserController } from './controllers/get-hoagies-by-user.controller'
import { CommentOnHoagieController } from './controllers/comment-on-hoagie.controller'

import { RegisterUserUseCase } from 'src/domain/use-cases/register-user'
import { AuthenticateUserUseCase } from 'src/domain/use-cases/authenticate-user'
import { CreateHoagieUseCase } from 'src/domain/use-cases/create-hoagie'
import { FetchHoagiesUseCase } from 'src/domain/use-cases/fetch-hoagies'
import { GetHoagieByIdUseCase } from 'src/domain/use-cases/get-hoagie-by-id'
import { GetHoagiesByUserUseCase } from 'src/domain/use-cases/get-hoagies-by-user'
import { CommentOnHoagieUseCase } from 'src/domain/use-cases/comment-on-hoagie'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateHoagieController,
    FetchHoagiesController,
    GetHoagiesByUserController,
    CommentOnHoagieController,
    GetHoagieByIdController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateHoagieUseCase,
    FetchHoagiesUseCase,
    GetHoagieByIdUseCase,
    GetHoagiesByUserUseCase,
    CommentOnHoagieUseCase,
  ],
})
export class HttpModule {}
