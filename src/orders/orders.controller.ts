import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderForNoAuthDto } from './dto/create-order-for-no-auth.dto'
import { Auth } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'
import { CreateOrderForAuthDto } from './dto/create-order-for-auth.dto'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post('for-auth')
	@Auth()
	createForAuth(
		@Body() dto: CreateOrderForAuthDto,
		@CurrentUser('_id') id: string
	) {
		return this.ordersService.createForAuth(dto, id)
	}

	@Post('for-no-auth')
	createForNoAuth(@Body() dto: CreateOrderForNoAuthDto) {
		return this.ordersService.createForNoAuth(dto)
	}

	@Get()
	findAll() {
		return this.ordersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ordersService.findOne(id)
	}
}
