import { Module } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { ShopsController } from './shops.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Shop, ShopSchema } from './shops.model'
import { User, UserSchema } from '../users/users.model'
import { Role, RoleSchema } from '../roles/roles.model'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { CountriesService } from '../countries/countries.service'
import { Country, CountrySchema } from '../countries/countries.model'
import { Category, CategorySchema } from '../categories/categories.model'
import { CategoriesService } from '../categories/categories.service'

@Module({
	controllers: [ShopsController],
	providers: [
		ShopsService,
		JwtService,
		UsersService,
		CountriesService,
		CategoriesService
	],
	imports: [
		MongooseModule.forFeature([
			{ name: Shop.name, schema: ShopSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Role.name, schema: RoleSchema },
			{ name: Country.name, schema: CountrySchema },
			{ name: Category.name, schema: CategorySchema }
		])
	]
})
export class ShopsModule {}
