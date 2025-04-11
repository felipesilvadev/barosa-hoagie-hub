import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserDocument } from '../schemas/user.schema'
import { UserMapper } from '../mappers/mongoose-user-mapper'
import { User } from 'src/domain/entities/user'
import { UsersRepository } from 'src/domain/repositories/users-repository'

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email })

    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = UserMapper.toMongoose(user)

    await this.userModel.create(data)
  }
}
