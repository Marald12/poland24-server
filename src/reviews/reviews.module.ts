import { Module } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Review, ReviewSchema } from './reviews.model'
import { ShopsService } from '../shops/shops.service'
import { Shop, ShopSchema } from '../shops/shops.model'
import { CountriesService } from '../countries/countries.service'
import { CategoriesService } from '../categories/categories.service'
import { Country, CountrySchema } from '../countries/countries.model'
import { Category, CategorySchema } from '../categories/categories.model'
import { UsersService } from '../users/users.service'
import { User, UserSchema } from '../users/users.model'
import { Role, RoleSchema } from '../roles/roles.model'

@Module({
	controllers: [ReviewsController],
	providers: [
		ReviewsService,
		ShopsService,
		CountriesService,
		CategoriesService,
		UsersService
	],
	imports: [
		MongooseModule.forFeature([
			{ name: Review.name, schema: ReviewSchema },
			{ name: Shop.name, schema: ShopSchema },
			{ name: Country.name, schema: CountrySchema },
			{ name: Category.name, schema: CategorySchema },
			{ name: User.name, schema: UserSchema },
			{ schema: RoleSchema, name: Role.name }
		])
	]
})
export class ReviewsModule {}
