import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@zeowna/auth';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Company } from './entities/company.entity';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOkResponse({ type: [Company] })
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

  @ApiOkResponse({ type: Company })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }

  @ApiCreatedResponse({ type: Company })
  @Post()
  async create(@Body() createUserDto: CreateCompanyDto) {
    return this.companiesService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Company })
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
