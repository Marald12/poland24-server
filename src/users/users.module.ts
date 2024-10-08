import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users.model'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema
			}
		])
	]
})
export class UsersModule {}
