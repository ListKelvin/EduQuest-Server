import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LecturerModule } from '../../modules/lecturer/lecturer.module';
import { SemesterModule } from '../../modules/semester/semester.module';
import { SubjectModule } from '../../modules/subject/subject.module';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { Class } from './entities/class.entity';
import { PointModule } from '../../modules/point/point.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    forwardRef(() => LecturerModule),
    forwardRef(() => SubjectModule),
    forwardRef(() => SemesterModule),
    forwardRef(() => PointModule),
  ],
  providers: [ClassResolver, ClassService],
  exports: [TypeOrmModule.forFeature([Class]), ClassService],
})
export class ClassModule {}
