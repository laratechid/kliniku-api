import { Day, DaysCode } from "../enum/schedule";

export function translateDayCode(code: number): Day {
    switch (code) {
        case DaysCode.Senin:
            return Day.Senin
        case DaysCode.Selasa:
            return Day.Selasa
        case DaysCode.Rabu:
            return Day.Rabu
        case DaysCode.Kamis:
            return Day.Kamis
        case DaysCode.Jumat:
            return Day.Jumat
        case DaysCode.Sabtu:
            return Day.Sabtu
        case DaysCode.Minggu:
            return Day.Minggu
    }
}