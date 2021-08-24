import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
      .setTitle('BL_Payment')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('swagger-ui', app, document);
  await app.listen(3000);
}
bootstrap();
