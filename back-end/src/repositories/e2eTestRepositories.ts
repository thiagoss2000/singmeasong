import { prisma } from "../database.js";

export async function deletAllRecommendations() {
  await prisma.recommendation.deleteMany({});
}