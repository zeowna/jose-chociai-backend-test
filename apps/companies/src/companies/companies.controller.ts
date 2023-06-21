import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
  ApiTags,
} from '@nestjs/swagger';
import { Company } from './entities/company.entity';
import { CustomRequest } from '@zeowna/common';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOkResponse({ type: [Company] })
  @Get()
  async findAll(
    @Req() request: CustomRequest,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.companiesService.findAll(
      skip ? +skip : undefined,
      limit ? +limit : undefined,
      sort ? JSON.parse(sort) : undefined,
      request.correlationId,
    );
  }

  @ApiOkResponse({ type: Company })
  @Get(':id')
  async findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.companiesService.findById(id, request.correlationId);
  }

  @ApiCreatedResponse({ type: Company })
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() createUserDto: CreateCompanyDto,
  ) {
    return this.companiesService.create(createUserDto, request.correlationId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Company })
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(
      id,
      updateUserDto,
      request.correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Company })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.companiesService.remove(id, request.correlationId);
  }
}
