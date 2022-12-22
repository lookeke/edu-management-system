import { Body, Controller, Get, Post } from '@nestjs/common'
import { publicKey } from '../config/rsa'
import { AuthService } from './auth.service'
import { IUserError } from '../user/interface/user'
@Controller('auth')
export class AuthController {
	constructor (private readonly authService: AuthService) {}

	/**
	 * @description 获取公钥
	 * @since 21/12/2022上午1:01
	 * @return publicKey { string } pk1格式的pem公钥字符串
	 *  */
	@Get('pubKey')
	async getPubKey (): Promise<{ publicKey: string | Buffer }> {
		return {
			publicKey: await publicKey.export({
				type: 'pkcs1',
				format: 'pem',
			}),
		}
	}

	/**
	 * @description 验证用户传递的RSA公钥是否正确
	 * @since 21/12/2022下午3:21
	 * @param body { publicKey: string | Buffer } 公钥
	 *
	 * @Exception { IUserError } 用户没有传递publicKey返回的错误
	 * @return 传递给Service层处理
	 *  */
	@Post('profile')
	getProfile (@Body() body: { publicKey: string }): { isVerified: boolean} | IUserError {
		const { publicKey } = body
		if (!publicKey){
			return {
				msg: '请传入对应的publicKey！',
				status:412,
			}
		}
		return this.authService.getProfile(publicKey)
	}
}
