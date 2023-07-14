import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './modules/patient/patient.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientVitalModule } from './modules/patient-vital/patient-vital.module';

@Module({
  imports: [
    PatientModule,
    NotificationModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'health_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    PatientVitalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
