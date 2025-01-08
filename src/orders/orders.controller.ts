import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderForNoAuthDto } from './dto/create-order-for-no-auth.dto'
import { Auth } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'
import { CreateOrderForAuthDto } from './dto/create-order-for-auth.dto'
import { CheckRole } from '../auth/roles.guard'
import { UpdateOrderDto } from './dto/update-order.dto'

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

	@Get('pagination')
	@Auth()
	findInPagination(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@CurrentUser('_id') id: string
	) {
		return this.ordersService.findByPagination(id, +skip, +limit)
	}

	@Get()
	findAll() {
		return this.ordersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ordersService.findOne(id)
	}

	@Patch(':id')
	@CheckRole()
	update(@Body() dto: UpdateOrderDto, @Param('id') id: string) {
		return this.ordersService.update(dto, id)
	}
}
