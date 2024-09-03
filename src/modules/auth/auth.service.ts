import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as moment from 'moment';
import API_URL from 'src/common/constants/url';
import { MoodleException } from '../api/errors/moodle.error';
import { UserApiService } from '../api/services/user-api.service';
import { UserDto } from '../user/dto/response/user.dto';
import { UserService } from '../user/user.service';
import { RequestUserDto } from './dtos/request/user.dto';
import { AuthDto } from './dtos/response/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userApiService: UserApiService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userRequest: RequestUserDto) {
    const user = await this.userService.findByUsername(userRequest.username);
    console.log('user ne', JSON.stringify(user), 'aaaa');

    const { password, username } = { ...userRequest };

    if (!user) {
      console.log('???????????????/');
      const response = await axios.post(API_URL.authentication, null, {
        params: { username, password, service: 'moodle_mobile_app' },
      });

      console.log(response, 'response ne');

      if (!response.data.token) {
        throw new MoodleException(
          response.data.exception,
          response.data.errorcode,
          response.data.error,
        );
      }

      const userData = await this.userApiService.getUserProfile({
        username,
        token: response.data.token,
      });
      console.log(userData, 'userData ne');

      await this.userService.createDefault(userData);

      const auth = new AuthDto({
        isFirstTimeLogin: true,
        token: response.data.token,
        ...userData,
      });

      return { auth, userData };
      // } else if (!user.password) {
      //   throw new UnauthorizedException('User password is missing');
    } else {
      if (user.isDefault) {
        const response = await axios.post(API_URL.authentication, null, {
          params: { username, password, service: 'moodle_mobile_app' },
        });

        const auth = new AuthDto({
          isFirstTimeLogin: false,
          token: response.data.token,
          ...user,
        });

        return { auth, user };
      } else {
        // const isMatch = await bcrypt.compare(
        //   userRequest.password,
        //   user.password,
        // );

        // if (isMatch) {
        //   return user;
        // }
        let auth: undefined;
        return { auth, user };
      }
    }
    // throw new UnauthorizedException();
  }

  async login(user: UserDto) {
    const payload = { ...user, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '100d' }),
      user,
    };
  }

  async validateDefaultUser(userRequest: RequestUserDto): Promise<AuthDto> {
    const { password, username } = { ...userRequest };
    const response = await axios.post(API_URL.authentication, null, {
      params: { username, password, service: 'moodle_mobile_app' },
    });

    if (!response.data.token) {
      throw new MoodleException(
        response.data.exception,
        response.data.errorcode,
        response.data.error,
      );
    }

    const userDataFromDB = await this.userService.findByUsername(username);

    if (userDataFromDB) {
      return new AuthDto({
        isFirstTimeLogin: false,
        token: response.data.token,
        ...userDataFromDB,
      });
    }

    const userData = await this.userApiService.getUserProfile({
      username,
      token: response.data.token,
    });

    await this.userService.createDefault(userData);

    return new AuthDto({
      isFirstTimeLogin: true,
      token: response.data.token,
      ...userData,
    });
  }

  generateToken(authDto: AuthDto) {
    const access_token = this.jwtService.sign(
      {
        ...authDto,
        sub: authDto.username,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn:
          this.configService.get('ENVIRONMENT') === 'development'
            ? '100d'
            : '1h',
      },
    );
    const accessTokenExpiredDate = moment().add(1, 'hour').toDate();

    const refresh_token = this.jwtService.sign(
      {
        ...authDto,
        sub: authDto.username,
      },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '14d',
      },
    );
    const refreshTokenExpiredDate = moment().add(14, 'days').toDate();

    return {
      access_token,
      refresh_token,
      accessTokenExpiredDate,
      refreshTokenExpiredDate,
    };
  }

  refreshToken(userDto: UserDto) {
    const access_token = this.jwtService.sign(
      {
        ...userDto,
        sub: userDto.username,
      },
      { secret: this.configService.get('ACCESS_TOKEN_SECRET') },
    );
    const accessTokenExpiredDate = moment().add(1, 'hour').toDate();

    return { access_token, accessTokenExpiredDate };
  }
}
