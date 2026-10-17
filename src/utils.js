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

// ── Color manipulation helpers ────────────────────────────────────────────────

/** Parse a 3- or 6-digit hex string to [r, g, b] (0–255). */
export function hexToRgb(hex) {
  const h = hex.replace("#", "")
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ]
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

/** Convert [r,g,b] (0–255) → [h,s,l] (h: 0–360, s/l: 0–100). */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s
  const l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      default: h = ((r - g) / d + 4) / 6
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

/** Convert [h,s,l] (h: 0–360, s/l: 0–100) → "#rrggbb". */
export function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    return Math.round(255 * color).toString(16).padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Derive a chip color from a base hex color by rotating its hue and
 * clamping saturation/lightness to a readable range.
 *
 * @param {string} baseHex  - starting hex color (e.g. theme's main color)
 * @param {number} hueShift - degrees to rotate hue (0–360)
 * @param {number} [sMod]   - saturation modifier (+/-, clamped 30–90)
 * @param {number} [lTarget]- target lightness (clamped 35–70)
 */
export function deriveChipColor(baseHex, hueShift, sMod = 0, lTarget = null) {
  const [r, g, b] = hexToRgb(baseHex)
  let [h, s, l] = rgbToHsl(r, g, b)
  h = (h + hueShift + 360) % 360
  s = Math.min(90, Math.max(30, s + sMod))
  l = lTarget !== null ? lTarget : Math.min(65, Math.max(38, l))
  return hslToHex(h, s, l)
}
