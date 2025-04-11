export const mapCreamSize = {
    20: 'Small',
    30: "Medium",
    40: "Large"
} as const;

export const mapCreamType = {
    1: 'classic',
    2: "vegan"
} as const;

export const creamSizes = Object.entries(mapCreamSize).map(([value, name]) => ({
    name,
    value
}));

export const creamTypes = Object.entries(mapCreamType).map(([value, name]) => ({
    name,
    value
}));

export type CreamSize = keyof typeof mapCreamSize;
export type CreamType = keyof typeof mapCreamType;