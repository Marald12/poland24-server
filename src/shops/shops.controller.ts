import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { ShopsService } from './shops.service'
import { CreateShopDto } from './dto/create-shop.dto'
import { UpdateShopDto } from './dto/update-shop.dto'
import { CheckRole } from '../auth/roles.guard'

@Controller('shops')
export class ShopsController {
	constructor(private readonly shopsService: ShopsService) {}

	@Post()
	@CheckRole()
	create(@Body() createShopDto: CreateShopDto) {
		return this.shopsService.create(createShopDto)
	}

	@Get('filters')
	findFilters(
		@Query('countries') countriesQuery?: string | undefined,
		@Query('categories') categoriesQuery?: string | undefined
	) {
		const countries = countriesQuery?.split(',')
		const categories = categoriesQuery?.split(',')
		return this.shopsService.findFilters({ countries, categories })
	}

	@Get()
	findAll() {
		return this.shopsService.findAll()
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
