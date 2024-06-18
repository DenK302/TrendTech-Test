import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('search')
  async search(@Query('name') name: string) {
    return this.databaseService.findDocumentByName(name);
  }

  @Post('create-index')
  async createIndex(@Body('field') field: string) {
    await this.databaseService.createIndex(field);
    return { message: `Index on ${field} created` };
  }

  @Post('remove-index')
  async removeIndex(@Body('field') field: string) {
    await this.databaseService.removeIndex(field);
    return { message: `Index on ${field} removed` };
  }

  @Post('create-documents')
  async createDocuments(@Body('count') count: number) {
    console.log("123123123123123123123")
    await this.databaseService.createDocuments(Number(count));
    return { message: `${count} documents created` };
  }
}
