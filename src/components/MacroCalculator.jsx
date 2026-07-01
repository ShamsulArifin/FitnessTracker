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

      {/* ── Input row — full width, all fields horizontal ── */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-start">

          {/* Sex + Age */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5, fontSize: "0.75rem" }}>Sex</Typography>
            <ToggleButtonGroup
              value={sex} exclusive size="small" fullWidth
              onChange={(_, v) => { if (v) setSex(v) }}
            >
              <ToggleButton value="male"   sx={{ textTransform: "none", fontSize: "0.75rem", py: 0.6 }}>Male</ToggleButton>
              <ToggleButton value="female" sx={{ textTransform: "none", fontSize: "0.75rem", py: 0.6 }}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={6} sm={4} md={1}>
            <TextField
              label="Age" type="number" size="small" fullWidth
              value={age} onChange={(e) => setAge(e.target.value)}
              InputProps={{ inputProps: { min: 10, max: 100 } }}
            />
          </Grid>

          {/* Weight */}
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label={wLabel} type="number" size="small" fullWidth
              value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
            />
          </Grid>

          {/* Height */}
          {isImperial ? (
            <>
              <Grid item xs={3} sm={2} md={1}>
                <TextField label="Ft" type="number" size="small" fullWidth
                  value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
              </Grid>
              <Grid item xs={3} sm={2} md={1}>
                <TextField label="In" type="number" size="small" fullWidth
                  value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
              </Grid>
            </>
          ) : (
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                label="Height (cm)" type="number" size="small" fullWidth
                value={heightInput} onChange={(e) => setHeightInput(e.target.value)}
              />
            </Grid>
          )}

          {/* Activity */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Activity</InputLabel>
              <Select value={activityLevel} label="Activity" onChange={(e) => setActivityLevel(e.target.value)}>
                {ACTIVITY_LEVELS.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>{l.label}</Typography>
                      <Typography variant="body2" sx={{ color: "text.disabled", fontSize: "0.68rem" }}>{l.desc}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Goal — inline cards */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5, fontSize: "0.75rem" }}>Goal</Typography>
            <Box display="flex" gap={1}>
              {GOALS.map((g) => (
                <Box
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  sx={{
                    flex: 1, p: "6px 4px", borderRadius: "6px", cursor: "pointer", textAlign: "center",
                    border: `2px solid ${goal === g.id ? theme.palette.primary.main : "transparent"}`,
                    backgroundColor: goal === g.id
                      ? theme.palette.primary.main + "18"
                      : theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    transition: "all 0.15s",
                    "&:hover": { borderColor: theme.palette.primary.main + "80" },
                  }}
                >
                  <Typography variant="body2" fontWeight={700} sx={{ color: goal === g.id ? theme.palette.primary.main : "text.primary", fontSize: "0.75rem" }}>
                    {g.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>

        {/* Duration slider — full width below inputs */}
        <Box sx={{ mt: 2.5, px: 0.5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>Plan Duration</Typography>
            <Chip label={`${days} day${days !== 1 ? "s" : ""}`} size="small" color="primary" variant="outlined"
              sx={{ height: 20, fontSize: "0.68rem", "& .MuiChip-label": { px: 0.8 } }} />
          </Box>
          <Slider
            value={days} onChange={(_, v) => setDays(v)}
            min={1} max={30} step={1}
            marks={[{ value: 7, label: "1 wk" }, { value: 14, label: "2 wk" }, { value: 21, label: "3 wk" }, { value: 30, label: "30d" }]}
          />
        </Box>
      </Paper>

      {/* ── Results — full width ── */}
      {!result ? (
        <Box display="flex" alignItems="center" justifyContent="center" py={6}>
          <Typography variant="body1" sx={{ color: "text.disabled" }}>
            Fill in your info above to see your macros
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2.5}>

          {/* Calorie cards + macro bars side by side */}
          <Grid container spacing={2}>
            {/* Calorie summary — 3 cards */}
            {[
              { label: "BMR",         value: result.bmr,             color: theme.palette.text.secondary, sub: "Base metabolic rate"    },
              { label: "Maintenance", value: result.maintenanceTdee, color: theme.palette.primary.main,   sub: "TDEE at current weight"  },
              { label: "Target",      value: result.tdee,            sub: GOALS.find(g => g.id === goal)?.desc,
                color: goal === "cut" ? theme.palette.error.main : goal === "maintain" ? theme.palette.primary.main : theme.palette.success.main },
            ].map(({ label, value, sub, color }) => (
              <Grid item xs={4} md={2} key={label}>
                <Paper elevation={0} sx={{ p: 1.5, textAlign: "center", backgroundColor: color + "14", border: `1px solid ${color}40`, height: "100%" }}>
                  <Typography variant="h6" fontWeight={800} sx={{ color, lineHeight: 1.1 }}>{value.toLocaleString()}</Typography>
                  <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, fontSize: "0.72rem" }}>{label}</Typography>
                  <Typography variant="body2" sx={{ color: "text.disabled", fontSize: "0.63rem" }}>kcal/day</Typography>
                </Paper>
              </Grid>
            ))}

            {/* Macro bars */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, height: "100%" }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Daily Macros</Typography>
                <MacroBar label="Protein" grams={result.protein} calories={result.protein * calPerGram.protein} color={theme.palette.primary.main} pct={result.proteinPct} />
                <MacroBar label="Carbs"   grams={result.carbs}   calories={result.carbs * calPerGram.carb}       color={theme.palette.success.main} pct={result.carbPct} />
                <MacroBar label="Fat"     grams={result.fat}     calories={result.fat * calPerGram.fat}           color={theme.palette.warning?.main || "#FFA726"} pct={result.fatPct} />
              </Paper>
            </Grid>

            {/* Per-meal */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, height: "100%" }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Per Meal (÷ 4)</Typography>
                <Grid container spacing={1}>
                  {[
                    { label: "Calories", val: `${Math.round(result.tdee / 4)} kcal`,         color: "text.primary" },
                    { label: "Protein",  val: `${Math.round(result.protein / 4)}g`,           color: theme.palette.primary.main },
                    { label: "Carbs",    val: `${Math.round(result.carbs / 4)}g`,             color: theme.palette.success.main },
                    { label: "Fat",      val: `${Math.round(result.fat / 4)}g`,               color: theme.palette.warning?.main || "#FFA726" },
                  ].map(({ label, val, color }) => (
                    <Grid item xs={6} key={label}>
                      <Box sx={{ textAlign: "center", p: 1, borderRadius: "6px", backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>
                        <Typography variant="body2" fontWeight={700} sx={{ color }}>{val}</Typography>
                        <Typography variant="body2" sx={{ color: "text.disabled", fontSize: "0.68rem" }}>{label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Deficit/surplus note */}
          {result.deficit !== 0 && (
            <Typography variant="body2" align="center" sx={{ color: result.deficit < 0 ? theme.palette.error.main : theme.palette.success.main }}>
              {result.deficit < 0 ? `${Math.abs(result.deficit)} kcal deficit/day` : `+${result.deficit} kcal surplus/day`}
              {" · "}
              <span style={{ color: theme.palette.text.secondary }}>
                ~{Math.round(Math.abs(result.deficit) * days / 7700 * 10) / 10} kg {result.deficit < 0 ? "lost" : "gained"} in {days} days
              </span>
            </Typography>
          )}

          {/* Day-by-day table — full width */}
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>{days}-Day Plan</Typography>
            <DaySchedule macros={result} days={days} />
          </Paper>

        </Box>
      )}
    </Box>
  )
}
