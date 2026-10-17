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

/**
 * Returns "#000" or "#fff" — whichever has better contrast against the given
 * hex/rgb background color. Handles #rrggbb, #rgb, and rgb(...) formats.
 */
export const getContrastTextColor = (bgColor) => {
  if (!bgColor) return "#000"
  let r, g, b

  const hex = bgColor.replace("#", "")
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else {
    // fallback for rgb(...) strings
    const match = bgColor.match(/\d+/g)
    if (!match || match.length < 3) return "#000"
    ;[r, g, b] = match.map(Number)
  }

  // Relative luminance (WCAG formula)
  const luminance = ([r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0))

  // White on dark (luminance < 0.179), black on light
  return luminance < 0.179 ? "#fff" : "#000"
}
