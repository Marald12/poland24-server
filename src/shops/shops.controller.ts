import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ShopsService } from './shops.service'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { CheckRole } from '../auth/roles.guard'
import { IShopFilters } from './shops.interface'

@Controller('shops')
export class ShopsController {
	constructor(private readonly shopsService: ShopsService) {}

	@Post()
	@CheckRole()
	create(@Body() createShopDto: CreateShopDto) {
		return this.shopsService.create(createShopDto)
	}

	@Get()
	findAll(@Body() filters: IShopFilters) {
		return this.shopsService.findAll(filters)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.shopsService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
		return this.shopsService.update(id, updateShopDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.shopsService.remove(+id)
	}
}
