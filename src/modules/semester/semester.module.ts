import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterResolver } from './semester.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester } from './entities/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  providers: [SemesterResolver, SemesterService],
  exports: [SemesterService],
})
export class SemesterModule {}
