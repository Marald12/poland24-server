import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}

	handleRequest(err, user, info) {
		if (err || !user) {
			throw err || new UnauthorizedException('Вы не авторизованны')
		}
		return user
	}
}

export const Auth = () => UseGuards(JwtAuthGuard)
