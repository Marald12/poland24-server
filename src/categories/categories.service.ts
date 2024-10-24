import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Category, CategoryDocument } from './categories.model'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoriesModel: Model<Category>
	) {}

	async create(dto: CreateCategoryDto) {
		return await this.categoriesModel.create({ ...dto })
	}

	async findAll() {
		return await this.categoriesModel.find().exec()
	}

	async findOne(id: string | Pick<CategoryDocument, '_id'>) {
		const category = await this.categoriesModel.findById(id)
		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`
	}

	async remove(id: number) {
		return `This action removes a #${id} category`
	}
}
