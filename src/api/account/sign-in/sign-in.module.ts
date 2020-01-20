import { Module } from '@nestjs/common';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from 'src/account/strategy';
import { UserEntity } from 'src/entities/user.entity';
import { AccessEntity } from 'src/entities/access.entity';

@Module({
  controllers: [SignInController],
  providers: [SignInService, LocalStrategy],
  imports: [TypeOrmModule.forFeature([UserEntity, AccessEntity])]
})
export class SignInModule { }