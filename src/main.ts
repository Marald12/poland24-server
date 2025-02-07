import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import axios from 'axios'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	
	try {
		const response = await axios.get('https://api.ipify.org?format=json');
		console.log(`Your server's IP address is: ${response.data.ip}`);
	} catch (error) {
		console.error('Error fetching IP:', error);
	}
	
	app.enableCors()
	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3002)
}

bootstrap()
