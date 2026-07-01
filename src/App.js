import React, { useState, useEffect, useCallback, useContext, useRef } from "react"
import {
  CssBaseline, AppBar, Typography, Container, Box,
  Tab, Tabs, Paper, FormControl, RadioGroup,
  FormControlLabel, Radio, IconButton,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import BrushIcon from "@mui/icons-material/Brush"

import { ThemeContext, ThemeProviderWrapper } from "./ThemeContext"
import { themes, themeBlobs } from "./themes"
import {
  LOCAL_STORAGE_KEY, SYSTEM_UNIT_KEY, CUSTOM_SUPPLEMENTS_KEY,
} from "./constants"
import {
  convertWeight, convertHeightToCm, convertCmToDisplayHeight,
  calculateBMI, getTodayDate,
} from "./utils"

import EntryForm from "./components/EntryForm"
import SummaryTab from "./components/SummaryTab"
import FilterTab from "./components/FilterTab"
import ProgressTab from "./components/ProgressTab"
import ExerciseLibrary from "./components/ExerciseLibrary"
import {
  ManageSupplementsDialog,
  ConfirmClearDialog,
  ImportConfirmDialog,
  ConfirmDeleteEntryDialog,
  ConfirmDeleteSupplementDialog,
  EntryExistsDialog,
  SimpleAlertDialog,
  SettingsDialog,
} from "./components/Dialogs"

function AppContent() {
  const theme = useTheme()
  const { currentThemeName, setCurrentThemeName } = useContext(ThemeContext)

  const getWorkoutColor = useCallback(
    (workoutName) => {
      switch (workoutName) {
        case "Chest": return theme.palette.primary.light
        case "Biceps": return theme.palette.secondary.light
        case "Back": return theme.palette.mode === "dark" ? "#D0BCFF" : "#424242"
        case "Triceps": return theme.palette.mode === "dark" ? "#B3F0E6" : "#26A69A"
        case "Shoulder": return theme.palette.mode === "dark" ? "#FFE082" : "#FFB300"
        case "Traps": return theme.palette.error.light
        case "Forearms": return theme.palette.mode === "dark" ? "#D7C7A2" : "#795548"
        case "Abs": return theme.palette.success.light
        case "Legs": return theme.palette.mode === "dark" ? "#FFEB99" : "#FBC02D"
        case "Cardio": return theme.palette.mode === "dark" ? "#A6E4FF" : "#0288D1"
        case "Rest Day": return theme.palette.text.disabled
        default: return theme.palette.primary.main
      }
    },
    [theme],
  )

  const getPainLevelColor = useCallback(
    (painLevel) => {
      const level = Number.parseInt(painLevel.split(" ")[0])
      if (isNaN(level)) return theme.palette.text.disabled
      if (level <= 3) return theme.palette.success.main
      if (level <= 6) return theme.palette.mode === "dark" ? "#FFD180" : "#FFAB40"
      if (level <= 8) return theme.palette.error.light
      return theme.palette.error.main
    },
    [theme],
  )

  const [currentTab, setCurrentTab] = useState(0)
  const [fitnessEntries, setFitnessEntries] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })
  const [customSupplements, setCustomSupplements] = useState([])
  const [unitSystem, setUnitSystem] = useState("metric")
  const [currentEditingIndex, setCurrentEditingIndex] = useState(-1)
  const [isFilteredViewActive, setIsFilteredViewActive] = useState(false)

  // Form state
  const [trackDate, setTrackDate] = useState(getTodayDate())
  const [weight, setWeight] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [workoutSplit, setWorkoutSplit] = useState([])
  const [painLevel, setPainLevel] = useState("")
  const [notes, setNotes] = useState("")
  const [formSupplements, setFormSupplements] = useState([])

  // Filter state
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")
  const [filterWorkout, setFilterWorkout] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")

  // Dialog state
  const [isManageSupplementsOpen, setIsManageSupplementsOpen] = useState(false)
  const [newSupplementName, setNewSupplementName] = useState("")
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false)
  const [isConfirmDeleteEntryOpen, setIsConfirmDeleteEntryOpen] = useState(false)
  const [entryToDeleteIndex, setEntryToDeleteIndex] = useState(null)
  const [isEntryExistsDialogOpen, setIsEntryExistsDialogOpen] = useState(false)
  const [entryExistsDialogData, setEntryExistsDialogData] = useState(null)
  const [isSimpleAlertDialogOpen, setIsSimpleAlertDialogOpen] = useState(false)
  const [simpleAlertDialogMessage, setSimpleAlertDialogMessage] = useState("")
  const [isConfirmDeleteCustomSupplementOpen, setIsConfirmDeleteCustomSupplementOpen] = useState(false)
  const [supplementToDelete, setSupplementToDelete] = useState("")
  const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false)
  const [pendingImportData, setPendingImportData] = useState(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const importFileInputRef = useRef(null)

  // Load from localStorage
  useEffect(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedEntries) {
      try {
        const parsed = JSON.parse(storedEntries)
        setFitnessEntries(parsed.sort((a, b) => new Date(b.date) - new Date(a.date)))
      } catch (e) {
        console.error("Error parsing stored data:", e)
        setFitnessEntries([])
      }
    }
    const storedSupplements = localStorage.getItem(CUSTOM_SUPPLEMENTS_KEY)
    if (storedSupplements) {
      try { setCustomSupplements(JSON.parse(storedSupplements)) }
      catch (e) { setCustomSupplements(["Protein", "Creatine", "EAA"]) }
    } else {
      setCustomSupplements(["Protein", "Creatine", "EAA"])
    }
    const savedSystem = localStorage.getItem(SYSTEM_UNIT_KEY) || "metric"
    setUnitSystem(savedSystem)
  }, [])

  useEffect(() => {
    if (currentEditingIndex === -1) {
      setFormSupplements(customSupplements.map((name) => ({ name, taken: false, quantity: "" })))
    } else {
      const entry = fitnessEntries[currentEditingIndex]
      const updated = customSupplements.map((supName) => {
        const existing = (entry.supplements || []).find((s) => s.name === supName)
        return existing || { name: supName, taken: false, quantity: "" }
      })
      setFormSupplements(updated)
    }
  }, [customSupplements, unitSystem, currentEditingIndex, fitnessEntries])

  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fitnessEntries)) }, [fitnessEntries])
  useEffect(() => { localStorage.setItem(CUSTOM_SUPPLEMENTS_KEY, JSON.stringify(customSupplements)) }, [customSupplements])

  const showSimpleAlertDialog = useCallback((message) => {
    setSimpleAlertDialogMessage(message)
    setIsSimpleAlertDialogOpen(true)
  }, [])

  const closeSimpleAlertDialog = useCallback(() => {
    setIsSimpleAlertDialogOpen(false)
    setSimpleAlertDialogMessage("")
  }, [])

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
    if (newValue === 1) {
      const now = new Date()
      setSelectedMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`)
    }
    if (newValue === 3) {
      setFilterStartDate(""); setFilterEndDate(""); setFilterWorkout(""); setSortOrder("desc")
      setIsFilteredViewActive(false)
    }
  }

  const handleUnitSystemChange = (event) => {
    const newSystem = event.target.value
    setUnitSystem(newSystem)
    localStorage.setItem(SYSTEM_UNIT_KEY, newSystem)
    setHeightCm(""); setHeightFeet(""); setHeightInches("")
  }

  const resetForm = useCallback(() => {
    setTrackDate(getTodayDate()); setWeight(""); setHeightCm(""); setHeightFeet(""); setHeightInches("")
    setWorkoutSplit([]); setPainLevel(""); setNotes("")
    setFormSupplements(customSupplements.map((name) => ({ name, taken: false, quantity: "" })))
    setCurrentEditingIndex(-1)
  }, [customSupplements])

  const handleSubmit = (event) => {
    event.preventDefault()
    let weightValue = Number.parseFloat(weight)
    if (isNaN(weightValue)) { showSimpleAlertDialog("Please enter a valid weight."); return }
    if (unitSystem === "imperial") weightValue = convertWeight(weight, "lbs", "kg")

    let heightValue
    if (unitSystem === "metric") {
      heightValue = Number.parseFloat(heightCm)
      if (isNaN(heightValue) || heightValue <= 0) { showSimpleAlertDialog("Please enter a valid height in centimeters."); return }
    } else {
      const feet = Number.parseFloat(heightFeet)
      const inches = Number.parseFloat(heightInches)
      if (isNaN(feet) || isNaN(inches)) { showSimpleAlertDialog("Please enter valid values for both feet and inches."); return }
      if ((feet === 0 && inches === 0) || feet < 0 || inches < 0) { showSimpleAlertDialog("Height must be a positive value."); return }
      heightValue = convertHeightToCm(feet, "ft/in", inches)
    }

    const newEntryData = {
      date: trackDate, weight: weightValue, height: heightValue,
      workoutSplit, painLevel, notes, supplements: formSupplements.filter((s) => s.taken),
    }

    let updatedEntries
    if (currentEditingIndex > -1) {
      updatedEntries = [...fitnessEntries]
      updatedEntries[currentEditingIndex] = newEntryData
      setCurrentEditingIndex(-1)
    } else {
      const existingIdx = fitnessEntries.findIndex((e) => e.date === newEntryData.date)
      if (existingIdx !== -1) { setEntryExistsDialogData(newEntryData); setIsEntryExistsDialogOpen(true); return }
      else updatedEntries = [...fitnessEntries, newEntryData]
    }
    setFitnessEntries(updatedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)))
    resetForm(); setCurrentTab(3); setIsFilteredViewActive(false)
  }

  const handleConfirmUpdateExistingEntry = () => {
    const idx = fitnessEntries.findIndex((e) => e.date === entryExistsDialogData.date)
    if (idx !== -1) {
      const updated = [...fitnessEntries]; updated[idx] = entryExistsDialogData
      setFitnessEntries(updated.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }
    resetForm(); setCurrentTab(3); setIsFilteredViewActive(false)
    setIsEntryExistsDialogOpen(false); setEntryExistsDialogData(null)
  }

  const handleCancelUpdateExistingEntry = () => {
    setIsEntryExistsDialogOpen(false); setEntryExistsDialogData(null)
  }

  const handleEditEntry = useCallback((index) => {
    const entry = fitnessEntries[index]
    setTrackDate(entry.date)
    setWeight(convertWeight(entry.weight, "kg", unitSystem === "metric" ? "kg" : "lbs").toFixed(1))
    if (unitSystem === "metric") {
      setHeightCm(entry.height ? entry.height.toFixed(1) : "")
    } else {
      const ch = entry.height ? convertCmToDisplayHeight(entry.height, "ft/in") : { feet: "", inches: "" }
      setHeightFeet(ch.feet); setHeightInches(ch.inches.toFixed ? ch.inches.toFixed(1) : ch.inches)
    }
    setWorkoutSplit(entry.workoutSplit || []); setPainLevel(entry.painLevel || ""); setNotes(entry.notes || "")
    const updatedSupps = customSupplements.map((supName) => {
      const ex = (entry.supplements || []).find((s) => s.name === supName)
      return ex || { name: supName, taken: false, quantity: "" }
    })
    setFormSupplements(updatedSupps); setCurrentEditingIndex(index); setCurrentTab(0)
  }, [fitnessEntries, unitSystem, customSupplements])

  const handleDeleteEntry = useCallback((index) => {
    setEntryToDeleteIndex(index); setIsConfirmDeleteEntryOpen(true)
  }, [])

  const confirmDeleteEntry = () => {
    const updated = fitnessEntries.filter((_, i) => i !== entryToDeleteIndex)
    setFitnessEntries(updated); setIsConfirmDeleteEntryOpen(false); setEntryToDeleteIndex(null)
    if (currentEditingIndex === entryToDeleteIndex) resetForm()
    else if (currentEditingIndex > entryToDeleteIndex) setCurrentEditingIndex((p) => p - 1)
  }

  const cancelDeleteEntry = () => { setIsConfirmDeleteEntryOpen(false); setEntryToDeleteIndex(null) }

  const confirmClearAllData = () => {
    setFitnessEntries([]); localStorage.removeItem(LOCAL_STORAGE_KEY); resetForm()
    setFilterStartDate(""); setFilterEndDate(""); setFilterWorkout(""); setSortOrder("desc")
    setIsFilteredViewActive(false); setIsConfirmClearOpen(false)
  }

  const handleAddSupplement = () => {
    const name = newSupplementName.trim()
    if (name && !customSupplements.includes(name)) { setCustomSupplements((p) => [...p, name]); setNewSupplementName("") }
    else if (name) showSimpleAlertDialog("This supplement name already exists!")
  }

  const handleDeleteCustomSupplement = (nameToDelete) => {
    setSupplementToDelete(nameToDelete); setIsConfirmDeleteCustomSupplementOpen(true)
  }

  const confirmDeleteCustomSupplement = () => {
    setCustomSupplements((p) => p.filter((n) => n !== supplementToDelete))
    setIsConfirmDeleteCustomSupplementOpen(false); setSupplementToDelete("")
  }

  const cancelDeleteCustomSupplement = () => { setIsConfirmDeleteCustomSupplementOpen(false); setSupplementToDelete("") }

  const handleSupplementCheckboxChange = (name, checked) => {
    setFormSupplements((p) => p.map((s) => s.name === name ? { ...s, taken: checked } : s))
  }

  const handleSupplementQuantityChange = (name, quantity) => {
    setFormSupplements((p) => p.map((s) => s.name === name ? { ...s, quantity } : s))
  }

  const handleDownloadCsv = () => {
    if (fitnessEntries.length === 0) { showSimpleAlertDialog("No data to download!"); return }
    const baseHeaders = ["Date", "Weight (kg)", "Height (cm)", "BMI", "Workout Split", "Pain Level", "Notes"]
    const supplementHeaders = customSupplements.flatMap((name) => [`${name} (Taken)`, `${name} (Quantity)`])
    let csvContent = [...baseHeaders, ...supplementHeaders].join(",") + "\n"
    fitnessEntries.forEach((entry) => {
      const row = [
        entry.date, entry.weight.toFixed(1), entry.height ? entry.height.toFixed(1) : "",
        calculateBMI(entry.weight, entry.height) !== null ? calculateBMI(entry.weight, entry.height) : "",
        `"${(Array.isArray(entry.workoutSplit) ? entry.workoutSplit : [entry.workoutSplit]).map((s) => s.replace(/"/g, '""')).join(", ")}"`,
        `"${entry.painLevel.replace(/"/g, '""')}"`,
        entry.notes ? `"${entry.notes.replace(/"/g, '""')}"` : "",
      ]
      const supplementValues = customSupplements.flatMap((supName) => {
        const sup = (entry.supplements || []).find((s) => s.name === supName)
        return [sup && sup.taken ? "Yes" : "No", sup && sup.taken && sup.quantity ? `"${sup.quantity.replace(/"/g, '""')}"` : ""]
      })
      csvContent += [...row, ...supplementValues].join(",") + "\n"
    })
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url); link.setAttribute("download", "fitness_tracker.csv")
      link.style.visibility = "hidden"; document.body.appendChild(link); link.click(); document.body.removeChild(link)
    } else {
      showSimpleAlertDialog("Your browser does not support downloading files directly.")
    }
  }

  const parseCsvLine = (line) => {
    const result = []; let current = ""; let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++ } else inQuotes = !inQuotes
      } else if (ch === "," && !inQuotes) { result.push(current); current = "" }
      else current += ch
    }
    result.push(current); return result
  }

  const handleImportClick = () => {
    if (importFileInputRef.current) { importFileInputRef.current.value = ""; importFileInputRef.current.click() }
  }

  const handleImportFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    if (!file.name.endsWith(".csv")) { showSimpleAlertDialog("Please select a valid CSV file."); return }
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "")
        if (lines.length < 2) { showSimpleAlertDialog("The CSV file is empty or has no data rows."); return }
        const headers = parseCsvLine(lines[0])
        const detectedSupplements = []
        headers.forEach((h) => { if (h.endsWith(" (Taken)")) detectedSupplements.push(h.replace(" (Taken)", "")) })
        const parsedEntries = []
        for (let i = 1; i < lines.length; i++) {
          const values = parseCsvLine(lines[i])
          if (values.length < 7) continue
          const [date, weightKg, heightCmVal, , workoutStr, painLevelVal, notesVal] = values
          const workoutSplitArr = workoutStr ? workoutStr.split(", ").map((s) => s.trim()).filter(Boolean) : []
          const supplements = []
          detectedSupplements.forEach((supName, idx) => {
            const takenIdx = 7 + idx * 2; const qtyIdx = takenIdx + 1
            const taken = values[takenIdx] === "Yes"
            const quantity = taken && values[qtyIdx] ? values[qtyIdx] : ""
            if (taken) supplements.push({ name: supName, taken, quantity })
          })
          parsedEntries.push({
            date, weight: parseFloat(weightKg), height: heightCmVal ? parseFloat(heightCmVal) : null,
            workoutSplit: workoutSplitArr, painLevel: painLevelVal, notes: notesVal, supplements,
          })
        }
        if (parsedEntries.length === 0) { showSimpleAlertDialog("No valid entries found in the CSV."); return }
        setPendingImportData({ entries: parsedEntries, supplements: detectedSupplements })
        setIsImportConfirmOpen(true)
      } catch (err) {
        showSimpleAlertDialog("Failed to parse the CSV file. Make sure it was exported from this app.")
      }
    }
    reader.readAsText(file)
  }

  const confirmImport = () => {
    if (!pendingImportData) return
    const mergedMap = {}
    fitnessEntries.forEach((e) => { mergedMap[e.date] = e })
    pendingImportData.entries.forEach((e) => { mergedMap[e.date] = e })
    const mergedEntries = Object.values(mergedMap).sort((a, b) => new Date(b.date) - new Date(a.date))
    const mergedSupplements = [...new Set([...customSupplements, ...pendingImportData.supplements])]
    const importCount = pendingImportData.entries.length
    setFitnessEntries(mergedEntries); setCustomSupplements(mergedSupplements)
    setIsImportConfirmOpen(false); setPendingImportData(null)
    showSimpleAlertDialog(`Import successful! ${importCount} entries imported (duplicates replaced).`)
  }

  const cancelImport = () => { setIsImportConfirmOpen(false); setPendingImportData(null) }

  // Statistics
  const calculateStatistics = useCallback(() => {
    const filtered = fitnessEntries.filter((entry) => {
      const d = new Date(entry.date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === selectedMonth
    })
    if (filtered.length === 0) return { totalEntries: 0, avgWeight: "N/A", avgBMI: "N/A", mostFrequentWorkout: "N/A", avgPainLevel: "N/A", supplementFrequencies: {} }
    const wUnit = unitSystem === "metric" ? "kg" : "lbs"
    const totalWeight = filtered.reduce((s, e) => s + convertWeight(e.weight, "kg", wUnit), 0)
    const avgWeight = `${(totalWeight / filtered.length).toFixed(1)} ${wUnit}`
    let totalBMI = 0; let bmiCount = 0
    filtered.forEach((e) => { const b = calculateBMI(e.weight, e.height); if (b !== null) { totalBMI += parseFloat(b); bmiCount++ } })
    const avgBMI = bmiCount > 0 ? (totalBMI / bmiCount).toFixed(2) : "N/A"
    const wCounts = {}
    filtered.forEach((e) => { (Array.isArray(e.workoutSplit) ? e.workoutSplit : [e.workoutSplit]).forEach((s) => { wCounts[s] = (wCounts[s] || 0) + 1 }) })
    let mostFrequentWorkout = "N/A"; let maxC = 0
    for (const s in wCounts) { if (wCounts[s] > maxC) { maxC = wCounts[s]; mostFrequentWorkout = s } }
    const totalPain = filtered.reduce((s, e) => { const v = parseInt(e.painLevel.split(" ")[0]); return s + (isNaN(v) ? 0 : v) }, 0)
    const avgPainLevel = `${(totalPain / filtered.length).toFixed(1)}`
    const sCounts = {}
    customSupplements.forEach((n) => (sCounts[n] = 0))
    filtered.forEach((e) => { (e.supplements || []).forEach((s) => { if (s.taken && sCounts.hasOwnProperty(s.name)) sCounts[s.name]++ }) })
    const supplementFrequencies = {}
    for (const n in sCounts) supplementFrequencies[n] = `${((sCounts[n] / filtered.length) * 100).toFixed(0)}%`
    return { totalEntries: filtered.length, avgWeight, avgBMI, mostFrequentWorkout, avgPainLevel, supplementFrequencies }
  }, [fitnessEntries, customSupplements, unitSystem, selectedMonth])

  const stats = calculateStatistics()

  const getChartData = useCallback(() => {
    const filtered = fitnessEntries.filter((e) => {
      const d = new Date(e.date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === selectedMonth
    })
    if (filtered.length === 0) return []
    return filtered.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map((e) => ({
      date: `Day ${new Date(e.date).getDate()}`,
      weight: parseFloat(convertWeight(e.weight, "kg", unitSystem === "metric" ? "kg" : "lbs").toFixed(1)),
      bmi: parseFloat(calculateBMI(e.weight, e.height)),
    }))
  }, [fitnessEntries, unitSystem, selectedMonth])

  const chartData = getChartData()

  const filteredAndSortedEntries = useCallback(() => {
    let entries = fitnessEntries
    if (isFilteredViewActive) {
      entries = fitnessEntries.filter((entry) => {
        const ed = new Date(entry.date); ed.setHours(0, 0, 0, 0)
        let dateMatch = true
        if (filterStartDate) { const sd = new Date(filterStartDate); sd.setHours(0, 0, 0, 0); if (ed < sd) dateMatch = false }
        if (filterEndDate) { const ed2 = new Date(filterEndDate); ed2.setHours(0, 0, 0, 0); ed2.setDate(ed2.getDate() + 1); if (ed >= ed2) dateMatch = false }
        const workoutMatch = !filterWorkout || entry.workoutSplit.includes(filterWorkout)
        return dateMatch && workoutMatch
      })
    }
    return [...entries].sort((a, b) => sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date))
  }, [fitnessEntries, isFilteredViewActive, filterStartDate, filterEndDate, filterWorkout, sortOrder])

  const entriesToDisplay = filteredAndSortedEntries()

  return (
    <>
      <CssBaseline />

      {/* Keyframe always injected regardless of active theme */}
      <style>{`
        @keyframes gradientMove {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 100% 0%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Animated gradient background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: (() => {
            const t = themeBlobs[currentThemeName] || themeBlobs.dark
            return `radial-gradient(ellipse at 0% 0%, ${t.b1}dd 0%, transparent 50%),
                    radial-gradient(ellipse at 100% 100%, ${t.b2}cc 0%, transparent 50%),
                    radial-gradient(ellipse at 100% 0%, ${t.b3}aa 0%, transparent 40%),
                    ${t.base}`
          })(),
          backgroundSize: "300% 300%",
          animation: "gradientMove 12s ease infinite",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23grain)' opacity='0.32'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            pointerEvents: "none",
          },
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          my: 4, p: 4, borderRadius: "6px",
          backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.15)", boxShadow: "0 8px 40px rgba(0, 0, 0, 0.3)",
          pb: "100px", ml: { md: "auto" }, mr: { md: "auto" },
        }}
        component={Paper}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <FormControl component="fieldset">
            <RadioGroup row value={unitSystem} onChange={handleUnitSystemChange}>
              <FormControlLabel value="metric" control={<Radio />} label="Metric" />
              <FormControlLabel value="imperial" control={<Radio />} label="Imperial" />
            </RadioGroup>
          </FormControl>
          <IconButton color="primary" onClick={() => setIsSettingsOpen(true)}>
            <BrushIcon />
          </IconButton>
        </Box>

        <Typography variant="h4" component="h1" align="center" gutterBottom
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
            letterSpacing: "0.2em", fontWeight: "bold", textTransform: "uppercase",
            textShadow: `2px 2px 4px ${theme.palette.text.secondary}`, lineHeight: 1,
          }}
        >
          Gainss
        </Typography>

        <AppBar position="static" color="transparent" elevation={0}
          sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", mb: 3 }}
        >
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="fitness tracker tabs" centered
            TabIndicatorProps={{ style: { backgroundColor: theme.palette.primary.main } }}
          >
            <Tab label="Entry Form" />
            <Tab label="Summary" />
            <Tab label="Filter & Sort" />
            <Tab label="Progress" />
            <Tab label="Exercise Library" />
          </Tabs>
        </AppBar>

        {currentTab === 0 && (
          <EntryForm
            trackDate={trackDate} setTrackDate={setTrackDate}
            weight={weight} setWeight={setWeight}
            heightCm={heightCm} setHeightCm={setHeightCm}
            heightFeet={heightFeet} setHeightFeet={setHeightFeet}
            heightInches={heightInches} setHeightInches={setHeightInches}
            workoutSplit={workoutSplit} setWorkoutSplit={setWorkoutSplit}
            painLevel={painLevel} setPainLevel={setPainLevel}
            notes={notes} setNotes={setNotes}
            formSupplements={formSupplements}
            unitSystem={unitSystem}
            currentEditingIndex={currentEditingIndex}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            handleSupplementCheckboxChange={handleSupplementCheckboxChange}
            handleSupplementQuantityChange={handleSupplementQuantityChange}
            setIsManageSupplementsOpen={setIsManageSupplementsOpen}
            getWorkoutColor={getWorkoutColor}
            getPainLevelColor={getPainLevelColor}
          />
        )}

        {currentTab === 1 && (
          <SummaryTab
            stats={stats} chartData={chartData}
            selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
            fitnessEntries={fitnessEntries}
            customSupplements={customSupplements}
            unitSystem={unitSystem}
            getWorkoutColor={getWorkoutColor}
            getPainLevelColor={getPainLevelColor}
          />
        )}

        {currentTab === 2 && (
          <FilterTab
            filterStartDate={filterStartDate} setFilterStartDate={setFilterStartDate}
            filterEndDate={filterEndDate} setFilterEndDate={setFilterEndDate}
            filterWorkout={filterWorkout} setFilterWorkout={setFilterWorkout}
            sortOrder={sortOrder} setSortOrder={setSortOrder}
            setIsFilteredViewActive={setIsFilteredViewActive}
            setCurrentTab={setCurrentTab}
            getWorkoutColor={getWorkoutColor}
          />
        )}

        {currentTab === 3 && (
          <ProgressTab
            entriesToDisplay={entriesToDisplay}
            unitSystem={unitSystem}
            handleEditEntry={handleEditEntry}
            handleDeleteEntry={handleDeleteEntry}
            handleDownloadCsv={handleDownloadCsv}
            handleImportClick={handleImportClick}
            handleClearAllData={() => setIsConfirmClearOpen(true)}
            handleImportFileChange={handleImportFileChange}
            importFileInputRef={importFileInputRef}
            getWorkoutColor={getWorkoutColor}
            getPainLevelColor={getPainLevelColor}
          />
        )}

        {currentTab === 4 && <ExerciseLibrary />}

        {/* Dialogs */}
        <ManageSupplementsDialog
          open={isManageSupplementsOpen} onClose={() => setIsManageSupplementsOpen(false)}
          customSupplements={customSupplements}
          newSupplementName={newSupplementName} setNewSupplementName={setNewSupplementName}
          handleAddSupplement={handleAddSupplement}
          handleDeleteCustomSupplement={handleDeleteCustomSupplement}
        />
        <ConfirmClearDialog open={isConfirmClearOpen} onCancel={() => setIsConfirmClearOpen(false)} onConfirm={confirmClearAllData} />
        <ImportConfirmDialog open={isImportConfirmOpen} onCancel={cancelImport} onConfirm={confirmImport} pendingImportData={pendingImportData} />
        <ConfirmDeleteEntryDialog open={isConfirmDeleteEntryOpen} onCancel={cancelDeleteEntry} onConfirm={confirmDeleteEntry} />
        <ConfirmDeleteSupplementDialog
          open={isConfirmDeleteCustomSupplementOpen}
          onCancel={cancelDeleteCustomSupplement} onConfirm={confirmDeleteCustomSupplement}
          supplementToDelete={supplementToDelete}
        />
        <EntryExistsDialog
          open={isEntryExistsDialogOpen}
          onCancel={handleCancelUpdateExistingEntry} onConfirm={handleConfirmUpdateExistingEntry}
          entryExistsDialogData={entryExistsDialogData}
        />
        <SimpleAlertDialog open={isSimpleAlertDialogOpen} onClose={closeSimpleAlertDialog} message={simpleAlertDialogMessage} />
        <SettingsDialog
          open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
          currentThemeName={currentThemeName} setCurrentThemeName={setCurrentThemeName}
          themes={themes}
        />

        <Box sx={{
          mt: 4, textAlign: "center", color: theme.palette.text.secondary, fontSize: "0.9rem",
          p: 2, borderRadius: "6px",
          backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        }}>
          For posting your ad here, contact developer.
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{
        position: "fixed", bottom: 0, left: 0, width: "100%", py: 2,
        backgroundColor: "rgba(26, 32, 44, 0.9)", textAlign: "center",
        color: "text.secondary", zIndex: 1200,
      }}>
        <Container maxWidth="md">
          <Typography variant="body2">
            Made with ❤️ by{" "}
            <a href="https://portfolio-eta-seven-57.vercel.app/" target="_blank" rel="noopener noreferrer"
              style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: "bold" }}
            >
              Shamsul Arifin
            </a>
          </Typography>
        </Container>
      </Box>
    </>
  )
}

function App() {
  return (
    <ThemeProviderWrapper>
      <AppContent />
    </ThemeProviderWrapper>
  )
}

export default App
