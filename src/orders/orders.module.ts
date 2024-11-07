import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './orders.model'
import { User, UserSchema } from '../users/users.model'
import { UsersService } from '../users/users.service'
import { Role, RoleSchema } from '../roles/roles.model'
import { JwtService } from '@nestjs/jwt'

@Module({
	controllers: [OrdersController],
	providers: [OrdersService, UsersService, JwtService],
	imports: [
		MongooseModule.forFeature([
			{ name: Order.name, schema: OrderSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Role.name, schema: RoleSchema }
		])
	]
})
export class OrdersModule {}
