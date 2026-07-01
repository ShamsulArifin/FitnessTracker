import React, { useState, useCallback } from "react"
import {
  Box, Typography, Paper, Grid, TextField, FormControl,
  InputLabel, Select, MenuItem, Button, Divider, Chip,
  ToggleButton, ToggleButtonGroup, Slider, LinearProgress,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

// ── Constants ─────────────────────────────────────────────────────────────────

const GOALS = [
  { id: "cut",        label: "Cut",          desc: "Lose fat, preserve muscle",   deficit: -500 },
  { id: "maintain",   label: "Maintain",     desc: "Stay at current weight",       deficit:    0 },
  { id: "lean_bulk",  label: "Lean Bulk",    desc: "Slow, clean muscle gain",     deficit:  250 },
  { id: "bulk",       label: "Bulk",         desc: "Aggressive muscle gain",      deficit:  500 },
]

// Macro split ratios [protein%, carb%, fat%] per goal
const MACRO_SPLITS = {
  cut:       { protein: 0.40, carb: 0.35, fat: 0.25 },
  maintain:  { protein: 0.30, carb: 0.40, fat: 0.30 },
  lean_bulk: { protein: 0.30, carb: 0.45, fat: 0.25 },
  bulk:      { protein: 0.25, carb: 0.50, fat: 0.25 },
}

const ACTIVITY_LEVELS = [
  { id: "sedentary",    label: "Sedentary",       desc: "Little or no exercise",                 factor: 1.2   },
  { id: "light",        label: "Lightly Active",  desc: "Light exercise 1–3 days/week",          factor: 1.375 },
  { id: "moderate",     label: "Moderate",        desc: "Moderate exercise 3–5 days/week",       factor: 1.55  },
  { id: "active",       label: "Very Active",     desc: "Hard exercise 6–7 days/week",           factor: 1.725 },
  { id: "extra_active", label: "Extra Active",    desc: "Very hard exercise + physical job",     factor: 1.9   },
]

const calPerGram = { protein: 4, carb: 4, fat: 9 }

// ── BMR Calculation (Mifflin-St Jeor) ─────────────────────────────────────────
function calcBMR({ weightKg, heightCm, age, sex }) {
  if (!weightKg || !heightCm || !age) return null
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === "female" ? base - 161 : base + 5
}

// ── Macro bar ─────────────────────────────────────────────────────────────────
function MacroBar({ label, grams, calories, color, pct }) {
  const theme = useTheme()
  return (
    <Box sx={{ mb: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" fontWeight={700} sx={{ color }}>
          {label}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary" }}>
            {Math.round(grams)}g
          </Typography>
          <Chip
            label={`${Math.round(calories)} kcal`}
            size="small"
            sx={{
              height: 18, fontSize: "0.62rem",
              backgroundColor: color + "28", color,
              "& .MuiChip-label": { px: 0.7 },
            }}
          />
          <Typography variant="body2" sx={{ color: "text.disabled", minWidth: 32, textAlign: "right" }}>
            {Math.round(pct)}%
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8, borderRadius: "4px",
          backgroundColor: color + "22",
          "& .MuiLinearProgress-bar": { backgroundColor: color, borderRadius: "4px" },
        }}
      />
    </Box>
  )
}

// ── Day schedule table ─────────────────────────────────────────────────────────
function DaySchedule({ macros, days }) {
  const theme = useTheme()
  const rows = Array.from({ length: days }, (_, i) => i + 1)

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "80px repeat(4, 1fr)",
          gap: 0,
          minWidth: 380,
        }}
      >
        {/* Header */}
        {["Day", "Calories", "Protein", "Carbs", "Fat"].map((h) => (
          <Box
            key={h}
            sx={{
              p: 1, textAlign: "center",
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              borderBottom: `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary", fontSize: "0.75rem" }}>
              {h}
            </Typography>
          </Box>
        ))}
        {/* Rows */}
        {rows.map((d) => (
          <React.Fragment key={d}>
            {[
              `Day ${d}`,
              `${Math.round(macros.tdee)} kcal`,
              `${Math.round(macros.protein)}g`,
              `${Math.round(macros.carbs)}g`,
              `${Math.round(macros.fat)}g`,
            ].map((val, ci) => (
              <Box
                key={ci}
                sx={{
                  p: 0.8, textAlign: "center",
                  backgroundColor: d % 2 === 0
                    ? (theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)")
                    : "transparent",
                  borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <Typography variant="body2" sx={{ color: ci === 0 ? "text.secondary" : "text.primary", fontSize: "0.78rem" }}>
                  {val}
                </Typography>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MacroCalculator({ unitSystem }) {
  const theme = useTheme()

  // Inputs
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("male")
  const [weightInput, setWeightInput] = useState("")
  const [heightInput, setHeightInput] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [goal, setGoal] = useState("maintain")
  const [days, setDays] = useState(7)

  // ── Derived values ─────────────────────────────────────────────────────────
  const calc = useCallback(() => {
    const w = parseFloat(weightInput)
    const h = parseFloat(heightInput)
    const ft = parseFloat(heightFt)
    const inches = parseFloat(heightIn)
    const a = parseInt(age)

    if (!a || a < 10 || a > 100) return null

    let weightKg, heightCm
    if (unitSystem === "metric") {
      if (!w || !h) return null
      weightKg = w
      heightCm = h
    } else {
      if (!w) return null
      weightKg = w / 2.20462
      if (heightInput) {
        heightCm = parseFloat(heightInput) * 2.54
      } else if (!isNaN(ft) && !isNaN(inches)) {
        heightCm = ft * 30.48 + inches * 2.54
      } else {
        return null
      }
    }

    if (weightKg <= 0 || heightCm <= 0) return null

    const bmr = calcBMR({ weightKg, heightCm, age: a, sex })
    if (!bmr) return null

    const actFactor = ACTIVITY_LEVELS.find((l) => l.id === activityLevel)?.factor || 1.55
    const tdee = bmr * actFactor
    const goalObj = GOALS.find((g) => g.id === goal)
    const targetCals = tdee + (goalObj?.deficit || 0)

    const split = MACRO_SPLITS[goal]
    const proteinCals = targetCals * split.protein
    const carbCals    = targetCals * split.carb
    const fatCals     = targetCals * split.fat

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(targetCals),
      maintenanceTdee: Math.round(tdee),
      deficit: goalObj?.deficit || 0,
      protein: proteinCals / calPerGram.protein,
      carbs:   carbCals    / calPerGram.carb,
      fat:     fatCals     / calPerGram.fat,
      proteinPct: split.protein * 100,
      carbPct:    split.carb    * 100,
      fatPct:     split.fat     * 100,
      weightKg,
      heightCm,
    }
  }, [age, sex, weightInput, heightInput, heightFt, heightIn, activityLevel, goal, unitSystem])

  const result = calc()

  const isImperial = unitSystem === "imperial"
  const wLabel = isImperial ? "Weight (lbs)" : "Weight (kg)"

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Macro Calculator
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: "text.secondary", mb: 3 }}>
        Based on Mifflin-St Jeor formula
      </Typography>

      {/* ── Input panel ── */}
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        {/* All inputs in one flex row — wraps naturally on small screens */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "flex-end",
          }}
        >
          {/* Sex */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: 120 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>Sex</Typography>
            <ToggleButtonGroup
              value={sex} exclusive size="small"
              onChange={(_, v) => { if (v) setSex(v) }}
              sx={{ height: 40 }}
            >
              <ToggleButton value="male"   sx={{ textTransform: "none", px: 2 }}>Male</ToggleButton>
              <ToggleButton value="female" sx={{ textTransform: "none", px: 2 }}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Age */}
          <TextField
            label="Age" type="number" size="small"
            value={age} onChange={(e) => setAge(e.target.value)}
            InputProps={{ inputProps: { min: 10, max: 100 } }}
            sx={{ width: 90 }}
          />

          {/* Weight */}
          <TextField
            label={wLabel} type="number" size="small"
            value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
            sx={{ width: 140 }}
          />

          {/* Height */}
          {isImperial ? (
            <>
              <TextField label="Height (ft)" type="number" size="small"
                value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                sx={{ width: 100 }} />
              <TextField label="Height (in)" type="number" size="small"
                value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                sx={{ width: 100 }} />
            </>
          ) : (
            <TextField
              label="Height (cm)" type="number" size="small"
              value={heightInput} onChange={(e) => setHeightInput(e.target.value)}
              sx={{ width: 140 }}
            />
          )}

          {/* Activity */}
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Activity</InputLabel>
            <Select value={activityLevel} label="Activity" onChange={(e) => setActivityLevel(e.target.value)}>
              {ACTIVITY_LEVELS.map((l) => (
                <MenuItem key={l.id} value={l.id}>{l.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Goal */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1, minWidth: 240 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>Goal</Typography>
            <Box display="flex" gap={1} height={40}>
              {GOALS.map((g) => (
                <Box
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    border: `2px solid ${goal === g.id
                      ? theme.palette.primary.main
                      : theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                    backgroundColor: goal === g.id
                      ? theme.palette.primary.main + "20"
                      : "transparent",
                    transition: "border-color 0.15s, background-color 0.15s",
                    "&:hover": { borderColor: theme.palette.primary.main + "80" },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{
                      color: goal === g.id ? theme.palette.primary.main : "text.secondary",
                      fontSize: "0.78rem",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {g.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Duration slider */}
        <Box sx={{ mt: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>Plan Duration</Typography>
            <Chip
              label={`${days} day${days !== 1 ? "s" : ""}`}
              size="small" color="primary" variant="outlined"
              sx={{ height: 22, fontSize: "0.7rem" }}
            />
          </Box>
          <Slider
            value={days} onChange={(_, v) => setDays(v)}
            min={1} max={30} step={1}
            marks={[{ value: 7, label: "1 wk" }, { value: 14, label: "2 wk" }, { value: 21, label: "3 wk" }, { value: 30, label: "30d" }]}
          />
        </Box>
      </Paper>

      {/* ── Results ── */}
      {!result ? (
        <Box display="flex" alignItems="center" justifyContent="center" py={8}>
          <Typography variant="body1" sx={{ color: "text.disabled" }}>
            Fill in your details above to calculate your macros
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>

          {/* Row 1: 3 calorie stat cards + deficit note */}
          <Grid container spacing={2}>
            {[
              { label: "BMR",         value: result.bmr,             note: "Base metabolic rate",   color: theme.palette.text.secondary },
              { label: "Maintenance", value: result.maintenanceTdee, note: "TDEE (no deficit)",      color: theme.palette.primary.main },
              { label: "Target",      value: result.tdee,            note: GOALS.find(g => g.id === goal)?.desc,
                color: goal === "cut" ? theme.palette.error.main : goal === "maintain" ? theme.palette.primary.main : theme.palette.success.main },
            ].map(({ label, value, note, color }) => (
              <Grid item xs={4} key={label}>
                <Paper elevation={0} sx={{
                  p: 2, textAlign: "center",
                  backgroundColor: color + "14",
                  border: `1px solid ${color}35`,
                }}>
                  <Typography sx={{ fontSize: "1.6rem", fontWeight: 800, color, lineHeight: 1.15 }}>
                    {value.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", mt: 0.25 }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    kcal / day
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Deficit/surplus banner */}
          {result.deficit !== 0 && (
            <Box
              sx={{
                p: 1.5, borderRadius: "6px", textAlign: "center",
                backgroundColor: result.deficit < 0 ? theme.palette.error.main + "14" : theme.palette.success.main + "14",
                border: `1px solid ${result.deficit < 0 ? theme.palette.error.main : theme.palette.success.main}30`,
              }}
            >
              <Typography variant="body2" sx={{ color: result.deficit < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 700 }}>
                {result.deficit < 0 ? `${Math.abs(result.deficit)} kcal deficit/day` : `+${result.deficit} kcal surplus/day`}
                {" · "}
                <span style={{ fontWeight: 400, color: theme.palette.text.secondary }}>
                  ≈ {Math.round(Math.abs(result.deficit) * days / 7700 * 10) / 10} kg {result.deficit < 0 ? "lost" : "gained"} in {days} days
                </span>
              </Typography>
            </Box>
          )}

          {/* Row 2: Macro bars + Per-meal (equal height) */}
          <Grid container spacing={2} alignItems="stretch">

            {/* Macro bars */}
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ p: 2.5, height: "100%" }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Daily Macros</Typography>
                <MacroBar label="Protein" grams={result.protein} calories={result.protein * calPerGram.protein} color={theme.palette.primary.main}            pct={result.proteinPct} />
                <MacroBar label="Carbs"   grams={result.carbs}   calories={result.carbs   * calPerGram.carb}    color={theme.palette.success.main}             pct={result.carbPct}    />
                <MacroBar label="Fat"     grams={result.fat}     calories={result.fat     * calPerGram.fat}      color={theme.palette.warning?.main || "#FFA726"} pct={result.fatPct}  />
              </Paper>
            </Grid>

            {/* Per-meal */}
            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ p: 2.5, height: "100%" }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Per Meal (÷ 4 meals)</Typography>
                <Grid container spacing={1.5}>
                  {[
                    { label: "Calories", val: `${Math.round(result.tdee / 4)}`,     unit: "kcal", color: "text.primary" },
                    { label: "Protein",  val: `${Math.round(result.protein / 4)}`,  unit: "g",    color: theme.palette.primary.main },
                    { label: "Carbs",    val: `${Math.round(result.carbs / 4)}`,    unit: "g",    color: theme.palette.success.main },
                    { label: "Fat",      val: `${Math.round(result.fat / 4)}`,      unit: "g",    color: theme.palette.warning?.main || "#FFA726" },
                  ].map(({ label, val, unit, color }) => (
                    <Grid item xs={6} key={label}>
                      <Box sx={{
                        textAlign: "center", p: 1.5, borderRadius: "6px",
                        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      }}>
                        <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.3}>
                          <Typography sx={{ fontSize: "1.25rem", fontWeight: 800, color, lineHeight: 1 }}>{val}</Typography>
                          <Typography variant="caption" sx={{ color: "text.disabled" }}>{unit}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>{label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

          </Grid>

          {/* Row 3: Day plan table */}
          <Paper elevation={0} sx={{ p: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>{days}-Day Plan</Typography>
            <DaySchedule macros={result} days={days} />
          </Paper>

        </Box>
      )}
    </Box>
  )
}
