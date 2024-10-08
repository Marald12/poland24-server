import { Injectable } from '@nestjs/common'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { Shop } from './shops.model'

@Injectable()
export class ShopsService {
	async create(createShopDto: CreateShopDto) {
		return 'This action adds a new shop'
	}

	async findAll() {
		return Shop.name
	}

	async findOne(id: number) {
		return `This action returns a #${id} shop`
	}

	async update(id: number, updateShopDto: UpdateShopDto) {
		return `This action updates a #${id} shop`
	}

	async remove(id: number) {
		return `This action removes a #${id} shop`
	}
}
