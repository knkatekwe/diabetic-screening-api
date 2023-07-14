import { Notifications } from './../../core/models/entities/notification.entity';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('v1/notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async findAll() {
    const payload: Array<Notifications> =
      await this.notificationService.findAll();
    return { payload: payload };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const notification = await this.notificationService.findById(id);
    return { payload: notification };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.notificationService.delete(id);
    return { message: 'Notification removed' };
  }
}
