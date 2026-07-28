import React, { useState, useEffect, useRef } from "react"
import {
  Box, Typography, Paper, Button, TextField, FormControl,
  InputLabel, Select, MenuItem, IconButton, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid, Tooltip,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import UploadIcon from "@mui/icons-material/Upload"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"

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
  instructions: [""],
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

  return (
    <Box
      sx={{
        borderRadius: "6px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        backdropFilter: "blur(8px)",
        minHeight: 160,
      }}
    >
      {/* Top: icon placeholder + overlay add button */}
      <Box
        sx={{
          position: "relative",
          height: 100,
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: 40, color: "text.disabled", opacity: 0.4 }} />

        {/* Add to plan */}
        {onAddToPlan && (
          <Tooltip title="Add to Workout Plan">
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onAddToPlan(workout) }}
              sx={{
                position: "absolute", top: 6, right: 6,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                width: 28, height: 28,
                "&:hover": { backgroundColor: theme.palette.primary.light },
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
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
          position: "absolute", bottom: 6, left: 6,
          height: 18, fontSize: "0.6rem", backgroundColor: theme.palette.secondary.main + "aa", color: "#fff",
          "& .MuiChip-label": { px: 0.6 },
        }} />
      </Box>

      {/* Name */}
      <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
        <Typography variant="body2" fontWeight={700} sx={{
          color: "text.primary", lineHeight: 1.3,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {workout.name || "Unnamed"}
        </Typography>
      </Box>

      {/* Tags */}
      <Box sx={{
        px: 1.5, py: 1, mt: "auto", display: "flex", gap: 0.5, overflow: "hidden",
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

  const openCreate = () => {
    setForm(emptyForm())
    setEditingId(null)
    setIsFormOpen(true)
  }

  const openEdit = (w) => {
    setForm({ ...w })
    setEditingId(w.id)
    setIsFormOpen(true)
  }

  const saveForm = () => {
    if (!form.name.trim()) return
    const entry = {
      ...form,
      id: editingId || `custom_${Date.now()}`,
      primaryMuscles: form.primaryMuscles.filter((m) => m.trim()),
      instructions: form.instructions.filter((s) => s.trim()),
    }
    if (editingId) {
      setWorkouts((p) => p.map((w) => (w.id === editingId ? entry : w)))
    } else {
      setWorkouts((p) => [...p, entry])
    }
    setIsFormOpen(false)
  }

  const deleteWorkout = (id) => setWorkouts((p) => p.filter((w) => w.id !== id))

  // Export
  const exportAll = () => {
    const blob = new Blob([JSON.stringify(workouts, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "custom_workouts.json"; a.click()
    URL.revokeObjectURL(url)
  }

  // Import
  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        const incoming = Array.isArray(parsed) ? parsed : [parsed]
        if (!incoming.every((w) => w.name)) {
          setImportError("Invalid format — each workout must have a name.")
          return
        }
        const stamped = incoming.map((w) => ({ ...w, id: `custom_${Date.now()}_${Math.random()}` }))
        setWorkouts((p) => [...p, ...stamped])
        setImportError("")
      } catch {
        setImportError("Could not parse file. Make sure it's a valid JSON.")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

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
            <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={exportAll}>
              Export
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Import custom workouts from JSON">
          <Button size="small" variant="outlined" startIcon={<UploadIcon />} onClick={() => importRef.current?.click()}>
            Import
          </Button>
        </Tooltip>
        <input type="file" accept=".json" ref={importRef} style={{ display: "none" }} onChange={handleImport} />
      </Box>

      {importError && (
        <Typography variant="body2" sx={{ color: "error.main", mb: 2 }}>{importError}</Typography>
      )}

      {workouts.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
          <FitnessCenterIcon sx={{ fontSize: 56, color: "text.disabled" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No custom workouts yet.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Create Your First Workout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2 }}>
          {workouts.map((w) => (
            <CustomCard key={w.id} workout={w} onEdit={openEdit} onDelete={deleteWorkout} onAddToPlan={onAddToPlan} />
          ))}
        </Box>
      )}

      {/* Create / Edit dialog */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Workout" : "New Custom Workout"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>

          <TextField
            label="Workout Name" size="small" fullWidth autoFocus
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={form.category} label="Category" onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{titleCase(c.replace("_", " "))}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Level</InputLabel>
                <Select value={form.level} label="Level" onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
                  {LEVELS.map((l) => <MenuItem key={l} value={l}>{titleCase(l)}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Equipment</InputLabel>
                <Select value={form.equipment} label="Equipment" onChange={(e) => setForm((f) => ({ ...f, equipment: e.target.value }))}>
                  {EQUIPMENT_OPTIONS.map((eq) => <MenuItem key={eq} value={eq}>{titleCase(eq)}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Primary Muscle" size="small" fullWidth
                value={form.primaryMuscles[0] || ""}
                onChange={(e) => setForm((f) => ({ ...f, primaryMuscles: [e.target.value] }))}
                placeholder="e.g. biceps"
              />
            </Grid>
          </Grid>

          {/* Instructions */}
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>Instructions</Typography>
            {form.instructions.map((step, i) => (
              <Box key={i} display="flex" gap={1} mb={1} alignItems="flex-start">
                <Typography variant="body2" sx={{
                  minWidth: 22, height: 22, borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.65rem", flexShrink: 0, mt: "5px",
                }}>
                  {i + 1}
                </Typography>
                <TextField
                  size="small" fullWidth multiline
                  value={step}
                  onChange={(e) => {
                    const updated = [...form.instructions]
                    updated[i] = e.target.value
                    setForm((f) => ({ ...f, instructions: updated }))
                  }}
                  placeholder={`Step ${i + 1}`}
                />
                <IconButton size="small" onClick={() => setForm((f) => ({ ...f, instructions: f.instructions.filter((_, idx) => idx !== i) }))}
                  disabled={form.instructions.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Button size="small" startIcon={<AddIcon />}
              onClick={() => setForm((f) => ({ ...f, instructions: [...f.instructions, ""] }))}>
              Add Step
            </Button>
          </Box>

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
