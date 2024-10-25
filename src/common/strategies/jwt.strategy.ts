import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/entities/user.entity';
import { jwtConstants } from 'src/constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = (await this.usersService.findAll()).find(
      (user) => user.email === payload,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
