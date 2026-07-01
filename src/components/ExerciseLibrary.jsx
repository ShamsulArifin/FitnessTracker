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

// Build the GIF URL from media_id
const gifUrl = (media_id) =>
  media_id ? `https://static.exercisedb.dev/media/${media_id}.gif` : null

const titleCase = (str) =>
  str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : ""

// Card thumbnail — shows GIF if available, falls back to a placeholder box
function ExerciseThumbnail({ media_id, name }) {
  const theme = useTheme()
  const [failed, setFailed] = useState(false)
  const url = gifUrl(media_id)

  if (!url || failed) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : "rgba(0,0,0,0.05)",
          borderRadius: "6px 6px 0 0",
          flexShrink: 0,
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: 40, color: "text.disabled" }} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: 140,
        overflow: "hidden",
        borderRadius: "6px 6px 0 0",
        flexShrink: 0,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={url}
        alt={name}
        onError={() => setFailed(true)}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  )
}

// Detail dialog GIF — larger, centered
function ExerciseGif({ media_id, name }) {
  const theme = useTheme()
  const [failed, setFailed] = useState(false)
  const url = gifUrl(media_id)

  if (!url || failed) return null

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 2,
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)",
        maxHeight: 300,
      }}
    >
      <img
        src={url}
        alt={name}
        onError={() => setFailed(true)}
        style={{ maxHeight: 300, width: "auto", maxWidth: "100%", objectFit: "contain" }}
      />
    </Box>
  )
}

export default function ExerciseLibrary() {
  const theme = useTheme()

  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [filterBodyPart, setFilterBodyPart] = useState("")
  const [filterEquipment, setFilterEquipment] = useState("")

  const [selected, setSelected] = useState(null)

  const doFetch = () => {
    setLoading(true)
    setError(null)
    fetch(DATASET_URL)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((data) => { setExercises(data); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }

  useEffect(() => { doFetch() }, [])

  const bodyParts = useMemo(
    () => [...new Set(exercises.map((e) => e.body_part))].sort(),
    [exercises],
  )
  const equipmentList = useMemo(
    () => [...new Set(exercises.map((e) => e.equipment))].sort(),
    [exercises],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return exercises.filter((ex) => {
      if (filterBodyPart && ex.body_part !== filterBodyPart) return false
      if (filterEquipment && ex.equipment !== filterEquipment) return false
      if (q && !ex.name.toLowerCase().includes(q) && !ex.target.toLowerCase().includes(q)) return false
      return true
    })
  }, [exercises, search, filterBodyPart, filterEquipment])

  const hasActiveFilter = search || filterBodyPart || filterEquipment

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

      {/* ── Filters ── */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        {/* Search — takes most space */}
        <TextField
          size="small"
          placeholder="Search by name or target muscle…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{ flex: "1 1 260px", minWidth: 220 }}
        />

        {/* Body Part */}
        <FormControl size="small" sx={{ flex: "1 1 180px", minWidth: 160 }}>
          <InputLabel>Body Part</InputLabel>
          <Select
            value={filterBodyPart}
            label="Body Part"
            onChange={(e) => setFilterBodyPart(e.target.value)}
          >
            <MenuItem value="">All Body Parts</MenuItem>
            {bodyParts.map((bp) => (
              <MenuItem key={bp} value={bp}>{titleCase(bp)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Equipment */}
        <FormControl size="small" sx={{ flex: "1 1 180px", minWidth: 160 }}>
          <InputLabel>Equipment</InputLabel>
          <Select
            value={filterEquipment}
            label="Equipment"
            onChange={(e) => setFilterEquipment(e.target.value)}
          >
            <MenuItem value="">All Equipment</MenuItem>
            {equipmentList.map((eq) => (
              <MenuItem key={eq} value={eq}>{titleCase(eq)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear */}
        {hasActiveFilter && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => { setSearch(""); setFilterBodyPart(""); setFilterEquipment("") }}
            sx={{ flexShrink: 0 }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      {/* Results count */}
      {!loading && !error && exercises.length > 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Showing {Math.min(filtered.length, 120)}{filtered.length > 120 ? "+" : ""} of {filtered.length} results
        </Typography>
      )}

      {/* Loading */}
      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
          <CircularProgress />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Loading exercise library…
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
          <FitnessCenterIcon sx={{ fontSize: 48, color: "text.disabled" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Could not load the exercise library.
          </Typography>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>{error}</Typography>
          <Button variant="contained" size="small" onClick={doFetch}>Retry</Button>
        </Box>
      )}

      {/* ── Exercise grid ── */}
      {!loading && !error && (
        <Grid container spacing={2}>
          {filtered.slice(0, 120).map((ex) => (
            <Grid item xs={12} sm={6} md={4} key={ex.id}>
              <Paper
                elevation={2}
                onClick={() => setSelected(ex)}
                sx={{
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {/* GIF thumbnail */}
                <ExerciseThumbnail media_id={ex.media_id} name={ex.name} />

                {/* Card body */}
                <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
                  <Typography
                    variant="body2"
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
                      sx={{ backgroundColor: theme.palette.primary.main + "33", color: theme.palette.primary.main, fontWeight: 500, fontSize: "0.68rem" }}
                    />
                    <Chip
                      label={titleCase(ex.target)}
                      size="small"
                      sx={{ backgroundColor: theme.palette.secondary.main + "33", color: theme.palette.secondary.main, fontWeight: 500, fontSize: "0.68rem" }}
                    />
                    <Chip
                      label={titleCase(ex.equipment)}
                      size="small"
                      sx={{ backgroundColor: chipColor(ex.equipment) + "33", color: chipColor(ex.equipment), fontWeight: 500, fontSize: "0.68rem" }}
                    />
                  </Box>
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

      {/* ── Detail dialog ── */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
      >
        {selected && (
          <>
            <DialogTitle sx={{ pb: 1 }}>{titleCase(selected.name)}</DialogTitle>
            <DialogContent>
              {/* Animated GIF */}
              <ExerciseGif media_id={selected.media_id} name={selected.name} />

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
              {selected.secondary_muscles?.length > 0 && (
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                  <strong>Secondary muscles: </strong>
                  {selected.secondary_muscles.map(titleCase).join(", ")}
                </Typography>
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
                          minWidth: 22, height: 22,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 700, fontSize: "0.7rem", flexShrink: 0, mt: "1px",
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
