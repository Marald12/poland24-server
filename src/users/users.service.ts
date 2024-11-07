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
		const user = await this.userModel.findOne({ _id: id }).populate(['role'])
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

	async update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	async remove(id: number) {
		return `This action removes a #${id} user`
	}
}
