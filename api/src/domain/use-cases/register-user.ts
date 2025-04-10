import { ConflictException, Injectable } from '@nestjs/common'

import { User } from '../entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse =
  | ConflictException
  | {
      user: User
    }

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new ConflictException('User with same email address already exists')
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return { user }
  }
}
