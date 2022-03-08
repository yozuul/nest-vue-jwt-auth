import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { swagger } from "./dto/roles.swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

const { INTEGER, STRING } = DataType

interface RoleCreationAttrs {
   value: string,
   description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
   @ApiProperty(swagger.id)
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @ApiProperty(swagger.value)
   @Column({
      type: STRING, unique: true, allowNull: false
   }) value: string

   @ApiProperty(swagger.description)
   @Column({
      type: STRING, allowNull: false
   }) description: string

   @BelongsToMany(() => User, () => UserRoles)
   users: User[]
}