import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./employee.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    ClientsModule.register([
      {
        name: 'DEPARTMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://qwwqofat:Sd16PPLjvIyxLZb1rbiePqxSUa2VQALo@puffin.rmq2.cloudamqp.com/qwwqofat'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
