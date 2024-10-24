import { IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Название не являеться строкой' })
	name: string
}
