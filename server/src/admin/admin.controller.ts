import { Body, Controller, Post } from '@nestjs/common'
import { FindUserDto } from '../dto/findUser.dto'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
	constructor (private readonly adminService: AdminService) {}

	@Post()
	findUser (@Body() body: FindUserDto) {
		const { userId } = body
		return this.adminService.findUser(userId)
	}
}
