
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../types/type';
import { emit } from 'process';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configureService: ConfigService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configureService.get<string>('JWT_SECRET')as string,
    });
}

    async validate(user:IUser) {
        return { id:user.id, emeil:user.email, name:user.name};
    }
}
