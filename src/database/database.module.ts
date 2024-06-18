import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './database.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
  ],
  providers: [DatabaseService],
  controllers: [DatabaseController]
})
export class DatabaseModule {}
