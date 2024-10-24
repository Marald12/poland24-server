import { IsNumber, IsString } from 'class-validator'

export class CreateRoleDto {
	@IsString({ message: 'Название роли не являеться строкой' })
	name: string

	@IsNumber({}, { message: 'Уровень роли не являеться числом' })
	level: number
}
