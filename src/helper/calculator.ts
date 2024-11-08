import { Review } from "../entity/review";

export function calculateAverageRating(data: Review[]): number {
    const totalRatings = data.reduce((sum, { rating }) => sum + rating, 0);
    const averageRating = totalRatings / data.length;
    return Math.round(averageRating * 10) / 10;
}