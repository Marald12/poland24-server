import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { UserDocument } from '../users/users.model'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthDto } from './auth.dto'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	async login(dto: AuthDto) {
		const user = await this.usersService.findOneByEmail(dto.email)

		const isValidatePassword = await compare(dto.password, user.password)
		if (!isValidatePassword)
			throw new UnauthorizedException('Неверный логин или пароль')

		return await this.returnUserFields(user)
	}

	async register(dto: CreateUserDto) {
		const user = await this.usersService.create(dto)

		return await this.returnUserFields(user)
	}

	private async returnUserFields(user: UserDocument) {
		return {
			user,
			accessToken: await this.generateJwtToken(user._id)
		}
	}

	private async generateJwtToken(_id: Pick<UserDocument, '_id'>) {
		return await this.jwtService.signAsync({ _id })
	}
}
