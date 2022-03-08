import { ApiProperty } from "@nestjs/swagger";
import { swagger } from "./users.swagger";

export class CreateUserDto {
   @ApiProperty(swagger.email)
   readonly email: string

   @ApiProperty(swagger.password)
   readonly password: string
}