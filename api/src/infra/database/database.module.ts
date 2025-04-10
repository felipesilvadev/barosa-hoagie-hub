import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

import { UsersRepository } from 'src/domain/repositories/users-repository'
import { MongooseUsersRepository } from './mongoose/repositories/mongoose-users-repository'
import { UserSchema } from './mongoose/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        uri: env.get('MONGO_URI'),
        authSource: env.get('MONGO_AUTH_SOURCE'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongooseUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
