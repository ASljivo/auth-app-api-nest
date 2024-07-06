import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  user() {
    return this.userService.findMe();
  }

  @Patch('me/update')
  update(dto: UserDto) {
    return this.userService.update(dto);
  }

  @Delete('me/delete')
  delete() {
    return this.userService.delete();
  }
}
