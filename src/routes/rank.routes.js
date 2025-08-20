import { Router } from "express";
import { getAllRanks, getRankById, createRank, updateRank, deleteRank } from "../controllers/rank.controllers.js";

const routesRank = Router();
routesRank.get("/ranks", getAllRanks);
routesRank.get("/ranks/:id", getRankById); 
routesRank.post("/ranks", createRank);
routesRank.put("/ranks/:id", updateRank);
routesRank.delete("/ranks/:id", deleteRank);

export default routesRank;


