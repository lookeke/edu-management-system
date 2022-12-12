import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { LoggerInterceptor } from './logger/logger.interceptor';

const PORT = process.env.APP_PORT;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe()); // 全局管道
	app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器
	app.useGlobalInterceptors(new LoggerInterceptor()); // 全局拦截器
	await app.listen(PORT);
}

bootstrap();
