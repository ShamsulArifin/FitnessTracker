import React, { useState, useEffect } from "react"
import {
  Box, Typography, Paper, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, IconButton, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, List, ListItem, ListItemText,
  ListItemSecondaryAction, Divider, Grid,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

const STORAGE_KEY = "workoutPlans"

const SPLIT_OPTIONS = [
  "Full Body",
  "Upper / Lower",
  "Push / Pull / Legs",
  "Bro Split",
  "Arnold Split",
  "Custom",
]

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const defaultPlan = () => ({
  id: Date.now(),
  name: "",
  split: "Full Body",
  days: DAY_NAMES.map((d) => ({ day: d, exercises: [] })),
  createdAt: new Date().toISOString(),
})

// ── Utility ───────────────────────────────────────────────────────────────────
const loadPlans = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") }
  catch { return [] }
}
const savePlans = (plans) => localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))

// ── Small exercise pill inside a day ─────────────────────────────────────────
function ExercisePill({ ex, onRemove }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: "4px 10px",
        borderRadius: "6px",
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        mb: 0.5,
      }}
    >
      <FitnessCenterIcon sx={{ fontSize: 14, color: "text.disabled" }} />
      <Typography variant="body2" sx={{ flexGrow: 1, color: "text.primary", fontSize: "0.8rem" }}>
        {ex.name}
      </Typography>
      {ex.sets && (
        <Chip label={`${ex.sets}×${ex.reps || "?"}`} size="small"
          sx={{ height: 18, fontSize: "0.62rem", "& .MuiChip-label": { px: 0.6 } }} />
      )}
      <IconButton size="small" onClick={onRemove} sx={{ p: 0.2 }}>
        <DeleteIcon sx={{ fontSize: 14, color: "text.disabled" }} />
      </IconButton>
    </Box>
  )
}

// ── Day card ─────────────────────────────────────────────────────────────────
function DayCard({ dayObj, onRemoveExercise, onEditExercise }) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(true)

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"}`,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={expanded ? 1 : 0}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary" }}>
            {dayObj.day}
          </Typography>
          <Chip
            label={`${dayObj.exercises.length} exercise${dayObj.exercises.length !== 1 ? "s" : ""}`}
            size="small"
            sx={{ height: 18, fontSize: "0.62rem", "& .MuiChip-label": { px: 0.6 } }}
          />
        </Box>
        <IconButton size="small" onClick={() => setExpanded((e) => !e)} sx={{ p: 0.3 }}>
          {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>

      {expanded && (
        <Box>
          {dayObj.exercises.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.disabled", fontSize: "0.75rem", fontStyle: "italic", pl: 0.5 }}>
              No exercises — add from the Workouts tab
            </Typography>
          ) : (
            dayObj.exercises.map((ex, i) => (
              <ExercisePill
                key={i}
                ex={ex}
                onRemove={() => onRemoveExercise(dayObj.day, i)}
              />
            ))
          )}
        </Box>
      )}
    </Paper>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorkoutPlanner({ pendingExercise, onPendingConsumed }) {
  const theme = useTheme()

  const [plans, setPlans] = useState(loadPlans)
  const [activePlanId, setActivePlanId] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null) // plan being edited
  const [draft, setDraft] = useState(defaultPlan())

  // Dialog: pick which plan + day to add a pending exercise to
  const [addExOpen, setAddExOpen] = useState(false)
  const [addExTarget, setAddExTarget] = useState({ planId: null, day: "" })

  // Sets/reps edit dialog
  const [setsDialog, setSetsDialog] = useState(null) // { planId, day, exIndex }
  const [setsValue, setSetsValue] = useState("3")
  const [repsValue, setRepsValue] = useState("10")

  // Persist
  useEffect(() => { savePlans(plans) }, [plans])

  // When a pending exercise arrives from the Workouts tab
  useEffect(() => {
    if (pendingExercise) {
      setAddExOpen(true)
      // Pre-select first available plan if any
      if (plans.length > 0) {
        setAddExTarget({ planId: plans[0].id, day: plans[0].days[0].day })
      } else {
        setAddExTarget({ planId: null, day: "" })
      }
    }
  }, [pendingExercise])

  const activePlan = plans.find((p) => p.id === activePlanId) || null

  // ── CRUD helpers ──────────────────────────────────────────────────────────
  const createPlan = () => {
    if (!draft.name.trim()) return
    const newPlan = { ...draft, id: Date.now(), createdAt: new Date().toISOString() }
    const updated = [...plans, newPlan]
    setPlans(updated)
    setActivePlanId(newPlan.id)
    setIsCreateOpen(false)
    setDraft(defaultPlan())
  }

  const deletePlan = (id) => {
    const updated = plans.filter((p) => p.id !== id)
    setPlans(updated)
    if (activePlanId === id) setActivePlanId(updated.length > 0 ? updated[0].id : null)
  }

  const removeExercise = (planId, day, exIndex) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id !== planId ? p : {
          ...p,
          days: p.days.map((d) =>
            d.day !== day ? d : { ...d, exercises: d.exercises.filter((_, i) => i !== exIndex) }
          ),
        }
      )
    )
  }

  // Confirm adding pending exercise to the selected plan+day
  const confirmAddExercise = () => {
    if (!pendingExercise || !addExTarget.planId || !addExTarget.day) return
    const entry = {
      name: pendingExercise.name,
      id: pendingExercise.id,
      category: pendingExercise.category || pendingExercise.primaryMuscles?.[0] || "",
      sets: "3",
      reps: "10",
    }
    setPlans((prev) =>
      prev.map((p) =>
        p.id !== addExTarget.planId ? p : {
          ...p,
          days: p.days.map((d) =>
            d.day !== addExTarget.day ? d : { ...d, exercises: [...d.exercises, entry] }
          ),
        }
      )
    )
    // Make that plan active so user sees the result
    setActivePlanId(addExTarget.planId)
    setAddExOpen(false)
    onPendingConsumed()
  }

  // Sets/reps update
  const openSetsDialog = (planId, day, exIndex, ex) => {
    setSetsDialog({ planId, day, exIndex })
    setSetsValue(ex.sets || "3")
    setRepsValue(ex.reps || "10")
  }

  const saveSetsReps = () => {
    if (!setsDialog) return
    setPlans((prev) =>
      prev.map((p) =>
        p.id !== setsDialog.planId ? p : {
          ...p,
          days: p.days.map((d) =>
            d.day !== setsDialog.day ? d : {
              ...d,
              exercises: d.exercises.map((ex, i) =>
                i !== setsDialog.exIndex ? ex : { ...ex, sets: setsValue, reps: repsValue }
              ),
            }
          ),
        }
      )
    )
    setSetsDialog(null)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Workout Plans
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: "text.secondary", mb: 3 }}>
        Build your training split, assign exercises to each day
      </Typography>

      {/* ── Plan selector bar ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        {plans.map((p) => (
          <Box key={p.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Chip
              label={p.name}
              onClick={() => setActivePlanId(p.id)}
              onDelete={() => deletePlan(p.id)}
              variant={activePlanId === p.id ? "filled" : "outlined"}
              color={activePlanId === p.id ? "primary" : "default"}
            />
          </Box>
        ))}
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => { setDraft(defaultPlan()); setIsCreateOpen(true) }}
        >
          New Plan
        </Button>
      </Box>

      {/* ── Active plan detail ── */}
      {!activePlan ? (
        <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
          <FitnessCenterIcon sx={{ fontSize: 56, color: "text.disabled" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No plan selected. Create one to get started.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setDraft(defaultPlan()); setIsCreateOpen(true) }}
          >
            Create Plan
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Plan header */}
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box flexGrow={1}>
              <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 700 }}>
                {activePlan.name}
              </Typography>
              <Chip label={activePlan.split} size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
            </Box>
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              {activePlan.days.reduce((sum, d) => sum + d.exercises.length, 0)} total exercises
            </Typography>
          </Box>

          {/* Days grid */}
          <Grid container spacing={2}>
            {activePlan.days.map((dayObj) => (
              <Grid item xs={12} sm={6} md={4} key={dayObj.day}>
                <DayCard
                  dayObj={dayObj}
                  onRemoveExercise={(day, i) => removeExercise(activePlan.id, day, i)}
                  onEditExercise={(day, i) =>
                    openSetsDialog(activePlan.id, day, i, activePlan.days.find((d) => d.day === day).exercises[i])
                  }
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" sx={{ color: "text.disabled", mt: 3, textAlign: "center" }}>
            Switch to the <strong>Workouts</strong> tab, find an exercise and tap <strong>+ Add to Plan</strong>
          </Typography>
        </Box>
      )}

      {/* ── Create plan dialog ── */}
      <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>New Workout Plan</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Plan Name"
            fullWidth
            size="small"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="e.g. Summer Cut, Bulk Phase 1…"
            autoFocus
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Training Split</InputLabel>
            <Select
              value={draft.split}
              label="Training Split"
              onChange={(e) => setDraft((d) => ({ ...d, split: e.target.value }))}
            >
              {SPLIT_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            All 7 days are included. You can assign exercises to any day.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={createPlan} variant="contained" disabled={!draft.name.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Add exercise to plan/day dialog ── */}
      <Dialog open={addExOpen} onClose={() => { setAddExOpen(false); onPendingConsumed() }} maxWidth="xs" fullWidth>
        <DialogTitle>Add to Workout Plan</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          {pendingExercise && (
            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: theme.palette.primary.main + "18", borderRadius: "6px" }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: "text.primary" }}>
                {pendingExercise.name}
              </Typography>
              {pendingExercise.primaryMuscles?.[0] && (
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                  {pendingExercise.primaryMuscles[0]}
                </Typography>
              )}
            </Paper>
          )}

          {plans.length === 0 ? (
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                You don't have any plans yet. Create one first.
              </Typography>
              <Button
                variant="contained" size="small" startIcon={<AddIcon />}
                onClick={() => { setAddExOpen(false); onPendingConsumed(); setDraft(defaultPlan()); setIsCreateOpen(true) }}
              >
                Create Plan
              </Button>
            </Box>
          ) : (
            <>
              <FormControl size="small" fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select
                  value={addExTarget.planId || ""}
                  label="Plan"
                  onChange={(e) => {
                    const p = plans.find((pl) => pl.id === e.target.value)
                    setAddExTarget({ planId: e.target.value, day: p ? p.days[0].day : "" })
                  }}
                >
                  {plans.map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel>Day</InputLabel>
                <Select
                  value={addExTarget.day}
                  label="Day"
                  onChange={(e) => setAddExTarget((t) => ({ ...t, day: e.target.value }))}
                >
                  {(plans.find((p) => p.id === addExTarget.planId)?.days || []).map((d) => (
                    <MenuItem key={d.day} value={d.day}>
                      {d.day}
                      {d.exercises.length > 0 && (
                        <Typography component="span" variant="body2" sx={{ color: "text.disabled", ml: 1, fontSize: "0.75rem" }}>
                          ({d.exercises.length})
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddExOpen(false); onPendingConsumed() }} color="secondary">Cancel</Button>
          {plans.length > 0 && (
            <Button
              onClick={confirmAddExercise}
              variant="contained"
              disabled={!addExTarget.planId || !addExTarget.day}
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* ── Sets/reps editor ── */}
      <Dialog open={Boolean(setsDialog)} onClose={() => setSetsDialog(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Sets & Reps</DialogTitle>
        <DialogContent sx={{ display: "flex", gap: 2, pt: 2 }}>
          <TextField
            label="Sets" size="small" type="number"
            value={setsValue} onChange={(e) => setSetsValue(e.target.value)}
            sx={{ width: "50%" }}
          />
          <TextField
            label="Reps" size="small" type="number"
            value={repsValue} onChange={(e) => setRepsValue(e.target.value)}
            sx={{ width: "50%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSetsDialog(null)} color="secondary">Cancel</Button>
          <Button onClick={saveSetsReps} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
