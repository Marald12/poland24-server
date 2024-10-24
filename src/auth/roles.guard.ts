import {
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../users/users.service'

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super()
	}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			if (!authHeader)
				throw new UnauthorizedException('Пользователь не авторизован')

			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token)
				throw new UnauthorizedException('Пользователь не авторизован')

			const id = this.jwtService.verify(token, {
				secret: this.configService.get('JWT_SECRET')
			})._id
			const user = await this.usersService.findOneById(id)
			if (user.role.level < 2) throw new ForbiddenException('Нет доступа')

			return true
		} catch (e) {
			console.log(e)
			throw new UnauthorizedException('Пользователь не авторизован')
		}
	}

	handleRequest(err, user, info) {
		if (err || !user) {
			throw err || new UnauthorizedException('Вы не авторизованны')
		}
		return user
	}
}

export const CheckRole = () => UseGuards(RoleGuard)
