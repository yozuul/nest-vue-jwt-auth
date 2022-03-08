import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./roles.model";
import { User } from "../users/users.model";

const { INTEGER } = DataType

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
   @Column({
      type: INTEGER,
      unique: true, autoIncrement: true, primaryKey: true
   }) id: number

   @ForeignKey(() => Role)
   @Column({
      type: INTEGER
   }) roleId: string

   @ForeignKey(() => User)
   @Column({
      type: INTEGER
   }) userId: string
}