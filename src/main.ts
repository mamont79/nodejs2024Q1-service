import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NodeJS2024Q1-Service')
    .setDescription('Home Library Service : Task 7 -- part 2')
    .setVersion('1.0.1')
    .addTag('Mamont Studio')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/doc', app, document, {
    swaggerOptions: {
      validatorUrl: null,
      displayRequestDuration: true,
    },
  });

  await app.listen(port, () => console.log(`Server started on port:  ${PORT}`));
}
bootstrap();
