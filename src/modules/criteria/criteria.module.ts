import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterModule } from '../semester/semester.module';
import { CriteriaResolver } from './criteria.resolver';
import { CriteriaService } from './criteria.service';
import { Criteria } from './entities/criteria.entity';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Criteria]),
    ClassModule,
    forwardRef(() => SemesterModule),
  ],
  providers: [CriteriaResolver, CriteriaService],
})
export class CriteriaModule {}
