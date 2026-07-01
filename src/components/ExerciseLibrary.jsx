import React, { useState, useEffect, useMemo } from "react"
import {
  Box, Typography, Paper, Grid, TextField, FormControl,
  InputLabel, Select, MenuItem, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, CircularProgress,
  InputAdornment, Divider,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"

const DATASET_URL =
  "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json"

// Capitalise first letter of every word
const titleCase = (str) =>
  str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : ""

export default function ExerciseLibrary() {
  const theme = useTheme()

  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [filterBodyPart, setFilterBodyPart] = useState("")
  const [filterEquipment, setFilterEquipment] = useState("")

  const [selected, setSelected] = useState(null) // exercise detail dialog

  // Fetch on first render
  useEffect(() => {
    setLoading(true)
    fetch(DATASET_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => { setExercises(data); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [])

  // Unique filter options derived from data
  const bodyParts = useMemo(
    () => [...new Set(exercises.map((e) => e.body_part))].sort(),
    [exercises],
  )
  const equipmentList = useMemo(
    () => [...new Set(exercises.map((e) => e.equipment))].sort(),
    [exercises],
  )

  // Filtered list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return exercises.filter((ex) => {
      if (filterBodyPart && ex.body_part !== filterBodyPart) return false
      if (filterEquipment && ex.equipment !== filterEquipment) return false
      if (q && !ex.name.toLowerCase().includes(q) && !ex.target.toLowerCase().includes(q)) return false
      return true
    })
  }, [exercises, search, filterBodyPart, filterEquipment])

  const cardBg =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.04)"

  const chipColor = (type) => {
    if (type === "body weight") return theme.palette.success.main
    if (type === "dumbbell") return theme.palette.primary.main
    if (type === "barbell") return theme.palette.error.light
    if (type === "cable") return theme.palette.secondary.main
    return theme.palette.text.disabled
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Exercise Library
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: "text.secondary", mb: 3 }}>
        {exercises.length > 0 ? `${exercises.length} exercises` : ""}
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by name or muscle…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Body Part</InputLabel>
            <Select
              value={filterBodyPart}
              label="Body Part"
              onChange={(e) => setFilterBodyPart(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {bodyParts.map((bp) => (
                <MenuItem key={bp} value={bp}>{titleCase(bp)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Equipment</InputLabel>
            <Select
              value={filterEquipment}
              label="Equipment"
              onChange={(e) => setFilterEquipment(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {equipmentList.map((eq) => (
                <MenuItem key={eq} value={eq}>{titleCase(eq)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1} display="flex" alignItems="center">
          {(search || filterBodyPart || filterEquipment) && (
            <Button size="small" onClick={() => { setSearch(""); setFilterBodyPart(""); setFilterEquipment("") }}>
              Clear
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Results count */}
      {!loading && !error && exercises.length > 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Showing {filtered.length} of {exercises.length} exercises
        </Typography>
      )}

      {/* Loading / Error */}
      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" py={6} gap={2}>
          <CircularProgress />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Loading exercise library…
          </Typography>
        </Box>
      )}

      {error && (
        <Box display="flex" flexDirection="column" alignItems="center" py={6} gap={2}>
          <FitnessCenterIcon sx={{ fontSize: 48, color: "text.disabled" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Could not load the exercise library.
          </Typography>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setError(null)
              setLoading(true)
              fetch(DATASET_URL)
                .then((r) => r.json())
                .then((data) => { setExercises(data); setLoading(false) })
                .catch((e) => { setError(e.message); setLoading(false) })
            }}
          >
            Retry
          </Button>
        </Box>
      )}

      {/* Exercise grid */}
      {!loading && !error && (
        <Grid container spacing={2}>
          {filtered.slice(0, 120).map((ex) => (
            <Grid item xs={12} sm={6} md={4} key={ex.id}>
              <Paper
                elevation={2}
                onClick={() => setSelected(ex)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  backgroundColor: cardBg,
                  transition: "transform 0.15s, box-shadow 0.15s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 20px rgba(0,0,0,0.25)`,
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    color: "text.primary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {titleCase(ex.name)}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={0.5} mt="auto">
                  <Chip
                    label={titleCase(ex.body_part)}
                    size="small"
                    sx={{ backgroundColor: theme.palette.primary.main + "33", color: theme.palette.primary.main, fontWeight: 500 }}
                  />
                  <Chip
                    label={titleCase(ex.target)}
                    size="small"
                    sx={{ backgroundColor: theme.palette.secondary.main + "33", color: theme.palette.secondary.main, fontWeight: 500 }}
                  />
                  <Chip
                    label={titleCase(ex.equipment)}
                    size="small"
                    sx={{ backgroundColor: chipColor(ex.equipment) + "33", color: chipColor(ex.equipment), fontWeight: 500 }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}

          {filtered.length > 120 && (
            <Grid item xs={12}>
              <Typography variant="body2" align="center" sx={{ color: "text.disabled", py: 2 }}>
                Showing first 120 results — refine your search to see more.
              </Typography>
            </Grid>
          )}

          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" sx={{ color: "text.disabled", py: 6 }}>
                No exercises match your search.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Detail dialog */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
      >
        {selected && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              {titleCase(selected.name)}
            </DialogTitle>
            <DialogContent>
              {/* Meta chips */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                <Chip label={`Body Part: ${titleCase(selected.body_part)}`} size="small" color="primary" variant="outlined" />
                <Chip label={`Target: ${titleCase(selected.target)}`} size="small" color="secondary" variant="outlined" />
                <Chip label={`Equipment: ${titleCase(selected.equipment)}`} size="small" variant="outlined" />
                {selected.muscle_group && (
                  <Chip label={`Muscle Group: ${titleCase(selected.muscle_group)}`} size="small" variant="outlined" />
                )}
              </Box>

              {/* Secondary muscles */}
              {selected.secondary_muscles && selected.secondary_muscles.length > 0 && (
                <Box mb={2}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                    <strong>Secondary muscles:</strong>{" "}
                    {selected.secondary_muscles.map(titleCase).join(", ")}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 1.5 }} />

              {/* Instructions */}
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1, fontWeight: 700 }}>
                Instructions
              </Typography>
              {selected.instructions?.en ? (
                selected.instructions.en
                  .split(/\.\s+/)
                  .filter(Boolean)
                  .map((step, i) => (
                    <Box key={i} display="flex" gap={1.5} mb={1} alignItems="flex-start">
                      <Typography
                        variant="body2"
                        sx={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          flexShrink: 0,
                          mt: "1px",
                        }}
                      >
                        {i + 1}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {step.trim()}{step.trim().endsWith(".") ? "" : "."}
                      </Typography>
                    </Box>
                  ))
              ) : (
                <Typography variant="body2" sx={{ color: "text.disabled" }}>
                  No instructions available.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelected(null)} color="primary">Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
