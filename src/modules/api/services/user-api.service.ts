import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';
import WS_FUNCTION from 'src/common/constants/function-name';
import { UserNotFoundException } from '../../user/errors/not-found.error';
import { UserEntity } from '../../user/entities/user.entity';
import { UserDto } from 'src/modules/user/dto/response/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserApiService {
  constructor(private readonly apiService: ApiService) {}

  async getUserProfile({
    token,
    username,
  }: {
    token: string;
    username: string;
  }): Promise<UserDto> {
    const data = await this.apiService.fetchMoodleData<UserEntity[]>({
      token,
      functionName: WS_FUNCTION.GET_USER_PROFILE,
      params: { field: 'username', 'values[0]': username },
    });
    if (data.length == 0) {
      throw new UserNotFoundException(username);
    }
    console.log(JSON.stringify(data));

    return new UserDto({
      token,
      id: data[0].user_id,
      user_id: uuidv4(),
      ...data[0],
    });
    // return { ...data[0], token };
  }
}
