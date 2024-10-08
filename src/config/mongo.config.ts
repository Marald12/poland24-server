import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongoConfig = async (
	configService: ConfigService
): Promise<MongooseModuleOptions> => ({
	uri: configService.get('MONGO_URI'),
	dbName: 'Poland24'
})
