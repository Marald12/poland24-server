import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class CreateUserDto {
	@IsEmail({}, { message: 'Email не валидный' })
	email: string

	@IsString({ message: 'Пароль не являеться строкой' })
	@MinLength(8, { message: 'Минимальная длинна пароля 8 символов' })
	@MaxLength(32, { message: 'Максимальная длинна пароля 32 символа' })
	password: string

	@IsString({ message: 'Имя не являеться строкой' })
	name: string

	@IsString({ message: 'Фамилия не являеться строкой' })
	surname: string

	@IsPhoneNumber('UA', { message: 'Номер телефона не валидный' })
	phoneNumber: number
}
