import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  LECTURER = 'LECTURER',
  FACULTY = 'FACULTY',
  FULL_ACCESS = 'FULL_ACCESS',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, { name: 'Role' });
