import { Router } from "express";
import { getAllUserRanks, createUserRank } from "../controllers/rank_user.controllers.js";

const routerRankUser = Router();
routerRankUser.get("/user-ranks", getAllUserRanks);
routerRankUser.post("/user-ranks", createUserRank);

export default routerRankUser;