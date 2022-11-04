import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService
   ) {}

   async login(userDto: CreateUserDto) {
      const user = await this.validateUser(userDto)
      return this.generateToken(user)
   }

   async registration(userDto: CreateUserDto) {
      const isNewUser = await this.usersService.getUserByEmail(userDto.email)
      if(isNewUser) {
         throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5)
      const newUser = await this.usersService.createUser({ ...userDto, password: hashPassword })
      return this.generateToken(newUser)
   }

   private async generateToken(user: User) {
      return {
         token: this.jwtService.sign({
            email: user.email, id: user.id, roles: user.roles
         })
      }
   }

   private async validateUser(userDto: CreateUserDto) {
      const user = await this.usersService.getUserByEmail(userDto.email)
      if(user) {
         const passwordEquals = await bcrypt.compare(userDto.password, user.password)
         if(passwordEquals) return user
      }
      throw new UnauthorizedException({ message: 'Неверно указан email или пароль' })
   }
}