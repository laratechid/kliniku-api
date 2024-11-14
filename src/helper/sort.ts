import { Day } from "../enum/schedule";
import lo from "lodash"

export function sortClinicSchedules(schedules: { day: Day }[]) {
    const dayOrder = Object.values(Day);
    return lo.sortBy(schedules, (schedule) => dayOrder.indexOf(schedule.day));
}

export function getMissingSequence(sequences: number[]): number[] {

    const min = sequences.length === 1 ? 1 : Math.min(...sequences);
    const max = Math.max(...sequences);

    const missingSequence = [];
    for (let i = min; i <= max; i++) {
        if (!sequences.includes(i)) {
            missingSequence.push(i);
        }
    }

    return missingSequence
}