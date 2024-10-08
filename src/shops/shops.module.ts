import { Module } from '@nestjs/common'
import { ShopsService } from './shops.service'
import { ShopsController } from './shops.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Shop, ShopSchema } from './shops.model'

@Module({
	controllers: [ShopsController],
	providers: [ShopsService],
	imports: [
		MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }])
	]
})
export class ShopsModule {}
