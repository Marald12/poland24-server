import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCountryDto } from './dto/create-country.dto'
import { UpdateCountryDto } from './dto/update-country.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Country, CountryDocument } from './countries.model'
import { Model } from 'mongoose'

@Injectable()
export class CountriesService {
	constructor(
		@InjectModel(Country.name) private readonly countryModel: Model<Country>
	) {}

	async create(dto: CreateCountryDto) {
		return await this.countryModel.create({ name: dto.name })
	}

	async findAll() {
		return await this.countryModel.find().exec()
	}

	async findOne(id: string | Pick<CountryDocument, '_id'>) {
		const country = await this.countryModel.findById(id)
		if (!country) throw new NotFoundException('Страна не найдена')

		return country
	}

	async update(id: number, updateCountryDto: UpdateCountryDto) {
		return `This action updates a #${id} country`
	}

	async remove(id: number) {
		return `This action removes a #${id} country`
	}
}
