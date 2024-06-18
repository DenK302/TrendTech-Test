import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './document.interface';
import * as faker from 'faker';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('Document') private readonly documentModel: Model<Document>) {}

  generateRandomString(length: number): string {
    return faker.random.alphaNumeric(length);
  }

  async createDocuments(totalDocuments: number): Promise<void> {
    const batchSize=10000
    const numBatches = Math.ceil(totalDocuments / batchSize);

    for (let batch = 0; batch < numBatches; batch++) {
        const documents = [];
        for (let i = 0; i < batchSize && (batch * batchSize + i) < totalDocuments; i++) {
            documents.push({ name: this.generateRandomString(10) });
        }
        await this.documentModel.insertMany(documents);
        console.log(`${(batch+1)*batchSize} documents are saved`);
    }
  }

  async findDocumentByName(name: string): Promise<Document[]> {
    return this.documentModel.find({ name }).exec();
  }

  async createIndex(field: string): Promise<void> {
    await this.documentModel.collection.createIndex({ [field]: 1 });
    console.log(`Index on field ${field} created!`)
  }
  
  async removeIndex(field: string): Promise<void> {
    await this.documentModel.collection.dropIndex(`${field}_1`);
    console.log(`Index on field ${field} removed!`)
  }
}