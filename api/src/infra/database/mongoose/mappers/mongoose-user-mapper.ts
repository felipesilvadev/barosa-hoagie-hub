import { User } from 'src/domain/entities/user'
import { UserDocument } from '../schemas/user.schema'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export class UserMapper {
  static toDomain(user: UserDocument) {
    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      new UniqueEntityID(user._id.toString()),
    )
  }

  static toMongoose(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
