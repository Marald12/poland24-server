import { IsBoolean, IsEmail, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateOrderForNoAuthDto {
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

	@IsString({ message: 'Поле имя не валидно' })
	name: string

	@IsString({ message: 'Поле фамилия не валидно' })
	surname: string

	@IsString({ message: 'Поле номер телефона не валидно' })
	phoneNumber: string

	@IsEmail({}, { message: 'Email не валидный' })
	email: string

	@IsString({ message: 'Поле комментарий не валидно' })
	comment: string

	@IsBoolean({ message: 'Поле Б/У не валидно' })
	isUsed: boolean
}
