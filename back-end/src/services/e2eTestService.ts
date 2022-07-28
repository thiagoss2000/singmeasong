import { deletAllRecommendations } from "../repositories/e2eTestRepositories.js";

export async function deletAll() {
    await deletAllRecommendations();
}