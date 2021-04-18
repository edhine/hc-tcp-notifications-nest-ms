
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env);
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        host: '0.0.0.0',
        port 
      },
      transport: Transport.TCP,
    },
  );
  app.listen(() => console.log('Microservice is listening', 'TCP Host:', port));
}
bootstrap();

