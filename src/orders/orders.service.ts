import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './orders.model'
import { Model } from 'mongoose'
import { CreateOrderForNoAuthDto } from './dto/create-order-for-no-auth.dto'
import { CreateOrderForAuthDto } from './dto/create-order-for-auth.dto'
import { UsersService } from '../users/users.service'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
	constructor(
		@InjectModel(Order.name) private readonly orderModel: Model<Order>,
		private readonly usersService: UsersService
	) {}

	async createForNoAuth(dto: CreateOrderForNoAuthDto) {
		await this.usersService.checkUserByEmail(dto.email)
		const sum = dto.deliveryPrice + dto.price * dto.count

		return await this.orderModel.create({
			url: dto.url,
			count: dto.count,
			price: dto.price,
			deliveryPrice: dto.deliveryPrice,
			description: dto.description,
			socialType: dto.socialType,
			shop: dto.shopId,
			comment: dto.comment,
			isUsed: dto.isUsed,
			name: dto.name,
			surname: dto.surname,
			phoneNumber: dto.phoneNumber,
			email: dto.email,
			summa: sum + (sum / 100) * 10
		})
	}

	async createForAuth(dto: CreateOrderForAuthDto, userId: string) {
		const user = await this.usersService.findOneById(userId)
		const sum = dto.deliveryPrice + dto.price * dto.count
		const order = await this.orderModel.create({
			...dto,
			user: userId,
			summa: sum + (sum / 100) * 10
		})

		await user.updateOne({
			$push: {
				orders: order
			}
		})

		return order
	}

	async findAll() {
		return await this.orderModel.find().populate(['shop', 'user']).exec()
	}

	async findAllAndFilterForEmail(email: string) {
		return await this.orderModel
			.find({ email })
			.populate(['shop', 'user'])
			.exec()
	}

	async findOne(id: string) {
		const order = await this.orderModel.findOne({ _id: id })
		if (!order) throw new NotFoundException('Заказ не найден')

		return order
	}

	async update(dto: UpdateOrderDto, orderId: string) {
		const order = await this.findOne(orderId)
		await order.updateOne({
			...dto
		})

		return await this.findOne(orderId)
	}
}
