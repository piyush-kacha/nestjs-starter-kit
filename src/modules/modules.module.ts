import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

/**
 * The `ModulesModule` is a NestJS module that imports and consolidates
 * several other modules including `AuthModule`, `UserModule`, and `WorkspaceModule`.
 * This module does not define any controllers, providers, or exports.
 */
@Module({
  imports: [AuthModule, UserModule, WorkspaceModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ModulesModule {}
