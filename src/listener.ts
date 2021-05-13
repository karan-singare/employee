import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://qwwqofat:Sd16PPLjvIyxLZb1rbiePqxSUa2VQALo@puffin.rmq2.cloudamqp.com/qwwqofat',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen(() => {
    console.log('Microservice is listening');
  });
}
bootstrap();
