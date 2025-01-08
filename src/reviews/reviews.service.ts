import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Review } from './reviews.model'
import { Model } from 'mongoose'
import { CreateReviewDto } from './create-review.dto'
import { ShopsService } from '../shops/shops.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
		private readonly shopsService: ShopsService,
		private readonly usersService: UsersService
	) {}

	async create({ shopId, ...dto }: CreateReviewDto, userId: string) {
		await this.shopsService.findOne(shopId)
		const user = await this.usersService.findOneById(userId)

		const review = await this.reviewModel.create({
			...dto,
			user: userId,
			shop: shopId
		})

		await user.updateOne({
			$push: {
				reviews: review
			}
		})

		return review
	}

	async findAll(shopId?: string) {
		if (shopId) {
			return await this.reviewModel
				.find({
					shop: shopId
				})
				.populate(['user', 'shop'])
				.exec()
		}

		return await this.reviewModel.find().populate(['user', 'shop']).exec()
	}

	async findOne(id: string) {
		const review = await this.reviewModel.findOne({ _id: id })
		if (!review) throw new NotFoundException('Отзыв не найден')

		return review
	}

	async findByProfile(userId: string) {
		const reviews = await this.reviewModel
			.find({ user: userId })
			.populate(['user', 'shop'])
			.exec()
		if (!reviews) throw new NotFoundException('Отзывы не найдены')

		return reviews
	}
}
