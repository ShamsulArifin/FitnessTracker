import React from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, TextField, List, ListItem,
  ListItemText, ListItemSecondaryAction, IconButton,
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { Close as CloseIcon } from "@mui/icons-material"

export function ManageSupplementsDialog({
  open, onClose,
  customSupplements,
  newSupplementName, setNewSupplementName,
  handleAddSupplement,
  handleDeleteCustomSupplement,
}) {
  const theme = useTheme()
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Custom Supplements</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={1} mb={2}>
          <TextField autoFocus margin="dense" label="New supplement name" fullWidth
            value={newSupplementName} onChange={(e) => setNewSupplementName(e.target.value)}
            onKeyPress={(e) => { if (e.key === "Enter") { handleAddSupplement(); e.preventDefault() } }}
          />
          <Button variant="contained" color="primary" onClick={handleAddSupplement} startIcon={<AddIcon />}>Add</Button>
        </Box>
        <List>
          {customSupplements.length === 0 ? (
            <Typography variant="body2" align="center" sx={{ color: "text.disabled", mt: 2 }}>
              No custom supplements added yet.
            </Typography>
          ) : (
            customSupplements.map((name) => (
              <ListItem key={name} sx={{ bgcolor: theme.palette.background.default, mb: 1, borderRadius: "0px" }}>
                <ListItemText primary={name} sx={{ color: "text.primary" }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCustomSupplement(name)}>
                    <DeleteIcon sx={{ color: theme.palette.error.main }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" startIcon={<CloseIcon />}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ConfirmClearDialog({ open, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{"Confirm Clear All Data"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete ALL your fitness data? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" autoFocus>Cancel</Button>
        <Button onClick={onConfirm} color="error">Delete All</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ImportConfirmDialog({ open, onCancel, onConfirm, pendingImportData }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="import-dialog-title">
      <DialogTitle id="import-dialog-title">{"Confirm Import"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {pendingImportData
            ? `This will import ${pendingImportData.entries.length} entries from the CSV file. Any existing entries with the same date will be overwritten. New entries will be merged with your current data.`
            : ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" autoFocus>Cancel</Button>
        <Button onClick={onConfirm} color="primary">Import</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ConfirmDeleteEntryDialog({ open, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="delete-entry-dialog-title">
      <DialogTitle id="delete-entry-dialog-title">{"Confirm Delete Entry"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this entry? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" autoFocus>Cancel</Button>
        <Button onClick={onConfirm} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ConfirmDeleteSupplementDialog({ open, onCancel, onConfirm, supplementToDelete }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="delete-custom-supplement-dialog-title">
      <DialogTitle id="delete-custom-supplement-dialog-title">{"Confirm Delete Supplement"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove "{supplementToDelete}" from your custom supplements? This will not remove it from existing entries.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" autoFocus>Cancel</Button>
        <Button onClick={onConfirm} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export function EntryExistsDialog({ open, onCancel, onConfirm, entryExistsDialogData }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="entry-exists-dialog-title">
      <DialogTitle id="entry-exists-dialog-title">{"Entry Already Exists"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          An entry for {entryExistsDialogData?.date} already exists. Do you want to update it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">No, Keep Both</Button>
        <Button onClick={onConfirm} color="primary" autoFocus>Yes, Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export function SimpleAlertDialog({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="simple-alert-dialog-title">
      <DialogTitle id="simple-alert-dialog-title">{"Alert"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export function SettingsDialog({ open, onClose, currentThemeName, setCurrentThemeName, themes }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="theme-dialog-title" maxWidth="sm" fullWidth>
      <DialogTitle id="theme-dialog-title">Theme</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="theme-select-label">Choose Theme</InputLabel>
          <Select
            labelId="theme-select-label" value={currentThemeName} label="Choose Theme"
            onChange={(e) => setCurrentThemeName(e.target.value)}
          >
            {Object.keys(themes).map((themeName) => (
              <MenuItem key={themeName} value={themeName}>
                {themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/([A-Z])/g, " $1").trim()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  )
}
