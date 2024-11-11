import { Day } from "../enum/schedule";
import lo from "lodash"

export function sortClinicSchedules(schedules: { day: Day }[]) {
    const dayOrder = Object.values(Day);
    return lo.sortBy(schedules, (schedule) => dayOrder.indexOf(schedule.day));
}