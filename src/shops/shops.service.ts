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

	async findAll() {
		return await this.shopsModel
			.find()
			.populate(['countries', 'categories'])
			.exec()
	}

	async findFilters(filters?: IShopFilters) {
		const shops = await this.shopsModel
			.find()
			.populate(['countries', 'categories'])
			.exec()

		if (filters.categories) {
			return await this.shopsModel
				.find({ categories: { $in: filters.categories } })
				.populate(['countries', 'categories'])
				.exec()
		}

		if (filters.countries) {
			return await this.shopsModel
				.find({ countries: { $in: filters.countries } })
				.populate(['countries', 'categories'])
				.exec()
		}

		if (filters.countries && filters.categories) {
			return await this.shopsModel
				.find({
					categories: { $in: filters.categories },
					countries: { $in: filters.countries }
				})
				.populate(['countries', 'categories'])
				.exec()
		}

		return shops
	}

	async findOne(id: string | Pick<UserDocument, '_id'>) {
		const shop = await this.shopsModel.findById(id)
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
