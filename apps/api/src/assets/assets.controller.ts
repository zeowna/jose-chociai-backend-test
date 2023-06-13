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
import { AuthGuard } from '../auth/auth.guard';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() { user }: any,
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
  async findById(@Req() { user }: any, @Param('id') id: string) {
    return this.assetsService.findByIdAndOwnerId(id, user.companyId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() { user }: any, @Body() createAssetDto: CreateAssetDto) {
    createAssetDto.ownerId = user.companyId;
    return this.assetsService.create(createAssetDto);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}
