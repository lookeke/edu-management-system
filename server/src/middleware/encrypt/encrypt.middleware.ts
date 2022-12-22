import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { decrypt } from '../../utils/decrypt'

@Injectable()
export class EncryptMiddleware implements NestMiddleware {
	/**
	 * @description 加密用户传输的密码
	 * @since 18/12/2022下午6:41
	 * @param req { Request }  请求对象
	 * @param res { Response } 响应对象
	 * @param next { NextFunction } 下一步回调
	 * @return new password { string } 加密后的密码
	 *  */
	async use (req: Request, res: Response, next: NextFunction) {
		console.log(req.body)
		req.body['password'] = decrypt(req.body['password'])
		next()
	}
}
