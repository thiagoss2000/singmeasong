import { Request, Response } from "express";
import { deletAll } from "../services/e2eTestService.js";

export async function resetRecommendations(req: Request,res: Response) {
    await deletAll();
    res.send({message: "test database has been deleted!"})
}