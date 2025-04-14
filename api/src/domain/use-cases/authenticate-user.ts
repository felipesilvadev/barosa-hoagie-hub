import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  accessToken: string
  user: { id: string }
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid')
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid')
    }

    const userId = user.id.toString()
    const accessToken = await this.encrypter.encrypt({
      sub: userId,
    })

    return {
      accessToken,
      user: { id: userId },
    }
  }
}
