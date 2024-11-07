import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './create-review.dto'
import { CurrentUser } from '../users/users.decorator'
import { Auth } from '../auth/auth.guard'

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post()
	@Auth()
	create(@Body() dto: CreateReviewDto, @CurrentUser('_id') userId: string) {
		return this.reviewsService.create(dto, userId)
	}

	@Get()
	findAll() {
		return this.reviewsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewsService.findOne(id)
	}
}
