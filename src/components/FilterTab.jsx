import React from "react"
import {
  Box, Grid, Paper, Typography, TextField, FormControl,
  InputLabel, Select, MenuItem, Button, Chip,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { workoutSplits } from "../constants"

export default function FilterTab({
  filterStartDate, setFilterStartDate,
  filterEndDate, setFilterEndDate,
  filterWorkout, setFilterWorkout,
  sortOrder, setSortOrder,
  setIsFilteredViewActive,
  setCurrentTab,
  getWorkoutColor,
}) {
  const theme = useTheme()

  return (
    <Box sx={{ mt: 2, p: 4 }} component={Paper} elevation={0}>
      <Typography variant="h5" align="center" gutterBottom>Filter & Sort Entries</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField label="Start Date" type="date" fullWidth value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="End Date" type="date" fullWidth value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel id="filter-workout-label">Filter Workout</InputLabel>
            <Select
              labelId="filter-workout-label" value={filterWorkout}
              onChange={(e) => setFilterWorkout(e.target.value)} label="Filter Workout"
              renderValue={(selected) =>
                selected ? (
                  <Chip label={selected} sx={{ backgroundColor: getWorkoutColor(selected), color: theme.palette.mode === "dark" ? "white" : "black" }} />
                ) : (
                  <Typography variant="body1" sx={{ color: "text.disabled" }}>All Workouts</Typography>
                )
              }
              sx={{ minHeight: "56px", ".MuiSelect-select": { paddingTop: "16.5px", paddingBottom: "16.5px" } }}
            >
              <MenuItem value="">All Workouts</MenuItem>
              {workoutSplits.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth sx={{ minWidth: 160 }}>
            <InputLabel id="sort-order-label">Sort By Date</InputLabel>
            <Select
              labelId="sort-order-label" value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)} label="Sort By Date"
              sx={{ minHeight: "56px", ".MuiSelect-select": { paddingTop: "16.5px", paddingBottom: "16.5px" } }}
            >
              <MenuItem value="desc">Newest First</MenuItem>
              <MenuItem value="asc">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button variant="contained" color="primary" size="small" sx={{ px: 3, py: 0.75 }}
          onClick={() => { setIsFilteredViewActive(true); setCurrentTab(3) }}
        >
          Apply Filters
        </Button>
        <Button variant="contained" color="secondary" size="small" sx={{ px: 3, py: 0.75 }}
          onClick={() => {
            setFilterStartDate("")
            setFilterEndDate("")
            setFilterWorkout("")
            setSortOrder("desc")
            setIsFilteredViewActive(false)
            setCurrentTab(3)
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  )
}
