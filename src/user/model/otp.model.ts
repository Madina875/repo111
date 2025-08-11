import { UUIDV4 } from "sequelize";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface IOtpCreationAttr {
  // id: string;
  otp: string;
  expiration_time: Date;
  // verified: boolean;
  phone_number: string;
}

@Table({ tableName: "otp" })
export class Otp extends Model<Otp, IOtpCreationAttr> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  declare id: string;
  @Column({ type: DataType.STRING })
  declare otp: string;
  @Column({ type: DataType.DATE })
  declare expiration_time: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare verified: boolean;
  @Column({ type: DataType.STRING })
  declare phone_number: string;
}
