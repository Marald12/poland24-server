import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users.model'
import { Role, RoleSchema } from '../roles/roles.model'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ schema: RoleSchema, name: Role.name }
		])
	]
})
export class UsersModule {}
