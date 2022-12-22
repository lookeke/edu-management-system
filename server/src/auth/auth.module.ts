import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../config/secret'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '5d' },
		})],
	providers: [AuthService, LocalStrategy,JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
