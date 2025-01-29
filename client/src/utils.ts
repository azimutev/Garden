export const LuxValueToLightLevel = [
    {min: 50001, value: "High"},
    {min: 14999, value: "Normal"},
    {min: 0,     value: "Poor"},
];

export function getLightLevelEvaluation(lux: number) {
    for (const {min, value} of LuxValueToLightLevel) {
        if (lux >= min) {
            return value;
        }
    }
}