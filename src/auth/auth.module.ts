import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategies'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { UsersModule } from '../users/users.module'
import { Role, RoleSchema } from '../roles/roles.model'
import { Order, OrderSchema } from '../orders/orders.model'
import { OrdersService } from '../orders/orders.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UsersService, OrdersService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: jwtConfig
		}),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ schema: RoleSchema, name: Role.name },
			{ name: Order.name, schema: OrderSchema }
		]),
		UsersModule
	]
})
export class AuthModule {}
