import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@Post('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto)
	}
}
