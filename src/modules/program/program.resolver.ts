import { Query, Resolver } from '@nestjs/graphql';
import { ProgramService } from './program.service';
import { Program } from './models/Program.model';

@Resolver()
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query(() => [Program], { name: 'programs' })
  findAll() {
    return this.programService.findAll();
  }
}
