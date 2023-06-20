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
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.unitsService.findAll(
      +skip,
      +limit,
      sort ? JSON.parse(sort) : undefined,
    );
  }

  @ApiOkResponse({ type: Unit })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.unitsService.findById(id);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Unit })
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() { user }: CustomRequest,
    @Body() createUnitDto: CreateUnitDto,
  ) {
    createUnitDto.companyId = user.companyId;
    return this.unitsService.create(createUnitDto);
  }

  /**
   * @TODO: Limit this resource by User's Company
   */
  @ApiBearerAuth()
  @ApiOkResponse({ type: Unit })
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Req() { user }: CustomRequest,
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitsService.updateByCompanyId(
      id,
      user.companyId,
      updateUnitDto,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Unit })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitsService.remove(id);
  }
}
