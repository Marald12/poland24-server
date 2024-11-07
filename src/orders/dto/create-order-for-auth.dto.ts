import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateOrderForAuthDto {
	@IsUrl({}, { message: 'Поле ссылка не валидна' })
	url: string

	@IsNumber({}, { message: 'Поле количество не валидно' })
	count: number

	@IsNumber({}, { message: 'Поле цена не валидно' })
	price: number

	@IsNumber({}, { message: 'Поле цена доставки не валидно' })
	deliveryPrice: number

	@IsString({ message: 'Поле описание не валидно' })
	description: string

	@IsString({ message: 'Поле тип обратной связи не валидно' })
	socialType: 'viber' | 'telegram' | 'email'

	@IsString({ message: 'Поле магазин не валидно' })
	shopId: string

	@IsString({ message: 'Поле комментарий не валидно' })
	comment: string

	@IsBoolean({ message: 'Поле Б/У не валидно' })
	isUsed: boolean
}
