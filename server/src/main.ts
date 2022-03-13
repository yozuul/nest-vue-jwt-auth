import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
   const PORT = process.env.PORT || 5000
   const app = await NestFactory.create<NestFastifyApplication>(
      AppModule, new FastifyAdapter()
   )
   app.enableCors()
   const config = new DocumentBuilder()
      .setTitle('Система регистрации и авторизации')
      .setDescription('Документация')
      .setVersion('1.0.0')
      .addTag('Nest / Sequelize / Vue')
      .build()

   const document = SwaggerModule.createDocument(app, config)
   SwaggerModule.setup('/api/docs', app, document)

   await app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
}

start()
