import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { swagger } from "./dto/users.swagger";

const { INTEGER, STRING, BOOLEAN } = DataType

interface UserCreationAttrs {
   email: string,
   password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
   @ApiProperty(swagger.id)
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @ApiProperty(swagger.email)
   @Column({
      type: STRING, unique: true, allowNull: false
   }) email: string

   @ApiProperty(swagger.password)
   @Column({
      type: STRING, allowNull: false
   }) password: string

   @ApiProperty(swagger.banned)
   @Column({
      type: BOOLEAN, defaultValue: false
   }) banned: boolean

   @ApiProperty(swagger.banReason)
   @Column({
      type: STRING, allowNull: true
   }) banReason: string
}