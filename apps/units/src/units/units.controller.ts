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
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { AuthGuard } from '@zeowna/auth';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Unit } from './entities/unit.entity';
import { CustomRequest } from '@zeowna/common';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @ApiOkResponse({ type: Unit })
  @Get()
  async findAll(
    @Req() request: CustomRequest,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.unitsService.findAll(
      skip ? +skip : undefined,
      limit ? +limit : undefined,
      sort ? JSON.parse(sort) : undefined,
      request.correlationId,
    );
  }

  @ApiOkResponse({ type: Unit })
  @Get(':id')
  async findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.unitsService.findById(id, request.correlationId);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Unit })
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() { user, correlationId }: CustomRequest,
    @Body() createUnitDto: CreateUnitDto,
  ) {
    createUnitDto.companyId = user.companyId;
    return this.unitsService.create(createUnitDto, correlationId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Unit })
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Req() { user, correlationId }: CustomRequest,
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitsService.updateByCompanyId(
      id,
      user.companyId,
      updateUnitDto,
      correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Unit })
  @Delete(':id')
  async remove(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.unitsService.remove(id, request.correlationId);
  }
}
