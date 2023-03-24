import { UserDAO } from './user-dao';
import { User } from './user';

const app = express();
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

// GET /users
app.get('/users', async (req: Request, res: Response) => {
  const users = await userDAO.getAll();
  res.send(users);
});

// GET /users/:id
app.get('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userDAO.getById(id);

  if (!user) {
    res.sendStatus(404);
  } else {
    res.send(user);
  }
});

// POST /users
app.post('/users', async (req: Request, res: Response) => {
  const user = req.body as User;

  if (!user.name || !user.email) {
    res.sendStatus(400);
    return;
  }

  const newUser = await userDAO.create(user);
  res.status(201).send(newUser);
});

// PUT /users/:id
app.put('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body as User;

  const updatedUser = await userDAO.update(id, user);

  if (!updatedUser) {
    res.sendStatus(404);
  } else {
    res.send(updatedUser);
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleted = await userDAO.delete(id);

  if (deleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});