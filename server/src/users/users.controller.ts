import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
   constructor(
      private userService: UsersService
   ) {}

   @ApiOperation({ summary: 'Создание пользователя' })
   @ApiResponse({ status: 200, type: User })
   @Post()
   create(@Body() userDto: CreateUserDto) {
      return this.userService.createUser(userDto)
   }

   @ApiOperation({ summary: 'Получить всех пользователей' })
   @ApiResponse({ status: 200, type: [User] })
   @UseGuards(JwtAuthGuard)
   @Roles('admin')
   @UseGuards(RolesGuard)
   @Get()
   getAll() {
      return this.userService.getAllUsers()
   }

   @ApiOperation({ summary: 'Выдать роль' })
   @ApiResponse({ status: 200 })
   @UseGuards(JwtAuthGuard)
   @Roles('admin')
   @UseGuards(RolesGuard)
   @Post('/role')
   addRole(@Body() dto: AddRoleDto) {
      return this.userService.addRole(dto)
   }

   @ApiOperation({ summary: 'Забанить' })
   @ApiResponse({ status: 200 })
   @UseGuards(JwtAuthGuard)
   @Roles('admin')
   @UseGuards(RolesGuard)
   @Post('/ban')
   ban(@Body() dto: BanUserDto) {
      return this.userService.ban(dto)
   }
}