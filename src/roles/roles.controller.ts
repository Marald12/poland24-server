import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Auth } from '../auth/auth.guard'
import { CurrentUser } from '../users/users.decorator'
import { UserDocument } from '../users/users.model'

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	@Auth()
	create(
		@Body() createRoleDto: CreateRoleDto,
		@CurrentUser() user: UserDocument
	) {
		return this.rolesService.create(createRoleDto, user.id)
	}

	@Get()
	findAll() {
		return this.rolesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.rolesService.findOne(id)
	}

	@Put('add-role/:id')
	addRole(@Param('id') id: string, @Query('userId') userId: string) {
		return this.rolesService.addRole(id, userId)
	}

	@Put('remove-role/:id')
	removeRoll(@Param('id') id: string, @Query('userId') userId: string) {
		return this.rolesService.removeRole(id, userId)
	}
}
