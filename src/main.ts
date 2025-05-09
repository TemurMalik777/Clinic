import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";


async function start() {
  try {
    // Logger.overrideLogger(false); //true
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
      .setTitle('Clinic project')
      .setDescription('CLINIC REST API')
      .setVersion('1.0')
      .addTag('NestJS', 'Validation')
      // .addTag('a', 'Guard')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Iltimos, JWT tokenni kiriting. Format: Bearer <token>',
        },
        'access-token',
      )
      .build();

    const documetn = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documetn);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
