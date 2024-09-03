import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FacultyDto } from 'src/modules/faculty/dto/faculty.dto';
import { LecturerDto } from 'src/modules/lecturer/dto/lecturer.dto';
import { UserEntity, UserPreference } from '../../entities/user.entity';
import { Role } from '../../enums/role.enum';

@ObjectType()
export class UserDto {
  @Field(() => String)
  user_id: string;

  @Field(() => Role)
  role: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => FacultyDto, { nullable: true })
  faculty?: FacultyDto;

  @Field(() => LecturerDto, { nullable: true })
  lecturer?: LecturerDto;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  lastAccess: Date;

  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String)
  fullname: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  department: string;

  @Field(() => Int, { nullable: true })
  firstaccess: number;

  @Field(() => Int, { nullable: true })
  lastaccess: number;

  @Field(() => String, { nullable: true })
  auth: string;

  @Field(() => String, { nullable: true })
  suspended: string;

  @Field(() => String, { nullable: true })
  confirmed: string;

  @Field(() => String, { nullable: true })
  lang: string;

  @Field(() => String, { nullable: true })
  theme: string;

  @Field(() => String, { nullable: true })
  timezone: string;

  @Field(() => String, { nullable: true })
  mailformat: number;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  profileimageurlsmall: string;

  @Field(() => String, { nullable: true })
  profileimageurl: string;

  @Field(() => Boolean, { defaultValue: true })
  isDefault: boolean;

  @Field(() => [UserPreference])
  preferences: UserPreference[];

  constructor(entity: UserEntity) {
    if (!entity) return;
    this.role = entity.role;
    this.displayName = entity.displayName;
    this.id = entity.id;
    this.faculty = new FacultyDto(entity.faculty);
    this.lecturer = new LecturerDto(entity.lecturer);
    this.user_id = entity.user_id;
    this.isDefault = entity.isDefault;
    this.username = entity.username;
    this.fullname = entity.fullname;
    this.password = entity.password;
    this.email = entity.email;
    this.auth = entity.auth;
    this.city = entity.city;
    this.confirmed = entity.confirmed;
    this.country = entity.country;
    this.department = entity.department;
    this.firstaccess = entity.firstaccess;
    this.lastaccess = entity.lastaccess;
    this.lang = entity.lang;
    this.mailformat = entity.mailformat;
    this.profileimageurl = entity.profileimageurl;
    this.profileimageurlsmall = entity.profileimageurlsmall;
    this.suspended = entity.suspended;
    this.theme = entity.theme;
    this.timezone = entity.timezone;
    this.preferences = entity.preferences;
    this.token = entity.token;
  }
}
