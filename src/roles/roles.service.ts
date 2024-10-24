import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role } from './roles.model'
import { Model } from 'mongoose'
import { UsersService } from '../users/users.service'

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role.name) private readonly rolesModel: Model<Role>,
		private readonly usersService: UsersService
	) {}

	async create(dto: CreateRoleDto, userId: string) {
		return await this.rolesModel.create({ ...dto })
	}

	async addRole(roleId: string, userId: string) {
		const user = await this.usersService.findOneById(userId)
		const role = await this.findOne(roleId)

		if (user.role) {
			// @ts-ignore
			if (user.role._id == roleId)
				throw new BadRequestException('У пользователя уже есть данная роль')
			// @ts-ignore
			const oldRole = await this.findOne(user.role._id)
			await oldRole.updateOne({
				$pull: {
					users: user._id
				}
			})
		}
		await user.updateOne({
			role
		})

		await role.updateOne({
			$push: {
				users: user
			}
		})

		return await this.findOne(roleId)
	}

	async removeRole(roleId: string, userId: string) {
		const user = await this.usersService.findOneById(userId)
		const role = await this.findOne(roleId)

		// @ts-ignore
		if (user.role.id !== roleId) {
			// @ts-ignore
			console.log(user.role._id)
			console.log(roleId)
			throw new BadRequestException('У пользователя нету данной роли')
		}

		await user.updateOne({
			role: null
		})

		await role.updateOne({
			$pull: {
				users: user._id
			}
		})

		return await this.findOne(roleId)
	}

	async findAll() {
		return await this.rolesModel.find().exec()
	}

	async findOne(id: string) {
		const role = await this.rolesModel.findOne({ _id: id })
		if (!role) throw new NotFoundException('Роль не найдена')

		return role
	}
}
