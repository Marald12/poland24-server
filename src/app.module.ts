import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { mongoConfig } from './config/mongo.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ShopsModule } from './shops/shops.module'
import { CountriesModule } from './countries/countries.module'
import { CategoriesModule } from './categories/categories.module'
import { RolesModule } from './roles/roles.module'
import { MediaModule } from './media/media.module'
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RequestsModule } from './requests/requests.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		/*MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: mongoConfig
		}),
		UsersModule,
		AuthModule,
		ShopsModule,
		CountriesModule,
		CategoriesModule,
		RolesModule,
		MediaModule,
		OrdersModule,
		ReviewsModule,
		RequestsModule*/
	],
	controllers: [],
	providers: []
})
export class AppModule {}
