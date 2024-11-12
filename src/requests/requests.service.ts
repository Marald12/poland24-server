import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from './requests.model'
import { CreateRequestDto } from './create-request.dto'

@Injectable()
export class RequestsService {
	constructor(
		@InjectModel(Request.name) private readonly requestModel: Model<Request>
	) {}

	async create(dto: CreateRequestDto) {
		return await this.requestModel.create({
			...dto
		})
	}

	async findAll() {
		return await this.requestModel.find().exec()
	}

	async findOne(id: string) {
		const request = await this.requestModel.findOne({ _id: id })
		if (!request) throw new NotFoundException('Запрос не найден')

		return request
	}
}
