import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './roles.model'
import { User, UserSchema } from '../users/users.model'
import { UsersService } from '../users/users.service'

@Module({
	controllers: [RolesController],
	providers: [RolesService, UsersService],
	imports: [
		MongooseModule.forFeature([
			{ schema: RoleSchema, name: Role.name },
			{ name: User.name, schema: UserSchema }
		])
	]
})
export class RolesModule {}
