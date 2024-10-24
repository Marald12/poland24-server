import { IsString } from 'class-validator'

export class CreateCountryDto {
	@IsString({ message: 'Название не являеться строкой' })
	name: string
}
