import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { CurrentUser } from './users.decorator'
import { Auth } from '../auth/auth.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('get-profile')
	@Auth()
	getProfile(@CurrentUser('_id') id: string) {
		return this.usersService.findOneById(id)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOneById(id)
	}

	@Patch()
	@Auth()
	update(@CurrentUser('_id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
