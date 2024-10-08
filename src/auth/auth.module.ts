import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '../config/jwt.config'
import { JwtStrategy } from './auth.strategies'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { UsersModule } from '../users/users.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UsersService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: jwtConfig
		}),
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema
			}
		]),
		UsersModule
	]
})
export class AuthModule {}
