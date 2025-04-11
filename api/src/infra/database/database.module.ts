import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

import { UserSchema } from './mongoose/schemas/user.schema'
import { HoagieSchema } from './mongoose/schemas/hoagie.schema'
import { CommentSchema } from './mongoose/schemas/comment.schema'

import { UsersRepository } from 'src/domain/repositories/users-repository'
import { MongooseUsersRepository } from './mongoose/repositories/mongoose-users-repository'
import { HoagiesRepository } from 'src/domain/repositories/hoagies-repository'
import { MongooseHoagiesRepository } from './mongoose/repositories/mongoose-hoagies-repository'
import { HoagieCommentsRepository } from 'src/domain/repositories/hoagie-comments-repository'
import { MongooseHoagieCommentsRepository } from './mongoose/repositories/mongoose-hoagie-comments-repository'

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
      {
        name: 'Hoagie',
        schema: HoagieSchema,
      },
      {
        name: 'Comment',
        schema: CommentSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongooseUsersRepository,
    },
    {
      provide: HoagiesRepository,
      useClass: MongooseHoagiesRepository,
    },
    {
      provide: HoagieCommentsRepository,
      useClass: MongooseHoagieCommentsRepository,
    },
  ],
  exports: [UsersRepository, HoagiesRepository, HoagieCommentsRepository],
})
export class DatabaseModule {}
