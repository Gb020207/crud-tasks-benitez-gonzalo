import { Router } from "express";
import { getAllRanks, getRankById, createRank, deleteRankById, updateRankById } from "../controllers/rank.controllers.js";

const routesRank = Router();
routesRank.get("/ranks", getAllRanks);
routesRank.get("/ranks/:id", getRankById); 
routesRank.post("/ranks", createRank);
routesRank.put("/ranks/:id", updateRankById);
routesRank.delete("/ranks/:id", deleteRankById);

export default routesRank;


