import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [AuthModule, UserModule, WorkspaceModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ModulesModule {}
