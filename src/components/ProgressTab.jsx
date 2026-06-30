import React from "react"
import {
  Box, Typography, List, Paper, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Button, Chip,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { convertWeight, convertCmToDisplayHeight, calculateBMI } from "../utils"

export default function ProgressTab({
  entriesToDisplay,
  unitSystem,
  handleEditEntry,
  handleDeleteEntry,
  handleDownloadCsv,
  handleImportClick,
  handleClearAllData,
  handleImportFileChange,
  importFileInputRef,
  getWorkoutColor,
  getPainLevelColor,
}) {
  const theme = useTheme()

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>Your Progress</Typography>
      {entriesToDisplay.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ color: "text.disabled", mt: 3 }}>
          No entries found matching your criteria. Try adjusting filters or adding new entries.
        </Typography>
      ) : (
        <List
          sx={{
            "& > div": { mb: 2, p: 2, borderRadius: "0px", backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" },
            mt: 3,
          }}
        >
          {entriesToDisplay.map((entry, index) => {
            const displayWeight = convertWeight(entry.weight, "kg", unitSystem === "metric" ? "kg" : "lbs").toFixed(1)
            let displayHeight = "N/A"
            if (entry.height) {
              if (unitSystem === "metric") {
                displayHeight = `${entry.height.toFixed(1)} cm`
              } else {
                const convertedHeight = convertCmToDisplayHeight(entry.height, "ft/in")
                displayHeight = `${convertedHeight.feet}' ${convertedHeight.inches.toFixed(1)}''`
              }
            }
            const bmi = calculateBMI(entry.weight, entry.height)
            const workoutSplitDisplay = Array.isArray(entry.workoutSplit) ? entry.workoutSplit.join(", ") : entry.workoutSplit

            let supplementsDisplay = "None"
            if (entry.supplements && entry.supplements.length > 0) {
              const takenSupplements = entry.supplements.filter((s) => s.taken)
              if (takenSupplements.length > 0) {
                supplementsDisplay = takenSupplements.map((s) => s.quantity ? `${s.name} (${s.quantity})` : s.name).join(", ")
              }
            }

            return (
              <Paper key={index} elevation={2} sx={{ borderRadius: "0px", backgroundColor: theme.palette.background.paper }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: "text.primary" }}>{entry.date}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          Weight: {displayWeight} {unitSystem === "metric" ? "kg" : "lbs"}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          <strong>Height:</strong> {displayHeight}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          <strong>BMI:</strong> {bmi !== null ? bmi : "N/A"}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          <strong>Workout:</strong> {workoutSplitDisplay}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          <strong>Pain Level:</strong> {entry.painLevel}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          <strong>Supplements:</strong> {supplementsDisplay}
                        </Typography>
                        {entry.notes && (
                          <Typography component="span" variant="body2" color="text.secondary" display="block" sx={{ whiteSpace: "pre-wrap" }}>
                            <strong>Notes:</strong> {entry.notes}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditEntry(index)}>
                      <EditIcon sx={{ color: theme.palette.secondary.main }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEntry(index)}>
                      <DeleteIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            )
          })}
        </List>
      )}
      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <Button variant="contained" color="success" onClick={handleDownloadCsv}>Download as CSV</Button>
        <Button variant="contained" color="primary" onClick={handleImportClick}>Import CSV</Button>
        <Button variant="contained" color="error" onClick={handleClearAllData}>Clear All Data</Button>
      </Box>
      <input type="file" accept=".csv" ref={importFileInputRef} style={{ display: "none" }} onChange={handleImportFileChange} />
    </Box>
  )
}
