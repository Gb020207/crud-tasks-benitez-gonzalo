import express from 'express';
import { initDB } from './src/config/database.js';
import dotenv from 'dotenv';
import routerTask from './src/routes/task.routes.js';
import routesUser from './src/routes/user.routes.js';
import routesRank from './src/routes/rank.routes.js';
import routerRankUser from './src/routes/rank_user.routes.js';
import routerReward from './src/routes/reward.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use("/api", routerTask)
app.use("/api", routesUser);
app.use("/api", routesRank);
app.use("/api", routerRankUser);
app.use("/api", routerReward);

app.get('/', (req, res) => res.json({ ok: true }));




initDB();

app.listen(PORT, () => {
  console.log(`Se esta ecuchando la ruta ${PORT}`);});

