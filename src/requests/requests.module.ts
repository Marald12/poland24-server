import { Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsController } from './requests.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { RequestSchema } from './requests.model'

@Module({
	controllers: [RequestsController],
	providers: [RequestsService],
	imports: [
		MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }])
	]
})
export class RequestsModule {}
