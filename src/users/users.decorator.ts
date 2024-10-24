import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserDocument } from './users.model'

export const CurrentUser = createParamDecorator(
	(data: keyof Pick<UserDocument, '_id'>, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
