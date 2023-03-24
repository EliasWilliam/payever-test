import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserDAO } from './user-dao';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const userDAO = new UserDAO();
  const mongoUri = 'mongodb://localhost:27017';
  const dbName = 'mydb';
  const collectionName = 'users';

  try {
    await userDAO.connect(mongoUri, dbName, collectionName);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }

  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`App listening at http://localhost:${port}`);
}

bootstrap();