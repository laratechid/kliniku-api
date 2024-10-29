import { validate, ValidationError } from "class-validator";


export async function validation<T extends object>(obj: T): Promise<{ valid: boolean, msg: any[] }> {
    let msg = []
    const errors: ValidationError[] = await validate(obj);
    if (errors.length > 0) {
        msg = errors.map(({ property, constraints }) => ({ property, constraints }))
        return { valid: false, msg };
    } else {
        return { valid: true, msg };
    }
}