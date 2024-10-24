import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from './categories.model'
import { User, UserSchema } from '../users/users.model'
import { Role, RoleSchema } from '../roles/roles.model'
import { UsersService } from '../users/users.service'
import { JwtModule, JwtService } from '@nestjs/jwt'

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, UsersService, JwtService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{ name: Category.name, schema: CategorySchema },
			{ name: User.name, schema: UserSchema },
			{ name: Role.name, schema: RoleSchema }
		])
	]
})
export class CategoriesModule {}
