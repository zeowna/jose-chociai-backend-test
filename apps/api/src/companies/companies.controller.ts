import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.companiesService.findAll(
      +skip,
      +limit,
      sort ? JSON.parse(sort) : undefined,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateCompanyDto) {
    return this.companiesService.create(createUserDto);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
