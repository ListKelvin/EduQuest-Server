import { Module, forwardRef } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyResolver } from './faculty.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { LecturerModule } from '../lecturer/lecturer.module';
import { SubjectModule } from '../subject/subject.module';
import { PointModule } from '../point/point.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Faculty]),
    forwardRef(() => LecturerModule),
    forwardRef(() => SubjectModule),
    forwardRef(() => PointModule),
  ],
  providers: [FacultyResolver, FacultyService],
  exports: [TypeOrmModule.forFeature([Faculty]), FacultyService],
})
export class FacultyModule {}
