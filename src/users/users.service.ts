import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './users.model'
import { Model } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'
import { Role } from '../roles/roles.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		@InjectModel(Role.name) private readonly rolesModel: Model<Role>
	) {}

	async create(dto: CreateUserDto) {
		const oldUser = await this.userModel.findOne({ email: dto.email })
		if (oldUser)
			throw new BadRequestException('Пользователь с таким Email уже существует')

		const salt = await genSalt(10)
		const hashPassword = await hash(dto.password, salt)

		const newUser = await this.userModel.create({
			...dto,
			password: hashPassword
		})

		const role = await this.rolesModel.findOne({ name: 'USER' })
		if (!role) throw new NotFoundException('Роль не найдена')

		await newUser.updateOne({
			role
		})

		await role.updateOne({
			$push: {
				users: newUser
			}
		})

		await role.save()

		return await newUser.save()
	}

	async findAll() {
		return await this.userModel.find().exec()
	}

	async findOneById(id: string) {
		const user = await this.userModel
			.findById(id)
			.populate(['role', 'orders', 'reviews'])
		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async checkUserByEmail(email: string) {
		const user = await this.userModel.findOne({ email })
		if (user)
			throw new BadRequestException(
				'Пользователь с таким E-mail уже зарегестрирован'
			)

		return
	}

	async findOneByEmail(email: string) {
		const user = await this.userModel.findOne({ email })
		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async update(id: string, { email, password, ...dto }: UpdateUserDto) {
		let tempDto: UpdateUserDto = { ...dto }
		const user = await this.findOneById(id)

		if (email) {
			const tempUser = await this.findOneByEmail(email)
			if (tempUser)
				throw new BadRequestException(
					'Пользователь с таким e-mail уже существует'
				)

			tempDto = {
				...tempDto,
				email: email
			}
		}
		if (password) {
			const salt = await genSalt(10)
			const hashPassword = await hash(password, salt)

			tempDto = {
				...tempDto,
				password: hashPassword
			}
		}

		await user.updateOne(tempDto)

		return await this.findOneById(id)
	}

	async remove(id: number) {
		return `This action removes a #${id} user`
	}
}
