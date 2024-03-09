import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as process from 'process';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe());
  const genDocs = process.env.GEN_DOCS || 'false';

  const config = new DocumentBuilder()
    .setTitle('NodeJS2024Q1-Service')
    .setDescription('Home Library Service : Tast7')
    .setVersion('1.0.0')
    .addTag('Mamont Studio')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/doc', app, document, {
    swaggerOptions: {
      validatorUrl: null,
      displayRequestDuration: true,
    },
  });

  if (genDocs === 'true') {
    const yamlDoc = yaml.dump(document, { noRefs: true });
    await fs.promises.writeFile('doc/api.yaml', yamlDoc);
  }

  await app.listen(port, () => console.log(`Server started on port:  ${PORT}`));
}
bootstrap();
