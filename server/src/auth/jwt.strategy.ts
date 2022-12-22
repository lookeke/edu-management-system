import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../config/secret'
import { PayloadDto } from './dto/payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}

	/**
	 * @description 根据token返回用户信息
	 * @since 21/12/2022下午3:20
	 * @param payload { PayloadDto } 荷载信息
	 * @return 用户信息
	 *  */
	async validate (payload: PayloadDto): Promise<Omit<PayloadDto, 'sub'>> {
		const { username, role, sub } = payload
		return {
			username: username,
			userId: sub,
			role: role,
		}
	}
}
