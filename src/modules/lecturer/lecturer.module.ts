import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from '../../modules/class/class.module';
import { FacultyModule } from '../faculty/faculty.module';
import { PointModule } from '../point/point.module';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerResolver } from './lecturer.resolver';
import { LecturerService } from './lecturer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer]),
    forwardRef(() => FacultyModule),
    PointModule,
    forwardRef(() => ClassModule),
  ],
  providers: [LecturerResolver, LecturerService],
  exports: [LecturerService],
})
export class LecturerModule {}
