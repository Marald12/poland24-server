import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
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

	@Get('by-profile')
	@Auth()
	findByProfile(@CurrentUser('_id') userId: string) {
		return this.reviewsService.findByProfile(userId)
	}

	@Get()
	findAll(@Query('shop') shop: string) {
		return this.reviewsService.findAll(shop)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewsService.findOne(id)
	}
}
