import React, { useState, useEffect, useRef } from "react"
import {
  Box, Typography, Button, TextField, FormControl,
  InputLabel, Select, MenuItem, IconButton, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid, Tooltip,
  Switch, Divider, Autocomplete, ToggleButton, ToggleButtonGroup,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import UploadIcon from "@mui/icons-material/Upload"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import LinkIcon from "@mui/icons-material/Link"

const STORAGE_KEY = "customWorkouts"
const DATASET_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"

const CATEGORIES = [
  "strength", "cardio", "stretching", "plyometrics",
  "powerlifting", "olympic_weightlifting", "strongman", "other",
]
const LEVELS = ["beginner", "intermediate", "expert"]
const EQUIPMENT_OPTIONS = [
  "body only", "dumbbell", "barbell", "cable", "machine",
  "kettlebell", "resistance band", "other",
]

// ── Cardio ────────────────────────────────────────────────────────────────────
const CARDIO_ACTIVITIES = [
  "Running", "Walking", "Cycling", "Rowing", "Swimming",
  "Jump Rope", "Hiking", "Stair Climbing", "Sprints", "Other",
]
const CARDIO_MACHINES = [
  "Treadmill", "Stationary Bike", "Elliptical", "Rowing Machine",
  "Stair Climber", "Ski Erg", "Assault Bike", "Other",
]
const DISTANCE_UNITS = ["km", "miles", "m"]
const SPEED_UNITS = ["km/h", "mph", "pace (min/km)", "pace (min/mi)"]

const titleCase = (str) =>
  str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : ""

const emptyForm = () => ({
  id: "",
  name: "",
  category: "strength",
  equipment: "body only",
  primaryMuscles: [""],
  level: "beginner",
  // Strength / default training params
  sets: "3",
  reps: "10",
  amrap: false,
  superset: false,
  supersetWith: "",
  // Cardio params
  cardioType: "none",        // "none" | "activity" | "machine"
  cardioActivity: "Running",
  cardioMachine: "Treadmill",
  distance: "",
  distanceUnit: "km",
  duration: "",              // minutes
  speed: "",
  speedUnit: "km/h",
  incline: "",
  resistance: "",
})

const loadWorkouts = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") }
  catch { return [] }
}
const saveWorkouts = (w) => localStorage.setItem(STORAGE_KEY, JSON.stringify(w))

// ── Card ──────────────────────────────────────────────────────────────────────
function CustomCard({ workout, onEdit, onDelete, onAddToPlan }) {
  const theme = useTheme()

  const levelColor = (l) => {
    if (l === "beginner") return theme.palette.success.main
    if (l === "intermediate") return theme.palette.warning?.main || "#FFA726"
    return theme.palette.error.main
  }

  const isCardio = workout.category === "cardio" && workout.cardioType !== "none"

  const trainingLabel = (() => {
    if (!isCardio) {
      return workout.amrap ? `${workout.sets || "?"}s × AMRAP` : `${workout.sets || "?"}×${workout.reps || "?"}`
    }
    if (workout.cardioType === "machine") {
      const parts = []
      if (workout.duration) parts.push(`${workout.duration} min`)
      if (workout.resistance) parts.push(`R${workout.resistance}`)
      if (workout.incline) parts.push(`${workout.incline}% incline`)
      return `${workout.cardioMachine || "Machine"}${parts.length ? ` · ${parts.join(" · ")}` : ""}`
    }
    const parts = []
    if (workout.distance) parts.push(`${workout.distance} ${workout.distanceUnit || "km"}`)
    if (workout.duration) parts.push(`${workout.duration} min`)
    if (workout.speed) parts.push(`${workout.speed} ${workout.speedUnit || "km/h"}`)
    return `${workout.cardioActivity || "Cardio"}${parts.length ? ` · ${parts.join(" · ")}` : ""}`
  })()

  return (
    <Box sx={{
      borderRadius: "6px", overflow: "hidden", display: "flex", flexDirection: "column",
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
      border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
      backdropFilter: "blur(8px)", minHeight: 160,
    }}>
      <Box sx={{
        position: "relative", height: 100, flexShrink: 0,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isCardio
          ? <DirectionsRunIcon sx={{ fontSize: 40, color: "text.disabled", opacity: 0.4 }} />
          : <FitnessCenterIcon sx={{ fontSize: 40, color: "text.disabled", opacity: 0.4 }} />
        }
        {onAddToPlan && (
          <Tooltip title="Add to Workout Plan">
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onAddToPlan(workout) }}
              sx={{ position: "absolute", top: 6, right: 6, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, width: 28, height: 28, "&:hover": { backgroundColor: theme.palette.primary.light }, boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              <AddCircleIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ position: "absolute", top: 6, left: 6, display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => onEdit(workout)}
            sx={{ backgroundColor: "rgba(0,0,0,0.4)", color: "#fff", width: 24, height: 24 }}>
            <EditIcon sx={{ fontSize: 13 }} />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(workout.id)}
            sx={{ backgroundColor: "rgba(0,0,0,0.4)", color: theme.palette.error.light, width: 24, height: 24 }}>
            <DeleteIcon sx={{ fontSize: 13 }} />
          </IconButton>
        </Box>
        <Chip label="Custom" size="small" sx={{ position: "absolute", bottom: 6, left: 6, height: 18, fontSize: "0.6rem", backgroundColor: theme.palette.secondary.main + "aa", color: "#fff", "& .MuiChip-label": { px: 0.6 } }} />
        {workout.superset && <Chip icon={<LinkIcon sx={{ fontSize: "0.75rem !important" }} />} label="Superset" size="small"
          sx={{ position: "absolute", bottom: 6, right: 6, height: 18, fontSize: "0.6rem", backgroundColor: (theme.palette.warning?.main || "#FFA726") + "aa", color: "#fff", "& .MuiChip-label": { px: 0.6 }, "& .MuiChip-icon": { ml: 0.5 } }} />}
      </Box>

      <Box sx={{ px: 1.5, pt: 1, pb: 0.25 }}>
        <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {workout.name || "Unnamed"}
        </Typography>
      </Box>
      <Box sx={{ px: 1.5, pb: 0.5 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
          {trainingLabel}
        </Typography>
        {!isCardio && workout.superset && workout.supersetWith && (
          <Typography variant="caption" sx={{ color: "text.disabled", display: "block", fontSize: "0.62rem" }}>
            + {workout.supersetWith}
          </Typography>
        )}
      </Box>
      <Box sx={{ px: 1.5, py: 0.75, mt: "auto", display: "flex", gap: 0.5, overflow: "hidden", borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}` }}>
        {workout.primaryMuscles?.[0] && (
          <Chip label={titleCase(workout.primaryMuscles[0])} size="small" sx={{ height: 20, fontSize: "0.62rem", backgroundColor: theme.palette.primary.main + "28", color: theme.palette.primary.main, maxWidth: "50%", "& .MuiChip-label": { px: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }} />
        )}
        <Chip label={titleCase(workout.level || "beginner")} size="small" sx={{ height: 20, fontSize: "0.62rem", backgroundColor: levelColor(workout.level) + "28", color: levelColor(workout.level), maxWidth: "50%", "& .MuiChip-label": { px: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }} />
      </Box>
    </Box>
  )
}

// ── Toggle row helper ─────────────────────────────────────────────────────────
function ToggleRow({ label, desc, checked, onToggle, color }) {
  const theme = useTheme()
  const activeColor = color || theme.palette.primary.main
  const bg = theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
  return (
    <Box sx={{ px: 2, py: 1, borderRadius: "6px", backgroundColor: checked ? activeColor + "18" : bg, border: `1px solid ${checked ? activeColor + "50" : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="body2" fontWeight={600} sx={{ color: checked ? activeColor : "text.primary" }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>{desc}</Typography>
      </Box>
      <Switch checked={checked} onChange={onToggle} size="small" />
    </Box>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CustomWorkouts({ onAddToPlan }) {
  const theme = useTheme()
  const [workouts, setWorkouts] = useState(loadWorkouts)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(emptyForm())
  const [editingId, setEditingId] = useState(null)
  const [importError, setImportError] = useState("")
  const importRef = useRef(null)
  const [libraryNames, setLibraryNames] = useState([])

  useEffect(() => {
    fetch(DATASET_URL)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setLibraryNames(data.map((e) => e.name)))
      .catch(() => {})
  }, [])

  useEffect(() => { saveWorkouts(workouts) }, [workouts])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const toggle = (key) => () => setForm((f) => ({ ...f, [key]: !f[key] }))

  const openCreate = () => { setForm(emptyForm()); setEditingId(null); setIsFormOpen(true) }
  const openEdit = (w) => { setForm({ ...emptyForm(), ...w }); setEditingId(w.id); setIsFormOpen(true) }

  const saveForm = () => {
    if (!form.name.trim()) return
    const entry = { ...form, id: editingId || `custom_${Date.now()}`, primaryMuscles: [form.primaryMuscles[0]].filter(Boolean) }
    setWorkouts((p) => editingId ? p.map((w) => (w.id === editingId ? entry : w)) : [...p, entry])
    setIsFormOpen(false)
  }

  const deleteWorkout = (id) => setWorkouts((p) => p.filter((w) => w.id !== id))

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(workouts, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "custom_workouts.json"; a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        const incoming = Array.isArray(parsed) ? parsed : [parsed]
        if (!incoming.every((w) => w.name)) { setImportError("Invalid format — each workout must have a name."); return }
        const stamped = incoming.map((w) => ({ ...emptyForm(), ...w, id: `custom_${Date.now()}_${Math.random()}` }))
        setWorkouts((p) => [...p, ...stamped]); setImportError("")
      } catch { setImportError("Could not parse file. Make sure it's a valid JSON.") }
    }
    reader.readAsText(file); e.target.value = ""
  }

  const supersetOptions = [
    ...workouts.filter((w) => w.id !== editingId).map((w) => ({ label: w.name, group: "My Custom Workouts" })),
    ...libraryNames.map((name) => ({ label: name, group: "Exercise Library" })),
  ]

  const isCardio = form.category === "cardio"
  const inputBg = theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"

  return (
    <Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={3}>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={openCreate}>New Workout</Button>
        <Box sx={{ flexGrow: 1 }} />
        {workouts.length > 0 && (
          <Tooltip title="Export all custom workouts">
            <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={exportAll}>Export</Button>
          </Tooltip>
        )}
        <Tooltip title="Import custom workouts from JSON">
          <Button size="small" variant="outlined" startIcon={<UploadIcon />} onClick={() => importRef.current?.click()}>Import</Button>
        </Tooltip>
        <input type="file" accept=".json" ref={importRef} style={{ display: "none" }} onChange={handleImport} />
      </Box>

      {importError && <Typography variant="body2" sx={{ color: "error.main", mb: 2 }}>{importError}</Typography>}

      {workouts.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
          <FitnessCenterIcon sx={{ fontSize: 56, color: "text.disabled" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>No custom workouts yet.</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>Create Your First Workout</Button>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2 }}>
          {workouts.map((w) => (
            <CustomCard key={w.id} workout={w} onEdit={openEdit} onDelete={deleteWorkout} onAddToPlan={onAddToPlan} />
          ))}
        </Box>
      )}

      {/* ── Dialog ── */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Workout" : "New Custom Workout"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>

          {/* Name */}
          <TextField label="Workout Name" size="small" fullWidth autoFocus sx={{ mb: 2 }}
            value={form.name} onChange={set("name")} />

          {/* Category / Level */}
          <Grid container spacing={1.5} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={form.category} label="Category" onChange={set("category")}>
                  {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{titleCase(c.replace(/_/g, " "))}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Level</InputLabel>
                <Select value={form.level} label="Level" onChange={set("level")}>
                  {LEVELS.map((l) => <MenuItem key={l} value={l}>{titleCase(l)}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            {!isCardio && (
              <>
                <Grid item xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Equipment</InputLabel>
                    <Select value={form.equipment} label="Equipment" onChange={set("equipment")}>
                      {EQUIPMENT_OPTIONS.map((eq) => <MenuItem key={eq} value={eq}>{titleCase(eq)}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Primary Muscle" size="small" fullWidth
                    value={form.primaryMuscles[0] || ""}
                    onChange={(e) => setForm((f) => ({ ...f, primaryMuscles: [e.target.value] }))}
                    placeholder="e.g. biceps" />
                </Grid>
              </>
            )}
          </Grid>

          <Divider sx={{ mb: 2 }} />

          {/* ── CARDIO BRANCH ── */}
          {isCardio ? (
            <>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Cardio Type</Typography>

              {/* Type selector */}
              <ToggleButtonGroup
                value={form.cardioType} exclusive size="small" fullWidth sx={{ mb: 2 }}
                onChange={(_, v) => { if (v) setForm((f) => ({ ...f, cardioType: v })) }}
              >
                <ToggleButton value="none" sx={{ textTransform: "none", fontSize: "0.75rem", flex: 1 }}>Custom (sets/reps)</ToggleButton>
                <ToggleButton value="activity" sx={{ textTransform: "none", fontSize: "0.75rem", flex: 1 }}>Activity</ToggleButton>
                <ToggleButton value="machine" sx={{ textTransform: "none", fontSize: "0.75rem", flex: 1 }}>Machine</ToggleButton>
              </ToggleButtonGroup>

              {/* ── Activity ── */}
              {form.cardioType === "activity" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Activity</InputLabel>
                    <Select value={form.cardioActivity} label="Activity" onChange={set("cardioActivity")}>
                      {CARDIO_ACTIVITIES.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <TextField label="Distance" type="number" size="small" fullWidth
                        value={form.distance} onChange={set("distance")} placeholder="e.g. 5" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Unit</InputLabel>
                        <Select value={form.distanceUnit} label="Unit" onChange={set("distanceUnit")}>
                          {DISTANCE_UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Duration (min)" type="number" size="small" fullWidth
                        value={form.duration} onChange={set("duration")} placeholder="e.g. 30" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Speed" type="number" size="small" fullWidth
                        value={form.speed} onChange={set("speed")} placeholder="e.g. 10" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Speed Unit</InputLabel>
                        <Select value={form.speedUnit} label="Speed Unit" onChange={set("speedUnit")}>
                          {SPEED_UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* ── Machine ── */}
              {form.cardioType === "machine" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Machine</InputLabel>
                    <Select value={form.cardioMachine} label="Machine" onChange={set("cardioMachine")}>
                      {CARDIO_MACHINES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <TextField label="Duration (min)" type="number" size="small" fullWidth
                        value={form.duration} onChange={set("duration")} placeholder="e.g. 20" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Resistance Level" type="number" size="small" fullWidth
                        value={form.resistance} onChange={set("resistance")} placeholder="e.g. 8" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Incline (%)" type="number" size="small" fullWidth
                        value={form.incline} onChange={set("incline")} placeholder="e.g. 5" />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Speed" type="number" size="small" fullWidth
                        value={form.speed} onChange={set("speed")} placeholder="e.g. 8" />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Cardio type=none falls through to sets/reps below */}
              {form.cardioType === "none" && (
                <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mb: 1 }}>
                  Using custom sets / reps for this cardio exercise.
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Training Parameters</Typography>
          )}

          {/* ── Sets/Reps/AMRAP/Superset — shown for strength OR cardio-none ── */}
          {(!isCardio || form.cardioType === "none") && (
            <>
              <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                <Grid item xs={6}>
                  <TextField label="Sets" type="number" size="small" fullWidth
                    value={form.sets} onChange={set("sets")} InputProps={{ inputProps: { min: 1 } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label={form.amrap ? "Reps (AMRAP on last)" : "Reps per Set"}
                    type="number" size="small" fullWidth disabled={form.amrap}
                    value={form.reps} onChange={set("reps")} InputProps={{ inputProps: { min: 1 } }} />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <ToggleRow
                  label="AMRAP"
                  desc="As Many Reps As Possible on the last set"
                  checked={form.amrap}
                  onToggle={toggle("amrap")}
                />
                <ToggleRow
                  label="Superset"
                  desc="Pair back-to-back with another exercise"
                  checked={form.superset}
                  onToggle={toggle("superset")}
                  color={theme.palette.warning?.main || "#FFA726"}
                />
              </Box>

              {form.superset && (
                <Box sx={{ mt: 1.5 }}>
                  <Autocomplete
                    freeSolo
                    options={supersetOptions}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => typeof option === "string" ? option : option.label}
                    value={form.supersetWith}
                    onChange={(_, v) => setForm((f) => ({ ...f, supersetWith: typeof v === "string" ? v : v?.label || "" }))}
                    onInputChange={(_, v, reason) => { if (reason === "input") setForm((f) => ({ ...f, supersetWith: v })) }}
                    filterOptions={(opts, { inputValue }) => {
                      const q = inputValue.toLowerCase()
                      return q.length < 1 ? opts.slice(0, 40) : opts.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 60)
                    }}
                    renderOption={(props, option) => (
                      <li {...props} key={`${option.group}-${option.label}`}>
                        <Typography variant="body2">{option.label}</Typography>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Paired with" size="small" fullWidth
                        placeholder="Search custom workouts or exercise library…"
                        helperText={libraryNames.length === 0 ? "Loading exercise library…" : `${supersetOptions.length} exercises available`}
                      />
                    )}
                  />
                </Box>
              )}
            </>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={saveForm} variant="contained" disabled={!form.name.trim()}>
            {editingId ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
