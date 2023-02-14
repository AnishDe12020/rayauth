import env from 'dotenv';
env.config();
import express, { Express, Request, Response } from 'express';
import { HOST, PORT } from './constant';
import cors from 'cors';

const app: Express = express();


app.use(cors());
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Hello');
});

app.listen(Number(PORT), HOST, () => {
  console.log('Server up and running;');
  console.log(process.env.PORT);
});