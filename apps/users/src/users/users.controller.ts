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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@zeowna/auth';
import { CustomRequest } from '@zeowna/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() request: CustomRequest,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.usersService.findAll(
      skip ? +skip : undefined,
      limit ? +limit : undefined,
      sort ? JSON.parse(sort) : undefined,
      request.correlationId,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.usersService.findById(id, request.correlationId);
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, request.correlationId);
  }

  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto, request.correlationId);
  }

  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.usersService.remove(id, request.correlationId);
  }

  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id/password')
  async updatePassword(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(
      id,
      updateUserPasswordDto,
      request.correlationId,
    );
  }
}
