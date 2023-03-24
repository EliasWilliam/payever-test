//
import { UserDAO } from './user-dao';

const port = 3000;

const userDAO = new UserDAO();
const mongoUri = 'mongodb://localhost:27017';
const dbName = 'mydb';
const collectionName = 'users';

async function startApp() {
  try {
    await userDAO.connect(mongoUri, dbName, collectionName);
    console.log('MongoDB connected successfully');

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${3000}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

startApp();