import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { Shop } from './shops.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CountriesService } from '../countries/countries.service'
import { CategoriesService } from '../categories/categories.service'
import { UserDocument } from '../users/users.model'
import { IShopFilters } from './shops.interface'

@Injectable()
export class ShopsService {
	constructor(
		@InjectModel(Shop.name) private readonly shopsModel: Model<Shop>,
		private readonly countriesService: CountriesService,
		private readonly categoriesService: CategoriesService
	) {}

	async create(dto: CreateShopDto) {
		// Проверка на 404 ошибку
		for (let i in dto.countries)
			await this.countriesService.findOne(dto.countries[i])

		for (let i in dto.categories)
			await this.categoriesService.findOne(dto.categories[i])

		return await this.shopsModel.create({
			...dto
		})
	}

	async findAll(filters?: IShopFilters) {
		let tempShops: Shop[] = []
		const shops = await this.shopsModel
			.find()
			.populate(['countries', 'categories'])
			.exec()

		if (filters.countries) {
			filters.countries.map(id => {
				shops.map(item => {
					item.countries.map(item2 => {
						// @ts-ignore
						if (item2._id == id) tempShops.push(item)
					})
				})
			})
		}

		if (filters.categories) {
			filters.categories.map(id => {
				shops.map(item => {
					item.categories.map(item2 => {
						// @ts-ignore
						if (item2._id == id) tempShops.push(item)
					})
				})
			})
		}

		if (filters.categories || filters.countries) {
			return tempShops.filter((number, index, numbers) => {
				return numbers.indexOf(number) !== index
			})
		}

		return shops
	}

	async findOne(id: string | Pick<UserDocument, '_id'>) {
		const shop = await this.shopsModel.findOne()
		if (!shop) throw new NotFoundException('Магазин не найден')

		return shop
	}

	async update(id: string, updateShopDto: UpdateShopDto) {
		return `This action updates a #${id} shop`
	}

	async remove(id: number) {
		return `This action removes a #${id} shop`
	}
}
