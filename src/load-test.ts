import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);
  console.time('insertDocuments');
  await databaseService.createDocuments(10000000);
  console.timeEnd('insertDocuments');

  await databaseService.createIndex('name');
  console.time('searchWithIndex');
  await databaseService.findDocumentByName('test'); // предположим, что 'test' существует
  console.timeEnd('searchWithIndex');

  await databaseService.removeIndex('name');
  console.time('searchWithoutIndex');
  await databaseService.findDocumentByName('test');
  console.timeEnd('searchWithoutIndex');

  await app.close();
}

bootstrap();