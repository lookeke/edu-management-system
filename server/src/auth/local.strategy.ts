import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IUser } from '../user/interface/user'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor (private readonly authService: AuthService) {
		super({
			usernameField: 'userId',
		})
	}

	/**
	 * @description
	 * @since 21/12/2022上午12:05
	 * @param userId { string } 用户ID
	 * @param password { string } 用户密钥
	 *
	 * @Exception { UnauthorizedException } 用户账号或者密码错误
	 * @return IUser 用户信息
	 *  */
	async validate (userId: string, password: string): Promise<IUser | Error> {
		const user = await this.authService.validateUser(userId, password)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user as IUser
	}
}
