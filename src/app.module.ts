import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { mongoConfig } from './config/mongo.config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: mongoConfig
		}),
		UsersModule,
		AuthModule,
		ShopsModule,
		CountriesModule,
		CategoriesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
