import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTAccountDTO } from './DTO/jwtAccountDTO';
import { SignInService } from 'src/api/account/sign-in/sign-in.service';
import { UserEntity } from 'src/entities/user.entity';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly signInService: SignInService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTAccountDTO): Promise<UserEntity> {
    if (payload.id && payload.service) {
      const account = await this.signInService.fingerprint(payload).catch(error => {
        return null;
      });

      return account;
    }

    return null;
  }
}
