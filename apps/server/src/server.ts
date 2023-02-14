import env from 'dotenv';
env.config();
import express, { Express, Request, Response } from 'express';
import { HOST, PORT } from './constant';
import cors from 'cors';
import { initGithub } from './auth/github';
import callback from './controllers/github/callback';
import login from './controllers/github/login';
const app: Express = express();

initGithub();
app.use(cors());
app.use(express.json());
app.use(login)
app.use(callback)
app.get('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello');
});

app.listen(Number(PORT), HOST, () => {
  console.log('Server up and running;');
  console.log(process.env.PORT);
});