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
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetsService } from './assets.service';
import { AuthGuard } from '@zeowna/auth';
import { UpdateAssetHealthLevelDto } from './dto/update-asset-health-level.dto';
import { CustomRequest } from '@zeowna/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Asset } from './entities/asset.entity';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: [Asset] })
  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() { user, correlationId }: CustomRequest,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.assetsService.findAllByOwnerId(
      user.companyId,
      skip ? +skip : undefined,
      limit ? +limit : undefined,
      sort ? JSON.parse(sort) : undefined,
      correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [Asset] })
  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(
    @Req() { user, correlationId }: CustomRequest,
    @Param('id') id: string,
  ) {
    return this.assetsService.findByIdAndOwnerId(
      id,
      user.companyId,
      correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Asset })
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() { user, correlationId }: CustomRequest,
    @Body() createAssetDto: CreateAssetDto,
  ) {
    createAssetDto.ownerId = user.companyId;
    return this.assetsService.create(createAssetDto, correlationId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Asset })
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetsService.update(id, updateAssetDto, request.correlationId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Asset })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.assetsService.remove(id, request.correlationId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Asset })
  @Patch(':id/healthLevel')
  @UseGuards(AuthGuard)
  async updateHealthLevel(
    @Param('id') id: string,
    @Req() { user, correlationId }: CustomRequest,
    @Body() updateAssetHealthLevelDto: UpdateAssetHealthLevelDto,
  ) {
    return this.assetsService.updateHealthLevel(
      id,
      user.companyId,
      updateAssetHealthLevelDto,
      correlationId,
    );
  }
}
