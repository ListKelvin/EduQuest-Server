import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { SemesterModule } from './modules/semester/semester.module';
import { ProgramModule } from './modules/program/program.module';
import { SubjectModule } from './modules/subject/subject.module';
import { CriteriaModule } from './modules/criteria/criteria.module';
import { CommentModule } from './modules/comment/comment.module';
import { PointModule } from './modules/point/point.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { ClassModule } from './modules/class/class.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    PermissionModule,
    UserModule,
    AuthModule,
    FacultyModule,
    LecturerModule,
    SemesterModule,
    ClassModule,
    ProgramModule,
    SubjectModule,
    CriteriaModule,
    CommentModule,
    PointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
