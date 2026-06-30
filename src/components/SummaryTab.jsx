import React from "react"
import {
  Box, Grid, Paper, Typography, FormControl, InputLabel,
  Select, MenuItem, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { convertWeight, calculateBMI } from "../utils"

export default function SummaryTab({
  stats,
  chartData,
  selectedMonth,
  setSelectedMonth,
  fitnessEntries,
  customSupplements,
  unitSystem,
  getWorkoutColor,
  getPainLevelColor,
}) {
  const theme = useTheme()

  return (
    <Box sx={{ mt: 2, p: 4 }} component={Paper} elevation={0}>
      <Typography variant="h5" align="center" gutterBottom>Summary Statistics</Typography>

      {/* Month selector */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ mb: 3 }}>
        <Typography variant="body1">Select Month:</Typography>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="summary-year-label">Year</InputLabel>
          <Select
            labelId="summary-year-label" label="Year" value={selectedMonth.split("-")[0]}
            onChange={(e) => { const month = selectedMonth.split("-")[1]; setSelectedMonth(`${e.target.value}-${month}`) }}
          >
            {Array.from(new Set(fitnessEntries.map((entry) => new Date(entry.date).getFullYear())))
              .sort((a, b) => b - a)
              .map((year) => (
                <MenuItem key={year} value={String(year)}>{year}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel id="summary-month-label">Month</InputLabel>
          <Select
            labelId="summary-month-label" label="Month" value={selectedMonth.split("-")[1]}
            onChange={(e) => { const year = selectedMonth.split("-")[0]; setSelectedMonth(`${year}-${e.target.value}`) }}
          >
            {[
              ["01", "January"], ["02", "February"], ["03", "March"],
              ["04", "April"],   ["05", "May"],       ["06", "June"],
              ["07", "July"],    ["08", "August"],    ["09", "September"],
              ["10", "October"], ["11", "November"],  ["12", "December"],
            ].map(([val, label]) => (
              <MenuItem key={val} value={val}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Stats grid */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2"><strong>Total Entries:</strong> {stats.totalEntries}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2"><strong>Average Weight:</strong> {stats.avgWeight}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2"><strong>Average BMI:</strong> {stats.avgBMI}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2"><strong>Most Frequent Workout:</strong> {stats.mostFrequentWorkout}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2"><strong>Avg Pain Level:</strong> {stats.avgPainLevel}</Typography>
        </Grid>
        {Object.entries(stats.supplementFrequencies).map(([name, freq]) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Typography variant="body2"><strong>{name} Taken:</strong> {freq}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* Chart */}
      <Typography variant="h6" align="center" gutterBottom sx={{ mt: 5, mb: 3 }}>
        Daily Weight & BMI Progress - {selectedMonth}
      </Typography>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.text.disabled} />
            <XAxis dataKey="date" minTickGap={30}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: theme.palette.text.secondary }}
              tickLine={{ stroke: theme.palette.text.secondary }}
            />
            <YAxis yAxisId="left"
              label={{ value: `Weight (${unitSystem === "metric" ? "kg" : "lbs"})`, angle: -90, position: "insideLeft", fill: theme.palette.text.primary }}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: theme.palette.text.secondary }}
              tickLine={{ stroke: theme.palette.text.secondary }}
            />
            <YAxis yAxisId="right" orientation="right"
              label={{ value: "BMI", angle: 90, position: "insideRight", fill: theme.palette.text.primary }}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: theme.palette.text.secondary }}
              tickLine={{ stroke: theme.palette.text.secondary }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.text.disabled}`, borderRadius: "0px" }}
              labelStyle={{ color: theme.palette.text.primary }}
              itemStyle={{ color: theme.palette.text.secondary }}
              formatter={(value, name) => {
                if (name === `Weight (${unitSystem === "metric" ? "kg" : "lbs"})`) {
                  return [`${value.toFixed(1)} ${unitSystem === "metric" ? "kg" : "lbs"}`, "Weight"]
                }
                return [`${value.toFixed(2)}`, name]
              }}
            />
            <Legend wrapperStyle={{ color: theme.palette.text.primary }} />
            <Line yAxisId="left" type="monotone" dataKey="weight"
              name={`Weight (${unitSystem === "metric" ? "kg" : "lbs"})`}
              stroke={theme.palette.primary.main} activeDot={{ r: 8 }}
            />
            <Line yAxisId="right" type="monotone" dataKey="bmi" name="BMI"
              stroke={theme.palette.secondary.main} activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" align="center" sx={{ color: "text.disabled", mt: 3 }}>
          No entries for {selectedMonth}. Add some or change the month.
        </Typography>
      )}

      {/* Daily Breakdown Table */}
      <Typography variant="h6" align="center" gutterBottom sx={{ mt: 5, mb: 2 }}>
        Daily Breakdown — {selectedMonth}
      </Typography>
      {(() => {
        const monthEntries = fitnessEntries
          .filter((entry) => {
            const d = new Date(entry.date)
            const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
            return m === selectedMonth
          })
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date))

        if (monthEntries.length === 0) {
          return (
            <Typography variant="body1" align="center" sx={{ color: "text.disabled" }}>
              No entries for {selectedMonth}. Add some or change the month.
            </Typography>
          )
        }

        const weightUnit = unitSystem === "metric" ? "kg" : "lbs"

        return (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, overflowX: "auto" }}>
            <Table size="small" aria-label="daily breakdown table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Date</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "text.primary" }}>Weight ({weightUnit})</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "text.primary" }}>BMI</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Workout</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Pain Level</TableCell>
                  {customSupplements.length > 0 && (
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Supplements</TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthEntries.map((entry) => {
                  const displayWeight = convertWeight(entry.weight, "kg", weightUnit).toFixed(1)
                  const bmi = calculateBMI(entry.weight, entry.height)
                  const workouts = (Array.isArray(entry.workoutSplit) ? entry.workoutSplit : [entry.workoutSplit]).filter(Boolean)
                  const takenSupplements = (entry.supplements || []).filter((s) => s.taken)
                  return (
                    <TableRow key={entry.date}
                      sx={{ "&:nth-of-type(odd)": { backgroundColor: "rgba(128,128,128,0.06)" }, "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ color: "text.primary", whiteSpace: "nowrap" }}>{entry.date}</TableCell>
                      <TableCell align="right" sx={{ color: "text.primary" }}>{displayWeight}</TableCell>
                      <TableCell align="right" sx={{ color: "text.primary" }}>{bmi !== null ? bmi : "—"}</TableCell>
                      <TableCell sx={{ color: "text.primary" }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {workouts.map((w) => (
                            <Chip key={w} label={w} size="small"
                              sx={{ backgroundColor: getWorkoutColor(w), color: theme.palette.mode === "dark" ? "#fff" : "#000", fontWeight: 500 }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "text.primary", whiteSpace: "nowrap" }}>
                        <Chip label={entry.painLevel || "—"} size="small"
                          sx={{ backgroundColor: entry.painLevel ? getPainLevelColor(entry.painLevel) : "transparent", color: "#fff", fontWeight: 500 }}
                        />
                      </TableCell>
                      {customSupplements.length > 0 && (
                        <TableCell sx={{ color: "text.primary" }}>
                          {takenSupplements.length > 0
                            ? takenSupplements.map((s) => (s.quantity ? `${s.name} (${s.quantity})` : s.name)).join(", ")
                            : "—"}
                        </TableCell>
                      )}
                      <TableCell sx={{ color: "text.secondary", maxWidth: 200, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {entry.notes || "—"}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )
      })()}
    </Box>
  )
}
