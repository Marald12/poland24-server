import {
	Controller,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { MediaService } from './media.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@UseInterceptors(FileInterceptor('media'))
	@Post()
	uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
