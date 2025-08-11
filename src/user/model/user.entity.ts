import { ENUM } from "sequelize";
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  birth_year: number;
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare gender: string;

  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string | null;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;
}
