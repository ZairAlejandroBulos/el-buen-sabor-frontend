export function isValidString(value : string): boolean {
    return value.trim() !== "";
}

export function isStringLenghtInRange(value : string, min: number, max: number): boolean {
    return value.length >= min && value.length <= max;
}

export function areStringsEqual(value1: string, value2: string): boolean {
    return value1 === value2;
}

export function isNumberPositive(value: number): boolean {
    return value > 0;
}

export function isNumberInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}