import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { IUser, IUserError } from '../user/interface/user'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dto/user.dto'
import { signature, verifiableData } from '../config/rsa'
import * as crypto from 'node:crypto'

@Injectable()
export class AuthService {
	constructor (
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * @description 检索用户, 验证密码
	 * @since 21/12/2022上午12:35
	 * @param userId { string } 用户ID
	 * @param password { string } 用户密钥
	 *
	 * @Exception { IUserError } 用户账号或者密码不正确
	 * @return user { IUser } 用户信息
	 *  */
	async validateUser (userId: string, password: string): Promise<IUser | IUserError> {
		const user = await this.usersService.findOne(userId)
		if (user && user.password === password) {
			return user as IUser
		}

		return {
			msg: '登录失败! 检查账号或密码是否正确!',
			status: 401,
		}
	}

	/**
	 * @description 发放jwt证书
	 * @since 21/12/2022上午12:37
	 * @param user { UserDto } 用户信息
	 * @return access_token { string } 根据用户信息生成的token
	 *  */
	async login (user: UserDto): Promise<{ access_token: string }> {
		const { id, name, role } = user
		const payload = {
			sub: user.id,
			username: name,
			userId: id,
			role: role,
		}
		return {
			access_token: this.jwtService.sign(payload),
		}
	}

	/**
	 * @description 验证用户传递的RSA公钥是否正确
	 * @since 21/12/2022下午3:21
	 * @param publicKey { publicKey: string } 公钥
	 *
	 * @Exception { IUserError } 用户没有传递publicKey返回的错误
	 * @return isVerified { boolean } 验证结果
	 *  */
	getProfile (publicKey: string): { isVerified: boolean } {
		const isVerified = crypto.verify(
			'sha256', // 加密的算法
			Buffer.from(verifiableData), // 签名
			{
				key: publicKey, // 公钥
				padding: crypto.constants.RSA_PKCS1_PSS_PADDING, // 填充公钥的算法
			},
			signature,
		)
		return {
			isVerified,
		}
	}
}
