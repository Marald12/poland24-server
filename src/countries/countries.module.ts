import { Module } from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CountriesController } from './countries.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Country, CountrySchema } from './countries.model'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User, UserSchema } from '../users/users.model'
import { Role, RoleSchema } from '../roles/roles.model'

@Module({
	controllers: [CountriesController],
	providers: [CountriesService, JwtService, UsersService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{ name: Country.name, schema: CountrySchema },
			{ name: User.name, schema: UserSchema },
			{ name: Role.name, schema: RoleSchema }
		])
	]
})
export class CountriesModule {}
