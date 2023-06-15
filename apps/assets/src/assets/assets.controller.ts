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

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() { user }: CustomRequest,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.assetsService.findAllByOwnerId(
      user.companyId,
      +skip,
      +limit,
      sort ? JSON.parse(sort) : undefined,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Req() { user }: CustomRequest, @Param('id') id: string) {
    return this.assetsService.findByIdAndOwnerId(id, user.companyId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() { user }: CustomRequest,
    @Body() createAssetDto: CreateAssetDto,
  ) {
    createAssetDto.ownerId = user.companyId;
    return this.assetsService.create(createAssetDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }

  @Patch(':id/healthLevel')
  @UseGuards(AuthGuard)
  async updateHealthLevel(
    @Param('id') id: string,
    @Req() { user }: CustomRequest,
    @Body() updateAssetHealthLevelDto: UpdateAssetHealthLevelDto,
  ) {
    return this.assetsService.updateHealthLevel(
      id,
      user.companyId,
      updateAssetHealthLevelDto,
    );
  }
}
