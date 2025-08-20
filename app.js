import express from 'express';
import { initDB } from './src/config/database.js';
import dotenv from 'dotenv';
import routerTask from './src/routes/task.routes.js';
import routesUser from './src/routes/user.routes.js';
import { Task } from './src/models/task.models.js';
import { User } from './src/models/user.models.js';
import { Rank } from './src/models/rank.models.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use("/api", routerTask)
app.use("/api", routesUser);
app.get('/', (req, res) => res.json({ ok: true }));




initDB();

app.listen(PORT, () => {
  console.log(`Se esta ecuchando la ruta ${PORT}`);});

