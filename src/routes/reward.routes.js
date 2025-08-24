import { Router } from "express";
import { getAllRewards, getRewardById, createReward} from "../controllers/reward.controllers.js";  
const routerReward = Router();
routerReward.get("/rewards", getAllRewards);
routerReward.get("/rewards/:id", getRewardById);
routerReward.post("/rewards", createReward);

export default routerReward;