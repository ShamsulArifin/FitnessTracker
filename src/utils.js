import {
  KG_TO_LBS_FACTOR,
  CM_TO_INCHES_FACTOR,
  INCHES_TO_CM_FACTOR,
  FEET_TO_CM_FACTOR,
} from "./constants"

export const convertWeight = (weight, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return weight
  if (fromUnit === "kg" && toUnit === "lbs") return weight * KG_TO_LBS_FACTOR
  if (fromUnit === "lbs" && toUnit === "kg") return weight / KG_TO_LBS_FACTOR
  return weight
}

export const convertHeightToCm = (heightValue, fromUnit, fromInches = 0) => {
  if (fromUnit === "cm") return heightValue
  if (fromUnit === "inches") return heightValue * INCHES_TO_CM_FACTOR
  if (fromUnit === "ft/in") {
    return heightValue * FEET_TO_CM_FACTOR + fromInches * INCHES_TO_CM_FACTOR
  }
  return heightValue
}

export const convertCmToDisplayHeight = (heightCm, toUnit) => {
  if (toUnit === "cm") return heightCm
  if (toUnit === "inches") return heightCm * CM_TO_INCHES_FACTOR
  if (toUnit === "ft/in") {
    const totalInches = heightCm * CM_TO_INCHES_FACTOR
    const feet = Math.floor(totalInches / 12)
    const inches = totalInches % 12
    return { feet: feet, inches: inches }
  }
  return heightCm
}

export const calculateBMI = (weightKg, heightCm) => {
  if (
    weightKg === null ||
    isNaN(weightKg) ||
    heightCm === null ||
    isNaN(heightCm) ||
    heightCm <= 0
  ) {
    return null
  }
  const heightM = heightCm / 100
  return (weightKg / (heightM * heightM)).toFixed(2)
}

export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
