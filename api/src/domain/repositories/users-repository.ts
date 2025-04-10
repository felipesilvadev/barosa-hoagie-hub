import { User } from '../entities/user'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(student: User): Promise<void>
}
