import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminGuard } from '../common/guard/admin.guard';
import { SelfAdminGuard } from '../common/guard/selfadmin.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { FalseAdminGuard } from '../common/guard/oddiy_admin.guard';

@ApiTags('Admin - admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: 'Admin successfully created' })
  @UseGuards(AuthGuard, AdminGuard, SelfAdminGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'List of all admins returned' })
  @UseGuards(AuthGuard, AdminGuard, SelfAdminGuard)
  findAll() {
    return this.adminService.findAllAdmins();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Admin found by ID' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @UseGuards(AuthGuard, AdminGuard, FalseAdminGuard)
  findOne(@Param('id') id: string) {
    return this.adminService.findOneAdmin(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: 'Admin successfully updated' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @UseGuards(AuthGuard, AdminGuard, SelfAdminGuard)
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Admin successfully deleted' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  @UseGuards(AuthGuard, AdminGuard, FalseAdminGuard)
  remove(@Param('id') id: string) {
    return this.adminService.removeAdmin(+id);
  }
}
