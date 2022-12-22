import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception/http-exception.filter'
import { LoggerInterceptor } from './logger/logger.interceptor'
import helmet from 'helmet' // 帮助保护应用免受一些众所周知的 Web 漏洞的影响
const PORT = process.env.APP_PORT

declare const module: any

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(helmet())
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe()) // 全局管道
	app.useGlobalFilters(new HttpExceptionFilter()) // 全局异常过滤器
	app.useGlobalInterceptors(new LoggerInterceptor()) // 全局拦截器
	await app.listen(PORT)

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}

bootstrap()
