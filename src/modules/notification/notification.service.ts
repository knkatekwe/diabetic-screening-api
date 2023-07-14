import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/core/models/entities/notification.entity';
import { NotificationRequest } from 'src/core/models/requests/notification.request';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notifications)
    private notificationRepository: Repository<Notifications>,
  ) {}

  async create(notification: NotificationRequest): Promise<Notifications> {
    return this.notificationRepository.save(
      this.notificationRepository.create(notification),
    );
  }

  async findAll(): Promise<Notifications[]> {
    return this.notificationRepository.find();
  }

  async findById(id: string): Promise<Notifications> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async update(id: string, data: any): Promise<any> {
    return this.notificationRepository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
  }

  async delete(id: string): Promise<any> {
    return this.notificationRepository
      .createQueryBuilder()
      .delete()
      .from(Notification)
      .where('id = :id', { id })
      .execute();
  }
}
