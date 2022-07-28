import { Router } from "express";
import { resetRecommendations } from "../controllers/e2eTestControllers.js";

const e2eReset = Router();

if(process.env.NODE_ENV === "test"){
    e2eReset.delete("/reset", resetRecommendations);
}

export default e2eReset;