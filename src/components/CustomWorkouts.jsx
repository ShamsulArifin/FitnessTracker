import React, { useState, useEffect, useRef } from "react"
import {
  Box, Typography, Button, TextField, FormControl,
  InputLabel, Select, MenuItem, IconButton, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid, Tooltip,
  Switch, FormControlLabel, Divider, Autocomplete,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import UploadIcon from "@mui/icons-material/Upload"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import LinkIcon from "@mui/icons-material/Link"

const STORAGE_KEY = "customWorkouts"

const CATEGORIES = [
  "strength", "cardio", "stretching", "plyometrics",
  "powerlifting", "olympic_weightlifting", "strongman", "other",
]
const LEVELS = ["beginner", "intermediate", "expert"]
const EQUIPMENT_OPTIONS = [
  "body only", "dumbbell", "barbell", "cable", "machine",
  "kettlebell", "resistance band", "other",
]

const titleCase = (str) =>
  str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : ""

const emptyForm = () => ({
  id: "",
  name: "",
  category: "strength",
  equipment: "body only",
  primaryMuscles: [""],
  level: "beginner",
  // Training parameters
  sets: "3",
  reps: "10",
  amrap: false,          // As Many Reps As Possible for last set
  superset: false,       // Is this part of a superset?
  supersetWith: "",      // Name of the paired exercise
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

  const setsRepsLabel = workout.amrap
    ? `${workout.sets || "?"} sets × AMRAP`
    : `${workout.sets || "?"} × ${workout.reps || "?"}${workout.amrap ? " AMRAP" : ""}`

  return (
    <Box sx={{
      borderRadius: "6px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
      border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
      backdropFilter: "blur(8px)",
      minHeight: 160,
    }}>
      {/* Image area with overlay buttons */}
      <Box sx={{
        position: "relative", height: 100,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <FitnessCenterIcon sx={{ fontSize: 40, color: "text.disabled", opacity: 0.4 }} />

        {/* Add to plan */}
        {onAddToPlan && (
          <Tooltip title="Add to Workout Plan">
            <IconButton size="small"
              onClick={(e) => { e.stopPropagation(); onAddToPlan(workout) }}
              sx={{
                position: "absolute", top: 6, right: 6,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                width: 28, height: 28,
                "&:hover": { backgroundColor: theme.palette.primary.light },
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}>
              <AddCircleIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Edit / Delete */}
        <Box sx={{ position: "absolute", top: 6, left: 6, display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => onEdit(workout)}
            sx={{ backgroundColor: "rgba(0,0,0,0.4)", color: "#fff", width: 24, height: 24, "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" } }}>
            <EditIcon sx={{ fontSize: 13 }} />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(workout.id)}
            sx={{ backgroundColor: "rgba(0,0,0,0.4)", color: theme.palette.error.light, width: 24, height: 24, "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" } }}>
            <DeleteIcon sx={{ fontSize: 13 }} />
          </IconButton>
        </Box>

        {/* Custom badge */}
        <Chip label="Custom" size="small" sx={{
          position: "absolute", bottom: 6, left: 6, height: 18, fontSize: "0.6rem",
          backgroundColor: theme.palette.secondary.main + "aa", color: "#fff",
          "& .MuiChip-label": { px: 0.6 },
        }} />

        {/* Superset badge */}
        {workout.superset && (
          <Chip
            icon={<LinkIcon sx={{ fontSize: "0.75rem !important" }} />}
            label="Superset" size="small"
            sx={{
              position: "absolute", bottom: 6, right: 6, height: 18, fontSize: "0.6rem",
              backgroundColor: theme.palette.warning?.main + "aa" || "#FFA726aa", color: "#fff",
              "& .MuiChip-label": { px: 0.6 }, "& .MuiChip-icon": { ml: 0.5 },
            }}
          />
        )}
      </Box>

      {/* Name */}
      <Box sx={{ px: 1.5, pt: 1, pb: 0.25 }}>
        <Typography variant="body2" fontWeight={700} sx={{
          color: "text.primary", lineHeight: 1.3,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {workout.name || "Unnamed"}
        </Typography>
      </Box>

      {/* Sets × reps */}
      <Box sx={{ px: 1.5, pb: 0.5 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
          {setsRepsLabel}
        </Typography>
        {workout.superset && workout.supersetWith && (
          <Typography variant="caption" sx={{ color: "text.disabled", display: "block", fontSize: "0.62rem" }}>
            + {workout.supersetWith}
          </Typography>
        )}
      </Box>

      {/* Tags */}
      <Box sx={{
        px: 1.5, py: 0.75, mt: "auto", display: "flex", gap: 0.5, overflow: "hidden",
        borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
      }}>
        {workout.primaryMuscles?.[0] && (
          <Chip label={titleCase(workout.primaryMuscles[0])} size="small" sx={{
            height: 20, fontSize: "0.62rem",
            backgroundColor: theme.palette.primary.main + "28", color: theme.palette.primary.main,
            maxWidth: "50%", "& .MuiChip-label": { px: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
          }} />
        )}
        <Chip label={titleCase(workout.level || "beginner")} size="small" sx={{
          height: 20, fontSize: "0.62rem",
          backgroundColor: levelColor(workout.level) + "28", color: levelColor(workout.level),
          maxWidth: "50%", "& .MuiChip-label": { px: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
        }} />
      </Box>
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

  useEffect(() => { saveWorkouts(workouts) }, [workouts])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const toggle = (key) => () => setForm((f) => ({ ...f, [key]: !f[key] }))

  const openCreate = () => { setForm(emptyForm()); setEditingId(null); setIsFormOpen(true) }
  const openEdit = (w) => { setForm({ ...emptyForm(), ...w }); setEditingId(w.id); setIsFormOpen(true) }

  const saveForm = () => {
    if (!form.name.trim()) return
    const entry = {
      ...form,
      id: editingId || `custom_${Date.now()}`,
      primaryMuscles: [form.primaryMuscles[0]].filter(Boolean),
    }
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
        setWorkouts((p) => [...p, ...stamped])
        setImportError("")
      } catch { setImportError("Could not parse file. Make sure it's a valid JSON.") }
    }
    reader.readAsText(file); e.target.value = ""
  }

  // Names for superset autocomplete
  const workoutNames = workouts.filter((w) => w.id !== editingId).map((w) => w.name)

  const inputBg = theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"

  return (
    <Box>
      {/* Toolbar */}
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={3}>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={openCreate}>
          New Workout
        </Button>
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

      {/* ── Create / Edit dialog ── */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Workout" : "New Custom Workout"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>

          {/* Name */}
          <TextField label="Workout Name" size="small" fullWidth autoFocus sx={{ mb: 2 }}
            value={form.name} onChange={set("name")} />

          {/* Category / Level / Equipment / Muscle */}
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
          </Grid>

          <Divider sx={{ mb: 2 }} />

          {/* ── Training Parameters ── */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Training Parameters</Typography>

          <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
            {/* Sets */}
            <Grid item xs={6}>
              <TextField
                label="Sets" type="number" size="small" fullWidth
                value={form.sets} onChange={set("sets")}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            {/* Reps — disabled if AMRAP */}
            <Grid item xs={6}>
              <TextField
                label={form.amrap ? "Reps (AMRAP on last)" : "Reps per Set"}
                type="number" size="small" fullWidth
                value={form.reps} onChange={set("reps")}
                disabled={form.amrap}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
          </Grid>

          {/* AMRAP toggle */}
          <Box
            sx={{
              px: 2, py: 1, borderRadius: "6px", mb: 1.5,
              backgroundColor: form.amrap ? theme.palette.primary.main + "18" : inputBg,
              border: `1px solid ${form.amrap ? theme.palette.primary.main + "50" : "transparent"}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: form.amrap ? theme.palette.primary.main : "text.primary" }}>
                AMRAP
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                As Many Reps As Possible on the last set
              </Typography>
            </Box>
            <Switch checked={form.amrap} onChange={toggle("amrap")} size="small" />
          </Box>

          {/* Superset toggle */}
          <Box
            sx={{
              px: 2, py: 1, borderRadius: "6px", mb: form.superset ? 1.5 : 0,
              backgroundColor: form.superset ? (theme.palette.warning?.main || "#FFA726") + "18" : inputBg,
              border: `1px solid ${form.superset ? (theme.palette.warning?.main || "#FFA726") + "50" : "transparent"}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: form.superset ? (theme.palette.warning?.main || "#FFA726") : "text.primary" }}>
                Superset
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                Paired back-to-back with another exercise
              </Typography>
            </Box>
            <Switch checked={form.superset} onChange={toggle("superset")} size="small" />
          </Box>

          {/* Superset partner picker — only shown when superset is on */}
          {form.superset && (
            <Autocomplete
              freeSolo
              options={workoutNames}
              value={form.supersetWith}
              onInputChange={(_, v) => setForm((f) => ({ ...f, supersetWith: v }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Paired with (exercise name)"
                  size="small"
                  fullWidth
                  placeholder="Type or select another workout"
                />
              )}
            />
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
