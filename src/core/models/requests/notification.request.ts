import { ApiProperty } from '@nestjs/swagger';

export class NotificationRequest {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  priority: string;
}
