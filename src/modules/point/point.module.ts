import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointResolver } from './point.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointResolver, PointService],
  exports: [PointService],
})
export class PointModule {}
