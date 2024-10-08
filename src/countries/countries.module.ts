import { Module } from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CountriesController } from './countries.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Country, CountrySchema } from './countries.model'

@Module({
	controllers: [CountriesController],
	providers: [CountriesService],
	imports: [
		MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])
	]
})
export class CountriesModule {}
