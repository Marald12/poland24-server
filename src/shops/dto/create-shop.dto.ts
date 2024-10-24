import { IsNumber, IsString } from 'class-validator'
import { CountryDocument } from '../../countries/countries.model'
import { CategoryDocument } from '../../categories/categories.model'

export class CreateShopDto {
	@IsString({ message: 'Поле заголовка не являеться строкой' })
	title: string

	@IsString({ message: 'Поле описания не являеться строкой' })
	description: string

	@IsNumber({}, { message: 'Поле комисии не являеться числом' })
	commissionPercentage: number

	@IsNumber({}, { message: 'Поле дни доставки не являеться числом' })
	deliveryDay: number

	@IsString({ message: 'Поле лого не являеться строкой' })
	logoPath: string

	@IsString({ message: 'Поле баннер не являеться строкой' })
	bannerPath: string

	countries: Pick<CountryDocument, '_id'>[]

	categories: Pick<CategoryDocument, '_id'>[]
}
