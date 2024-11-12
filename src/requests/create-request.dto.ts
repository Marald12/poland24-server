import { IsString, IsUrl } from 'class-validator'

export class CreateRequestDto {
	@IsUrl({}, { message: 'Поле ссылка не валидна' })
	url: string

	@IsString({ message: 'Поле комментарий не валидно' })
	comment: string

	media?: string
}
