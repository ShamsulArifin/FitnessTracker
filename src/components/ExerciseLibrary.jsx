import React, { useState, useEffect, useMemo } from "react"
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, TextField, InputAdornment, Divider,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"

// Free, public-domain dataset with hosted images
const DATASET_URL =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"

// GitHub-hosted exercise images — each exercise has images[0], images[1] etc.
const imgUrl = (id, index = 0) =>
  `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/${index}.jpg`

const titleCase = (str) =>
  str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : ""

const PAGE_SIZE = 12

// ── Card image ────────────────────────────────────────────────────────────────
function CardImage({ id, name }) {
  const theme = useTheme()
  const [failed, setFailed] = useState(false)

  const placeholderBg =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"

  return (
    <Box
      sx={{
        height: 180,
        width: "100%",
        flexShrink: 0,
        overflow: "hidden",
        backgroundColor: placeholderBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {failed ? (
        <FitnessCenterIcon sx={{ fontSize: 48, color: "text.disabled", opacity: 0.4 }} />
      ) : (
        <img
          src={imgUrl(id)}
          alt={name}
          onError={() => setFailed(true)}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      )}
    </Box>
  )
}

// ── Dialog image (shows both frames as a slideshow) ───────────────────────────
function DialogImage({ id, name, imageCount }) {
  const theme = useTheme()
  const [frame, setFrame] = useState(0)
  const [failed, setFailed] = useState(false)

  // Auto-cycle between frames to simulate animation
  useEffect(() => {
    if (imageCount < 2) return
    const t = setInterval(() => setFrame((f) => (f + 1) % imageCount), 900)
    return () => clearInterval(t)
  }, [imageCount])

  if (failed) return null

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        overflow: "hidden",
        borderRadius: "6px",
        backgroundColor:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        height: 260,
      }}
    >
      <img
        src={imgUrl(id, frame)}
        alt={name}
        onError={() => setFailed(true)}
        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
      />
    </Box>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ExerciseLibrary({ onAddToPlan }) {
  const theme = useTheme()

  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterEquipment, setFilterEquipment] = useState("")
  const [filterMuscle, setFilterMuscle] = useState("")

  const [page, setPage] = useState(1)   // how many pages loaded (each = 12)
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

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [search, filterCategory, filterEquipment, filterMuscle])

  const categories = useMemo(
    () => [...new Set(exercises.map((e) => e.category))].filter(Boolean).sort(),
    [exercises],
  )
  const equipmentList = useMemo(
    () => [...new Set(exercises.map((e) => e.equipment))].filter(Boolean).sort(),
    [exercises],
  )
  const muscleList = useMemo(
    () => [...new Set(exercises.flatMap((e) => e.primaryMuscles))].filter(Boolean).sort(),
    [exercises],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return exercises.filter((ex) => {
      if (filterCategory && ex.category !== filterCategory) return false
      if (filterEquipment && ex.equipment !== filterEquipment) return false
      if (filterMuscle && !ex.primaryMuscles.includes(filterMuscle)) return false
      if (q &&
        !ex.name.toLowerCase().includes(q) &&
        !ex.primaryMuscles.some((m) => m.toLowerCase().includes(q))) return false
      return true
    })
  }, [exercises, search, filterCategory, filterEquipment, filterMuscle])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length
  const hasFilter = search || filterCategory || filterEquipment || filterMuscle

  const levelColor = (level) => {
    if (level === "beginner") return theme.palette.success.main
    if (level === "intermediate") return theme.palette.warning?.main || "#FFA726"
    if (level === "expert") return theme.palette.error.main
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
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
          sx={{ flex: "1 1 240px", minWidth: 200 }}
        />
        <FormControl size="small" sx={{ flex: "1 1 160px", minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{titleCase(c)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ flex: "1 1 160px", minWidth: 140 }}>
          <InputLabel>Equipment</InputLabel>
          <Select value={filterEquipment} label="Equipment" onChange={(e) => setFilterEquipment(e.target.value)}>
            <MenuItem value="">All Equipment</MenuItem>
            {equipmentList.map((eq) => (
              <MenuItem key={eq} value={eq}>{titleCase(eq)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ flex: "1 1 160px", minWidth: 140 }}>
          <InputLabel>Muscle</InputLabel>
          <Select value={filterMuscle} label="Muscle" onChange={(e) => setFilterMuscle(e.target.value)}>
            <MenuItem value="">All Muscles</MenuItem>
            {muscleList.map((m) => (
              <MenuItem key={m} value={m}>{titleCase(m)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {hasFilter && (
          <Button size="small" variant="outlined" sx={{ flexShrink: 0 }}
            onClick={() => { setSearch(""); setFilterCategory(""); setFilterEquipment(""); setFilterMuscle("") }}>
            Clear
          </Button>
        )}
      </Box>

      {/* Results count */}
      {!loading && !error && exercises.length > 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {filtered.length !== exercises.length ? ` (of ${exercises.length})` : ""}
          {" · "}showing {visible.length}
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

      {/* ── Fixed 3-column grid ── */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ color: "text.disabled", py: 6 }}>
              No exercises match your search.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              {visible.map((ex) => (
                <Box
                  key={ex.id}
                  onClick={() => setSelected(ex)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "6px",
                    overflow: "hidden",
                    // Fixed height: 180 image + 56 name + 46 tags = 282px
                    height: 282,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(0,0,0,0.05)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)"
                    }`,
                    backdropFilter: "blur(8px)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
                      borderColor: theme.palette.primary.main + "80",
                    },
                  }}
                >
                  {/* ① Image — 180px */}
                  <CardImage id={ex.id} name={ex.name} />

                  {/* ② Name — 56px, 2-line clamp */}
                  <Box sx={{ height: 56, px: 1.5, pt: 1, pb: 0.5, display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{
                        color: "text.primary",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {ex.name}
                    </Typography>
                  </Box>

                  {/* ③ Tags + Add to Plan — 46px, pinned bottom */}
                  <Box
                    sx={{
                      height: 46,
                      px: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      flexWrap: "nowrap",
                      overflow: "hidden",
                      borderTop: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.07)"
                      }`,
                    }}
                  >
                    {/* Primary muscle */}
                    <Chip
                      label={titleCase(ex.primaryMuscles[0] || "")}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.main + "28",
                        color: theme.palette.primary.main,
                        fontWeight: 600, fontSize: "0.62rem", height: 20,
                        maxWidth: "44%",
                        "& .MuiChip-label": { px: 0.8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
                      }}
                    />
                    {/* Difficulty level */}
                    <Chip
                      label={titleCase(ex.level || "")}
                      size="small"
                      sx={{
                        backgroundColor: levelColor(ex.level) + "28",
                        color: levelColor(ex.level),
                        fontWeight: 600, fontSize: "0.62rem", height: 20,
                        maxWidth: "44%",
                        "& .MuiChip-label": { px: 0.8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
                      }}
                    />
                    {/* Add to plan */}
                    {onAddToPlan && (
                      <Box
                        component="button"
                        onClick={(e) => { e.stopPropagation(); onAddToPlan(ex) }}
                        sx={{
                          ml: "auto",
                          flexShrink: 0,
                          border: "none",
                          borderRadius: "4px",
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          px: 0.8,
                          py: 0.3,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          "&:hover": { opacity: 0.85 },
                        }}
                      >
                        + Plan
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Load More */}
          {hasMore && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="outlined"
                onClick={() => setPage((p) => p + 1)}
                sx={{ px: 4 }}
              >
                Load More ({filtered.length - visible.length} remaining)
              </Button>
            </Box>
          )}
        </>
      )}

      {/* ── Detail dialog ── */}
      <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle sx={{ pb: 1 }}>{selected.name}</DialogTitle>
            <DialogContent>
              {/* Animated image slideshow */}
              <DialogImage
                id={selected.id}
                name={selected.name}
                imageCount={selected.images?.length || 1}
              />

              {/* Meta chips */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {selected.category && (
                  <Chip label={titleCase(selected.category)} size="small" color="primary" variant="outlined" />
                )}
                {selected.level && (
                  <Chip
                    label={titleCase(selected.level)} size="small" variant="outlined"
                    sx={{ borderColor: levelColor(selected.level), color: levelColor(selected.level) }}
                  />
                )}
                {selected.equipment && (
                  <Chip label={titleCase(selected.equipment)} size="small" variant="outlined" />
                )}
                {selected.force && (
                  <Chip label={`Force: ${titleCase(selected.force)}`} size="small" variant="outlined" />
                )}
                {selected.mechanic && (
                  <Chip label={titleCase(selected.mechanic)} size="small" variant="outlined" />
                )}
              </Box>

              {/* Muscles */}
              {selected.primaryMuscles?.length > 0 && (
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  <strong>Primary: </strong>{selected.primaryMuscles.map(titleCase).join(", ")}
                </Typography>
              )}
              {selected.secondaryMuscles?.length > 0 && (
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                  <strong>Secondary: </strong>{selected.secondaryMuscles.map(titleCase).join(", ")}
                </Typography>
              )}

              <Divider sx={{ my: 1.5 }} />

              {/* Instructions */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Instructions
              </Typography>
              {selected.instructions?.length > 0 ? (
                selected.instructions.map((step, i) => (
                  <Box key={i} display="flex" gap={1.5} mb={1} alignItems="flex-start">
                    <Box
                      sx={{
                        minWidth: 22, height: 22, borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "0.65rem", flexShrink: 0, mt: "2px",
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {step}
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
