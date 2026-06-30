import React from "react"
import {
  Box, Grid, Paper, Typography, TextField, FormControl,
  InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Button, Chip,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { workoutSplits, painLevels } from "../constants"

export default function EntryForm({
  trackDate, setTrackDate,
  weight, setWeight,
  heightCm, setHeightCm,
  heightFeet, setHeightFeet,
  heightInches, setHeightInches,
  workoutSplit, setWorkoutSplit,
  painLevel, setPainLevel,
  notes, setNotes,
  formSupplements,
  unitSystem,
  currentEditingIndex,
  handleSubmit,
  resetForm,
  handleSupplementCheckboxChange,
  handleSupplementQuantityChange,
  setIsManageSupplementsOpen,
  getWorkoutColor,
  getPainLevelColor,
}) {
  const theme = useTheme()

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3} direction="column">
        {/* Section 1: Date, Weight, Height */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>
            Date, Weight & Height
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", borderRadius: "6px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Date" type="date" fullWidth required value={trackDate}
                  onChange={(e) => setTrackDate(e.target.value)} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={`Weight (${unitSystem === "metric" ? "kg" : "lbs"})`}
                  type="number" step="0.1" fullWidth required value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unitSystem === "metric" ? "e.g., 75.5" : "e.g., 165.0"}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                {unitSystem === "metric" ? (
                  <TextField label="Height (cm)" type="number" step="0.1" fullWidth required value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 175.0" InputLabelProps={{ shrink: true }} />
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Height (ft)" type="number" step="1" fullWidth required value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)} placeholder="e.g., 5" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Height (in)" type="number" step="0.1" fullWidth required value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)} placeholder="e.g., 9" InputLabelProps={{ shrink: true }} />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Section 2: Workout Split and Pain Level */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>Workout & Pain</Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", borderRadius: "6px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ minWidth: 250 }}>
                  <InputLabel id="workout-split-label">Workout Split (Select multiple)</InputLabel>
                  <Select
                    labelId="workout-split-label" multiple value={workoutSplit}
                    onChange={(e) => setWorkoutSplit(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value}
                            onDelete={() => setWorkoutSplit(workoutSplit.filter((item) => item !== value))}
                            onMouseDown={(e) => e.stopPropagation()}
                            sx={{ backgroundColor: getWorkoutColor(value), color: theme.palette.mode === "dark" ? "white" : "black" }}
                          />
                        ))}
                      </Box>
                    )}
                    label="Workout Split (Select multiple)"
                    sx={{ minHeight: "56px", ".MuiSelect-select": { paddingTop: "16.5px", paddingBottom: "16.5px" } }}
                  >
                    <MenuItem value="">Select Workout(s)</MenuItem>
                    {workoutSplits.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={workoutSplit.indexOf(option) > -1} />
                        <Typography>{option}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ minWidth: 250 }}>
                  <InputLabel id="pain-level-label">Pain Level (1-10)</InputLabel>
                  <Select
                    labelId="pain-level-label" value={painLevel}
                    onChange={(e) => setPainLevel(e.target.value)}
                    renderValue={(selected) =>
                      selected ? (
                        <Chip label={selected} onDelete={() => setPainLevel("")}
                          onMouseDown={(e) => e.stopPropagation()}
                          sx={{ backgroundColor: getPainLevelColor(selected), color: theme.palette.mode === "dark" ? "white" : "black" }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{ color: "text.disabled" }}>Select Level</Typography>
                      )
                    }
                    label="Pain Level (1-10)"
                    sx={{ minHeight: "56px", ".MuiSelect-select": { paddingTop: "16.5px", paddingBottom: "16.5px" } }}
                  >
                    <MenuItem value="">Select Level</MenuItem>
                    {painLevels.map((level) => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Section 3: Supplements */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>Supplements</Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", borderRadius: "6px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" sx={{ color: "text.secondary", flexGrow: 1 }}>Supplements:</Typography>
              <Button variant="contained"
                sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, "&:hover": { backgroundColor: theme.palette.secondary.light } }}
                onClick={() => setIsManageSupplementsOpen(true)}
              >
                Manage Supplements
              </Button>
            </Box>
            <Grid container spacing={1}>
              {formSupplements.map((sup, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox checked={sup.taken} onChange={(e) => handleSupplementCheckboxChange(sup.name, e.target.checked)} />}
                      label={<Typography sx={{ color: "text.secondary" }}>{sup.name}</Typography>}
                    />
                    {sup.taken && (
                      <TextField size="small" placeholder="Quantity (grams)" value={sup.quantity}
                        onChange={(e) => handleSupplementQuantityChange(sup.name, e.target.value)}
                        sx={{ ml: 1, flexGrow: 1 }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Section 4: Notes */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>Notes</Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", borderRadius: "6px" }}>
            <TextField label="Notes" multiline rows={3} fullWidth value={notes}
              onChange={(e) => setNotes(e.target.value)} InputLabelProps={{ shrink: true }} />
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          {currentEditingIndex > -1 && (
            <Button variant="contained" color="secondary" onClick={resetForm}>Cancel Edit</Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {currentEditingIndex > -1 ? "Update Entry" : "Add Entry"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
