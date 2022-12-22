import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from '@nestjs/passport'
import { UserDto } from './auth/dto/user.dto'

@Controller()
export class AppController {
	constructor (private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login (@Request() req): Promise<{ access_token: string }> {
		return this.authService.login(req.user)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('auth/profile')
	getProfile (@Request() req): Promise<UserDto> {
		return {
			...req.user,
		}
	}
}
