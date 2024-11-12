import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { CreateRequestDto } from './create-request.dto'

@Controller('requests')
export class RequestsController {
	constructor(private readonly requestsService: RequestsService) {}

	@Post()
	create(@Body() dto: CreateRequestDto) {
		return this.requestsService.create(dto)
	}

	@Get()
	findAll() {
		return this.requestsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.requestsService.findOne(id)
	}
}
