import { Module, HttpModule } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';


@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ]
})
export class SignUpModule {}
