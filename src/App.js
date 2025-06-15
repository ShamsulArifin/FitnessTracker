import React, { useState, useEffect, useCallback } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tab,
  Tabs,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  RadioGroup,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Chip,
  // Link from Material-UI is imported but <a> tag is used for external link in footer
} from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'; // Import useTheme
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PsychologyIcon from '@mui/icons-material/Psychology'; // For the Gemini API button

// Define a dark theme inspired by Material Design 3
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // M3-inspired color palette
    primary: {
      main: '#9CE0FF', // Light blue, reminiscent of M3 primary
      light: '#C7EEFF',
      dark: '#006494',
      contrastText: '#000000', // Black text on light primary for contrast
    },
    secondary: {
      main: '#B0C4DE', // LightSteelBlue, a softer secondary
      light: '#DAE2F0',
      dark: '#4A5C6F',
      contrastText: '#000000', // Black text on light secondary for contrast
    },
    error: {
      main: '#CF6679', // M3 error color
      light: '#FF8A80',
      dark: '#B00020',
      contrastText: '#FFFFFF', // White text on error for contrast
    },
    success: {
      main: '#80E280', // M3-like green
      light: '#A7F2A7',
      dark: '#008000',
      contrastText: '#000000', // Black text on success for contrast
    },
    background: {
      default: '#000000', // Changed to black
      paper: '#2F2E31', // M3 dark surface color
    },
    text: {
      primary: '#E6E1E5', // High-emphasis text on dark background
      secondary: '#C9C5CD', // Medium-emphasis text
      disabled: '#938F99', // Disabled text
    },
  },
  typography: {
    // M3-inspired typography scale (simplified)
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700, // Display Large/Medium
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '0.005em',
    },
    h5: {
      fontWeight: 600, // Headline Large
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 600, // Headline Medium
      fontSize: '1.5rem',
      lineHeight: 1.33,
      letterSpacing: '0em',
    },
    body1: {
      fontWeight: 400, // Body Large
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00937em',
    },
    body2: {
      fontWeight: 400, // Body Medium
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01786em',
    },
    button: {
      fontWeight: 500, // Label Large
      fontSize: '0.875rem',
      textTransform: 'none', // M3 buttons are usually not all caps
      letterSpacing: '0.01786em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)', // Slightly more visible border
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)', // M3-inspired shadow for elevation 1
          borderRadius: '28px', // M3 standard for large containers
          backgroundColor: 'rgba(47, 46, 49, 0.7)', // Ensure paper uses consistent transparent dark background
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(60, 60, 65, 0.6)', // M3 text field fill color with transparency
          color: '#E6E1E5', // High-emphasis text color
          borderRadius: '16px', // M3 text field shape
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(197, 198, 201, 0.3)', // Outline color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(197, 198, 201, 0.5)', // Hover outline color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9CE0FF', // Primary color on focus
          },
          '& input[type="date"]': {
            colorScheme: 'dark', // Hint to the browser for dark mode calendar
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#C9C5CD', // Secondary text color for labels
          '&.Mui-focused': {
            color: '#9CE0FF', // Primary color on focus
          },
          '&.Mui-disabled': {
            color: '#938F99', // Disabled text
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: 'rgba(60, 60, 65, 0.6)', // Consistent input background
          color: '#E6E1E5',
          borderRadius: '16px', // M3 select shape
        },
        icon: {
          color: '#E6E1E5', // Ensure dropdown arrow is visible
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#938F99', // Disabled text for unchecked state
          '&.Mui-checked': {
            color: '#9CE0FF', // M3 primary color when checked
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#938F99',
          '&.Mui-checked': {
            color: '#9CE0FF',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // M3 button shape (pill-like)
          textTransform: 'none', // M3 buttons use Title Case, not all caps
          fontWeight: 500, // M3 Label Large font weight
          padding: '10px 24px', // M3 button padding
          boxShadow: 'none', // M3 elevated buttons have subtle shadow handled by paper/container
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#9CE0FF', // M3 primary color
          color: '#000000', // Hardcoded contrastText
          '&:hover': {
            backgroundColor: '#C7EEFF', // Slightly lighter on hover
          },
        },
        containedSuccess: {
          backgroundColor: '#80E280', // M3-like green
          color: '#000000', // Hardcoded contrastText
          '&:hover': {
            backgroundColor: '#A7F2A7',
          },
        },
        containedError: {
          backgroundColor: '#CF6679', // M3 error color
          color: '#FFFFFF', // Hardcoded contrastText
          '&:hover': {
            backgroundColor: '#FF8A80',
          },
        },
        containedSecondary: {
          backgroundColor: '#B0C4DE', // M3 secondary color
          color: '#000000', // Hardcoded contrastText
          '&:hover': {
            backgroundColor: '#DAE2F0',
          },
        },
        outlined: {
          // For outlined buttons (like Close in dialogs)
          borderColor: '#C9C5CD', // M3 secondary text color for outline
          color: '#C9C5CD',
          '&:hover': {
            borderColor: '#E6E1E5',
            color: '#E6E1E5',
            backgroundColor: 'rgba(230, 225, 229, 0.08)', // OnSurface variant
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', // M3 tabs use Title Case
          color: '#C9C5CD', // Inactive tab text color (M3 on-surface-variant)
          '&.Mui-selected': {
            color: '#9CE0FF', // Active tab text color (M3 primary)
            fontWeight: 500, // M3 tab text weight
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#36343B', // M3 surface color for dialogs
          backgroundImage: 'none',
          borderRadius: '28px', // M3 dialog shape
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)', // Deeper shadow for dialogs
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#E6E1E5', // Consistent title color
          fontWeight: 600,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: '#C9C5CD', // Consistent text color
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text on chips
          margin: '2px',
          borderRadius: '8px', // Slightly rounded chips
          fontWeight: 500,
          backgroundColor: 'rgba(156, 224, 255, 0.1)', // Example base for chips (will be overridden)
        },
        deleteIcon: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.9)',
          },
        },
      },
    },
  },
});

// Unit Conversion Constants
const KG_TO_LBS_FACTOR = 2.20462;
const CM_TO_INCHES_FACTOR = 0.393701;
const INCHES_TO_CM_FACTOR = 2.54;
const FEET_TO_CM_FACTOR = 30.48;

// Local Storage Keys
const LOCAL_STORAGE_KEY = 'dailyFitnessTrackerData';
const SYSTEM_UNIT_KEY = 'unitSystem';
const CUSTOM_SUPPLEMENTS_KEY = 'customSupplements';

// Helper Functions for Data Handling
const convertWeight = (weight, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return weight;
  if (fromUnit === 'kg' && toUnit === 'lbs') return weight * KG_TO_LBS_FACTOR;
  if (fromUnit === 'lbs' && toUnit === 'kg') return weight / KG_TO_LBS_FACTOR;
  return weight;
};

const convertHeightToCm = (heightValue, fromUnit, fromInches = 0) => {
  if (fromUnit === 'cm') return heightValue;
  if (fromUnit === 'inches') return heightValue * INCHES_TO_CM_FACTOR;
  if (fromUnit === 'ft/in') {
    return heightValue * FEET_TO_CM_FACTOR + fromInches * INCHES_TO_CM_FACTOR;
  }
  return heightValue;
};

const convertCmToDisplayHeight = (heightCm, toUnit) => {
  if (toUnit === 'cm') return heightCm;
  if (toUnit === 'inches') return heightCm * CM_TO_INCHES_FACTOR;
  if (toUnit === 'ft/in') {
    const totalInches = heightCm * CM_TO_INCHES_FACTOR;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return { feet: feet, inches: inches };
  }
  return heightCm;
};

const calculateBMI = (weightKg, heightCm) => {
  if (
    weightKg === null ||
    isNaN(weightKg) ||
    heightCm === null ||
    isNaN(heightCm) ||
    heightCm <= 0
  ) {
    return null;
  }
  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(2);
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const workoutSplits = [
  'Chest',
  'Biceps',
  'Back',
  'Triceps',
  'Shoulder',
  'Traps',
  'Forearms',
  'Abs',
  'Legs',
  'Cardio',
  'Rest Day',
  'Other',
];

const painLevels = [
  '1 - None',
  '2 - Very Mild',
  '3 - Mild',
  '4 - Moderate',
  '5 - Annoying',
  '6 - Distracting',
  '7 - Severe',
  '8 - Very Severe',
  '9 - Excruciating',
  '10 - Unbearable',
];

function App() {
  // Use useTheme hook to access the theme object
  const theme = useTheme();

  // Utility function to get color for workout chips
  const getWorkoutColor = useCallback(
    (workoutName) => {
      switch (workoutName) {
        case 'Chest':
          return theme.palette.primary.light;
        case 'Biceps':
          return theme.palette.secondary.light;
        case 'Back':
          return '#D0BCFF'; // Example of a custom M3-like color not directly from palette
        case 'Triceps':
          return '#B3F0E6';
        case 'Shoulder':
          return '#FFE082';
        case 'Traps':
          return theme.palette.error.light;
        case 'Forearms':
          return '#D7C7A2';
        case 'Abs':
          return theme.palette.success.light;
        case 'Legs':
          return '#FFEB99';
        case 'Cardio':
          return '#A6E4FF';
        case 'Rest Day':
          return theme.palette.text.disabled;
        case 'Other':
          return '#B9B6FF';
        default:
          return theme.palette.primary.main;
      }
    },
    [theme]
  ); // Depend on theme

  // Utility function to get color for pain level chips
  const getPainLevelColor = useCallback(
    (painLevel) => {
      const level = parseInt(painLevel.split(' ')[0]);
      if (isNaN(level)) return theme.palette.text.disabled;
      if (level <= 3) return theme.palette.success.main;
      if (level <= 6) return '#FFD180';
      if (level <= 8) return theme.palette.error.light;
      return theme.palette.error.main;
    },
    [theme]
  ); // Depend on theme

  const [currentTab, setCurrentTab] = useState(0); // 0: Entry Form, 1: Summary, 2: Filter, 3: Progress
  const [fitnessEntries, setFitnessEntries] = useState([]);
  const [customSupplements, setCustomSupplements] = useState([]);
  const [unitSystem, setUnitSystem] = useState('metric');
  const [currentEditingIndex, setCurrentEditingIndex] = useState(-1);
  const [isFilteredViewActive, setIsFilteredViewActive] = useState(false);

  // Form State
  const [trackDate, setTrackDate] = useState(getTodayDate());
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [workoutSplit, setWorkoutSplit] = useState([]);
  const [painLevel, setPainLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [formSupplements, setFormSupplements] = useState([]); // State for supplements in the form

  // Filter State
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterWorkout, setFilterWorkout] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  // Supplement Management Dialog State
  const [isManageSupplementsOpen, setIsManageSupplementsOpen] = useState(false);
  const [newSupplementName, setNewSupplementName] = useState('');
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [isConfirmDeleteEntryOpen, setIsConfirmDeleteEntryOpen] =
    useState(false);
  const [entryToDeleteIndex, setEntryToDeleteIndex] = useState(null);
  const [isEntryExistsDialogOpen, setIsEntryExistsDialogOpen] = useState(false);
  const [entryExistsDialogData, setEntryExistsDialogData] = useState(null);
  const [isSimpleAlertDialogOpen, setIsSimpleAlertDialogOpen] = useState(false);
  const [simpleAlertDialogMessage, setSimpleAlertDialogMessage] = useState('');
  const [
    isConfirmDeleteCustomSupplementOpen,
    setIsConfirmDeleteCustomSupplementOpen,
  ] = useState(false); // New state for custom supplement delete confirmation
  const [supplementToDelete, setSupplementToDelete] = useState(''); // State to hold the supplement name to delete

  // LLM Integration State
  const [llmInsight, setLlmInsight] = useState('');
  const [isLlmLoading, setIsLlmLoading] = useState(false);
  const [isInsightDialogOpen, setIsInsightDialogOpen] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        setFitnessEntries(
          parsedEntries.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (e) {
        console.error('Error parsing stored data from localStorage:', e);
        setFitnessEntries([]);
      }
    }

    const storedSupplements = localStorage.getItem(CUSTOM_SUPPLEMENTS_KEY);
    if (storedSupplements) {
      try {
        setCustomSupplements(JSON.parse(storedSupplements));
      } catch (e) {
        console.error('Error parsing custom supplements from localStorage:', e);
        setCustomSupplements(['Protein', 'Creatine', 'EAA']); // Fallback
      }
    } else {
      setCustomSupplements(['Protein', 'Creatine', 'EAA']);
    }

    const savedSystem = localStorage.getItem(SYSTEM_UNIT_KEY) || 'metric';
    setUnitSystem(savedSystem);
  }, []);

  // Effect to update formSupplements when customSupplements change
  useEffect(() => {
    if (currentEditingIndex === -1) {
      setFormSupplements(
        customSupplements.map((name) => ({ name, taken: false, quantity: '' }))
      );
    } else {
      const entry = fitnessEntries[currentEditingIndex];
      const updatedFormSupps = customSupplements.map((supName) => {
        const existingSup = (entry.supplements || []).find(
          (s) => s.name === supName
        );
        return existingSup || { name: supName, taken: false, quantity: '' };
      });
      setFormSupplements(updatedFormSupps);
    }
  }, [customSupplements, unitSystem, currentEditingIndex, fitnessEntries]);

  // Save data to localStorage whenever fitnessEntries or customSupplements change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fitnessEntries));
  }, [fitnessEntries]);

  useEffect(() => {
    localStorage.setItem(
      CUSTOM_SUPPLEMENTS_KEY,
      JSON.stringify(customSupplements)
    );
  }, [customSupplements]);

  // Function to show simple alert dialog
  const showSimpleAlertDialog = useCallback((message) => {
    setSimpleAlertDialogMessage(message);
    setIsSimpleAlertDialogOpen(true);
  }, []);

  const closeSimpleAlertDialog = useCallback(() => {
    setIsSimpleAlertDialogOpen(false);
    setSimpleAlertDialogMessage('');
  }, []);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 3) {
      // Progress tab
      setFilterStartDate('');
      setFilterEndDate('');
      setFilterWorkout('');
      setSortOrder('desc');
      setIsFilteredViewActive(false);
    }
  };

  // Handle Unit System Change
  const handleUnitSystemChange = (event) => {
    const newSystem = event.target.value;
    setUnitSystem(newSystem);
    localStorage.setItem(SYSTEM_UNIT_KEY, newSystem);
    setHeightCm('');
    setHeightFeet('');
    setHeightInches('');
  };

  // Form Submission Handler
  const handleSubmit = (event) => {
    event.preventDefault();

    let weightValue = parseFloat(weight);
    if (isNaN(weightValue)) {
      showSimpleAlertDialog('Please enter a valid weight.');
      return;
    }

    if (unitSystem === 'imperial') {
      weightValue = convertWeight(weightValue, 'lbs', 'kg');
    }

    let heightValue;
    if (unitSystem === 'metric') {
      heightValue = parseFloat(heightCm);
      if (isNaN(heightValue) || heightValue <= 0) {
        showSimpleAlertDialog('Please enter a valid height in centimeters.');
        return;
      }
    } else {
      // imperial
      const feet = parseFloat(heightFeet);
      const inches = parseFloat(heightInches);

      if (isNaN(feet) || isNaN(inches)) {
        showSimpleAlertDialog(
          'Please enter valid values for both feet and inches.'
        );
        return;
      }
      if ((feet === 0 && inches === 0) || feet < 0 || inches < 0) {
        showSimpleAlertDialog('Height must be a positive value.');
        return;
      }
      heightValue = convertHeightToCm(feet, 'ft/in', inches);
    }

    const supplementsTaken = formSupplements.filter((s) => s.taken);

    const newEntryData = {
      date: trackDate,
      weight: weightValue, // Always stored in KG
      height: heightValue, // Always stored in CM
      workoutSplit: workoutSplit,
      painLevel: painLevel,
      notes: notes,
      supplements: supplementsTaken,
    };

    let updatedEntries;
    if (currentEditingIndex > -1) {
      updatedEntries = [...fitnessEntries];
      updatedEntries[currentEditingIndex] = newEntryData;
      setCurrentEditingIndex(-1);
    } else {
      const existingEntryIndex = fitnessEntries.findIndex(
        (entry) => entry.date === newEntryData.date
      );
      if (existingEntryIndex !== -1) {
        setEntryExistsDialogData(newEntryData);
        setIsEntryExistsDialogOpen(true);
        return; // Halt submission until dialog is handled
      } else {
        updatedEntries = [...fitnessEntries, newEntryData];
      }
    }

    setFitnessEntries(
      updatedEntries.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    resetForm();
    setCurrentTab(3); // Go to Progress tab after adding/updating
    setIsFilteredViewActive(false); // Show all entries when navigating to progress after submission
  };

  // Handle dialog for existing entry
  const handleConfirmUpdateExistingEntry = () => {
    const existingEntryIndex = fitnessEntries.findIndex(
      (entry) => entry.date === entryExistsDialogData.date
    );
    if (existingEntryIndex !== -1) {
      const updatedEntries = [...fitnessEntries];
      updatedEntries[existingEntryIndex] = entryExistsDialogData;
      setFitnessEntries(
        updatedEntries.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
    resetForm();
    setCurrentTab(3);
    setIsFilteredViewActive(false);
    setIsEntryExistsDialogOpen(false);
    setEntryExistsDialogData(null);
  };

  const handleCancelUpdateExistingEntry = () => {
    setIsEntryExistsDialogOpen(false);
    setEntryExistsDialogData(null);
  };

  const resetForm = useCallback(() => {
    setTrackDate(getTodayDate());
    setWeight('');
    setHeightCm('');
    setHeightFeet('');
    setHeightInches('');
    setWorkoutSplit([]);
    setPainLevel('');
    setNotes('');
    setFormSupplements(
      customSupplements.map((name) => ({ name, taken: false, quantity: '' }))
    );
    setCurrentEditingIndex(-1);
  }, [customSupplements]);

  const handleEditEntry = useCallback(
    (index) => {
      const entry = fitnessEntries[index];
      setTrackDate(entry.date);
      setWeight(
        convertWeight(
          entry.weight,
          'kg',
          unitSystem === 'metric' ? 'kg' : 'lbs'
        ).toFixed(1)
      );

      if (unitSystem === 'metric') {
        setHeightCm(entry.height ? entry.height.toFixed(1) : '');
      } else {
        const convertedHeight = entry.height
          ? convertCmToDisplayHeight(entry.height, 'ft/in')
          : { feet: '', inches: '' };
        setHeightFeet(convertedHeight.feet);
        setHeightInches(convertedHeight.inches.toFixed(1));
      }

      setWorkoutSplit(entry.workoutSplit || []);
      setPainLevel(entry.painLevel || '');
      setNotes(entry.notes || '');

      // Set form supplements based on entry's supplements combined with all custom ones
      const updatedFormSupps = customSupplements.map((supName) => {
        const existingSup = (entry.supplements || []).find(
          (s) => s.name === supName
        );
        return existingSup || { name: supName, taken: false, quantity: '' };
      });
      setFormSupplements(updatedFormSupps);

      setCurrentEditingIndex(index);
      setCurrentTab(0); // Switch to Entry Form tab
    },
    [fitnessEntries, unitSystem, customSupplements]
  );

  const handleDeleteEntry = useCallback((index) => {
    setEntryToDeleteIndex(index);
    setIsConfirmDeleteEntryOpen(true);
  }, []);

  const confirmDeleteEntry = () => {
    const updatedEntries = fitnessEntries.filter(
      (_, i) => i !== entryToDeleteIndex
    );
    setFitnessEntries(updatedEntries);
    setIsConfirmDeleteEntryOpen(false);
    setEntryToDeleteIndex(null);
    if (currentEditingIndex === entryToDeleteIndex) {
      resetForm();
    } else if (currentEditingIndex > entryToDeleteIndex) {
      setCurrentEditingIndex((prev) => prev - 1);
    }
  };

  const cancelDeleteEntry = () => {
    setIsConfirmDeleteEntryOpen(false);
    setEntryToDeleteIndex(null);
  };

  const handleClearAllData = () => {
    setIsConfirmClearOpen(true);
  };

  const confirmClearAllData = () => {
    setFitnessEntries([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    resetForm();
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterWorkout('');
    setSortOrder('desc');
    setIsFilteredViewActive(false);
    setIsConfirmClearOpen(false);
  };

  const cancelClearAllData = () => {
    setIsConfirmClearOpen(false);
  };

  const handleDownloadCsv = () => {
    if (fitnessEntries.length === 0) {
      showSimpleAlertDialog('No data to download!');
      return;
    }

    const baseHeaders = [
      'Date',
      'Weight (kg)',
      'Height (cm)',
      'BMI',
      'Workout Split',
      'Pain Level',
      'Notes',
    ];
    const supplementHeaders = customSupplements.flatMap((name) => [
      `${name} (Taken)`,
      `${name} (Quantity)`,
    ]);
    let csvContent = headers.join(',') + '\n'; // Corrected variable name

    fitnessEntries.forEach((entry) => {
      const weightInKg = entry.weight.toFixed(1);
      const heightInCm = entry.height ? entry.height.toFixed(1) : '';
      const bmi = calculateBMI(entry.weight, entry.height);
      const workoutSplitCsv = `"${(Array.isArray(entry.workoutSplit)
        ? entry.workoutSplit
        : [entry.workoutSplit]
      )
        .map((s) => s.replace(/"/g, '""'))
        .join(', ')}"`;
      const painLevelCsv = `"${entry.painLevel.replace(/"/g, '""')}"`;
      const notesCsv = entry.notes
        ? `"${entry.notes.replace(/"/g, '""')}"`
        : '';

      const row = [
        entry.date,
        weightInKg,
        heightInCm,
        bmi !== null ? bmi : '',
        workoutSplitCsv,
        painLevelCsv,
        notesCsv,
      ];

      const supplementValues = customSupplements.flatMap((supName) => {
        const sup = (entry.supplements || []).find((s) => s.name === supName);
        return [
          sup && sup.taken ? 'Yes' : 'No',
          sup && sup.taken && sup.quantity
            ? `"${sup.quantity.replace(/"/g, '""')}"`
            : '',
        ];
      });

      csvContent += [...row, ...supplementValues].join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'fitness_tracker.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showSimpleAlertDialog(
        'Your browser does not support downloading files directly. Please copy the data manually.'
      );
    }
  };

  // --- Summary Statistics Calculation ---
  const calculateStatistics = useCallback(() => {
    if (fitnessEntries.length === 0) {
      return {
        totalEntries: 0,
        avgWeight: 'N/A',
        avgBMI: 'N/A',
        mostFrequentWorkout: 'N/A',
        avgPainLevel: 'N/A',
        supplementFrequencies: {},
      };
    }

    const currentWeightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';

    const totalWeight = fitnessEntries.reduce((sum, entry) => {
      return sum + convertWeight(entry.weight, 'kg', currentWeightUnit);
    }, 0);
    const avgWeight = `${(totalWeight / fitnessEntries.length).toFixed(
      1
    )} ${currentWeightUnit}`;

    let totalBMI = 0;
    let bmiCount = 0;
    fitnessEntries.forEach((entry) => {
      const bmi = calculateBMI(entry.weight, entry.height);
      if (bmi !== null) {
        totalBMI += parseFloat(bmi);
        bmiCount++;
      }
    });
    const avgBMI = bmiCount > 0 ? (totalBMI / bmiCount).toFixed(2) : 'N/A';

    const workoutCounts = {};
    fitnessEntries.forEach((entry) => {
      (Array.isArray(entry.workoutSplit)
        ? entry.workoutSplit
        : [entry.workoutSplit]
      ).forEach((split) => {
        workoutCounts[split] = (workoutCounts[split] || 0) + 1;
      });
    });
    let mostFrequentWorkout = 'N/A';
    let maxCount = 0;
    for (const split in workoutCounts) {
      if (workoutCounts[split] > maxCount) {
        maxCount = workoutCounts[split];
        mostFrequentWorkout = split;
      }
    }

    const totalPain = fitnessEntries.reduce((sum, entry) => {
      const painValue = parseInt(entry.painLevel.split(' ')[0]);
      return sum + (isNaN(painValue) ? 0 : painValue);
    }, 0);
    const avgPainLevel = `${(totalPain / fitnessEntries.length).toFixed(1)}`;

    const supplementCounts = {};
    customSupplements.forEach((supName) => (supplementCounts[supName] = 0));
    fitnessEntries.forEach((entry) => {
      (entry.supplements || []).forEach((sup) => {
        if (sup.taken && supplementCounts.hasOwnProperty(sup.name)) {
          supplementCounts[sup.name]++;
        }
      });
    });

    const supplementFrequencies = {};
    for (const supName in supplementCounts) {
      const freq = (
        (supplementCounts[supName] / fitnessEntries.length) *
        100
      ).toFixed(0);
      supplementFrequencies[supName] = `${freq}%`;
    }

    return {
      totalEntries: fitnessEntries.length,
      avgWeight,
      avgBMI,
      mostFrequentWorkout,
      avgPainLevel,
      supplementFrequencies,
    };
  }, [fitnessEntries, customSupplements, unitSystem]);

  const stats = calculateStatistics();

  // --- Filtered and Sorted Entries for Progress Tab ---
  const filteredAndSortedEntries = useCallback(() => {
    let entriesToRender = fitnessEntries;

    if (isFilteredViewActive) {
      entriesToRender = fitnessEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0); // Normalize to start of day

        const startDateInput = filterStartDate;
        const endDateInput = filterEndDate;
        const workoutFilter = filterWorkout;

        let dateMatch = true;
        if (startDateInput) {
          const startDate = new Date(startDateInput);
          startDate.setHours(0, 0, 0, 0);
          if (entryDate < startDate) dateMatch = false;
        }
        if (endDateInput) {
          const endDate = new Date(endDateInput);
          endDate.setHours(0, 0, 0, 0);
          endDate.setDate(endDate.getDate() + 1); // Exclusive of next day
          if (entryDate >= endDate) dateMatch = false;
        }

        let workoutMatch = true;
        if (workoutFilter && !entry.workoutSplit.includes(workoutFilter))
          workoutMatch = false;

        return dateMatch && workoutMatch;
      });
    }

    return [...entriesToRender].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [
    fitnessEntries,
    isFilteredViewActive,
    filterStartDate,
    filterEndDate,
    filterWorkout,
    sortOrder,
  ]);

  const entriesToDisplay = filteredAndSortedEntries();

  // --- Supplement Management Handlers ---
  const handleAddSupplement = () => {
    const name = newSupplementName.trim();
    if (name && !customSupplements.includes(name)) {
      setCustomSupplements((prev) => [...prev, name]);
      setNewSupplementName('');
    } else if (name) {
      showSimpleAlertDialog('This supplement name already exists!');
    }
  };

  const handleDeleteCustomSupplement = (nameToDelete) => {
    setSupplementToDelete(nameToDelete);
    setIsConfirmDeleteCustomSupplementOpen(true);
  };

  const confirmDeleteCustomSupplement = () => {
    setCustomSupplements((prev) =>
      prev.filter((name) => name !== supplementToDelete)
    );
    setIsConfirmDeleteCustomSupplementOpen(false);
    setSupplementToDelete('');
  };

  const cancelDeleteCustomSupplement = () => {
    setIsConfirmDeleteCustomSupplementOpen(false);
    setSupplementToDelete('');
  };

  const handleSupplementCheckboxChange = (name, checked) => {
    setFormSupplements((prev) =>
      prev.map((sup) => (sup.name === name ? { ...sup, taken: checked } : sup))
    );
  };

  const handleSupplementQuantityChange = (name, quantity) => {
    setFormSupplements((prev) =>
      prev.map((sup) =>
        sup.name === name ? { ...sup, quantity: quantity } : sup
      )
    );
  };

  // --- Gemini API Integration for Fitness Insights ---
  const fetchFitnessInsight = async () => {
    if (fitnessEntries.length === 0) {
      showSimpleAlertDialog('Please add some fitness entries to get insights!');
      return;
    }

    setIsLlmLoading(true);
    setLlmInsight('');
    setIsInsightDialogOpen(true);

    const prompt = `
      Analyze the following fitness data and provide a concise summary of progress, identify any noticeable trends (positive or negative), and suggest general areas for focus or improvement based on this data. Keep the response encouraging and actionable.

      User's unit system: ${unitSystem}

      Fitness Entries:
      ${fitnessEntries
        .map((entry) => {
          const displayWeight = convertWeight(
            entry.weight,
            'kg',
            unitSystem === 'metric' ? 'kg' : 'lbs'
          ).toFixed(1);
          let displayHeight = '';
          if (unitSystem === 'metric') {
            displayHeight = entry.height
              ? `${entry.height.toFixed(1)} cm`
              : 'N/A';
          } else {
            const convertedHeight = entry.height
              ? convertCmToDisplayHeight(entry.height, 'ft/in')
              : { feet: '', inches: '' };
            displayHeight = entry.height
              ? `${convertedHeight.feet}' ${convertedHeight.inches.toFixed(
                  1
                )}''`
              : 'N/A';
          }
          const workoutSplitDisplay = Array.isArray(entry.workoutSplit)
            ? entry.workoutSplit.join(', ')
            : entry.workoutSplit;
          const supplementsDisplay =
            (entry.supplements || [])
              .filter((s) => s.taken)
              .map((s) => (s.quantity ? `${s.name} (${s.quantity})` : s.name))
              .join(', ') || 'None';
          return `Date: ${entry.date}, Weight: ${displayWeight} ${
            unitSystem === 'metric' ? 'kg' : 'lbs'
          }, Height: ${displayHeight}, Workout: ${workoutSplitDisplay}, Pain Level: ${
            entry.painLevel
          }, Supplements: ${supplementsDisplay}, Notes: ${
            entry.notes || 'None'
          }`;
        })
        .join('\n')}

      Overall Statistics:
      Total Entries: ${stats.totalEntries}
      Average Weight: ${stats.avgWeight}
      Average BMI: ${stats.avgBMI}
      Most Frequent Workout: ${stats.mostFrequentWorkout}
      Average Pain Level: ${stats.avgPainLevel}
      Supplement Frequencies: ${Object.entries(stats.supplementFrequencies)
        .map(([name, freq]) => `${name}: ${freq}`)
        .join(', ')}

      Provide the analysis in a friendly tone.
    `;

    try {
      let chatHistory = [];
      chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ''; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        setLlmInsight(result.candidates[0].content.parts[0].text);
      } else {
        console.error('Unexpected response structure from Gemini API:', result);
        setLlmInsight(
          "Sorry, I couldn't generate insights at this moment. Please try again later."
        );
      }
    } catch (error) {
      console.error('Error fetching fitness insight from Gemini API:', error);
      setLlmInsight(
        'There was an error connecting to the insight service. Please check your network connection or try again later.'
      );
    } finally {
      setIsLlmLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 1px, transparent 1px, transparent 20px)', // Darker background pattern
          backgroundSize: '20px 20px',
          opacity: 1,
          zIndex: -1,
          backgroundColor: '#000000', // Ensuring solid black background behind the pattern
        }}
      />
      <Container
        maxWidth='md'
        sx={{ my: 4, p: 4, borderRadius: '28px' }}
        component={Paper}
      >
        {' '}
        {/* M3 border radius */}
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <FormControl component='fieldset'>
            <RadioGroup
              row
              value={unitSystem}
              onChange={handleUnitSystemChange}
            >
              <FormControlLabel
                value='metric'
                control={<Radio />}
                label='Metric'
              />
              <FormControlLabel
                value='imperial'
                control={<Radio />}
                label='Imperial'
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Daily Fitness Tracker
        </Typography>
        <AppBar
          position='static'
          color='transparent'
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', mb: 3 }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label='fitness tracker tabs'
            centered
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.primary.main },
            }}
          >
            <Tab label='Entry Form' />
            <Tab label='Summary' />
            <Tab label='Filter & Sort' />
            <Tab label='Progress' />
          </Tabs>
        </AppBar>
        {/* Tab Content */}
        {currentTab === 0 && (
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3} direction='column'>
              {' '}
              {/* Explicitly set direction to column */}
              {/* Section 1: Date, Weight, Height */}
              <Grid item xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  Date, Weight & Height
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(60, 60, 65, 0.6)',
                    borderRadius: '16px',
                  }}
                >
                  {' '}
                  {/* M3 surface variant */}
                  <Grid container spacing={2}>
                    {' '}
                    {/* Inner grid for this section */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label='Date'
                        type='date'
                        fullWidth
                        required
                        value={trackDate}
                        onChange={(e) => setTrackDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={`Weight (${
                          unitSystem === 'metric' ? 'kg' : 'lbs'
                        })`}
                        type='number'
                        step='0.1'
                        fullWidth
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={
                          unitSystem === 'metric' ? 'e.g., 75.5' : 'e.g., 165.0'
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {' '}
                      {/* Always full width for height */}
                      {unitSystem === 'metric' ? (
                        <TextField
                          label={`Height (cm)`}
                          type='number'
                          step='0.1'
                          fullWidth
                          required
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value)}
                          placeholder='e.g., 175.0'
                          InputLabelProps={{ shrink: true }}
                        />
                      ) : (
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label='Height (ft)'
                              type='number'
                              step='1'
                              fullWidth
                              required
                              value={heightFeet}
                              onChange={(e) => setHeightFeet(e.target.value)}
                              placeholder='e.g., 5'
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label='Height (in)'
                              type='number'
                              step='0.1'
                              fullWidth
                              required
                              value={heightInches}
                              onChange={(e) => setHeightInches(e.target.value)}
                              placeholder='e.g., 9'
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Section 2: Workout Split and Pain Level */}
              <Grid item xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  Workout & Pain
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(60, 60, 65, 0.6)',
                    borderRadius: '16px',
                  }}
                >
                  {' '}
                  {/* M3 surface variant */}
                  <Grid container spacing={2}>
                    {' '}
                    {/* Inner grid for this section */}
                    <Grid item xs={12}>
                      {' '}
                      {/* This makes both take full width */}
                      <FormControl fullWidth required sx={{ minWidth: 250 }}>
                        {' '}
                        {/* Added minWidth */}
                        <InputLabel id='workout-split-label'>
                          Workout Split (Select multiple)
                        </InputLabel>
                        <Select
                          labelId='workout-split-label'
                          multiple
                          value={workoutSplit}
                          onChange={(e) => setWorkoutSplit(e.target.value)}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  onDelete={() =>
                                    setWorkoutSplit(
                                      workoutSplit.filter(
                                        (item) => item !== value
                                      )
                                    )
                                  }
                                  onMouseDown={(event) => {
                                    // Prevent opening the dropdown when clicking the delete icon
                                    event.stopPropagation();
                                  }}
                                  sx={{
                                    backgroundColor: getWorkoutColor(value),
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          label='Workout Split (Select multiple)'
                          sx={{
                            minHeight: '56px',
                            '.MuiSelect-select': {
                              paddingTop: '16.5px',
                              paddingBottom: '16.5px',
                            },
                          }}
                        >
                          {workoutSplits.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox
                                checked={workoutSplit.indexOf(option) > -1}
                              />
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {' '}
                      {/* This makes both take full width */}
                      <FormControl fullWidth required sx={{ minWidth: 250 }}>
                        {' '}
                        {/* Added minWidth */}
                        <InputLabel id='pain-level-label'>
                          Pain Level (1-10)
                        </InputLabel>
                        <Select
                          labelId='pain-level-label'
                          value={painLevel}
                          onChange={(e) => setPainLevel(e.target.value)}
                          renderValue={(selected) =>
                            selected ? (
                              <Chip
                                label={selected}
                                onDelete={() => setPainLevel('')} // Clear selection when chip is deleted
                                onMouseDown={(event) => {
                                  event.stopPropagation();
                                }}
                                sx={{
                                  backgroundColor: getPainLevelColor(selected),
                                }}
                              />
                            ) : (
                              <Typography
                                variant='body1'
                                sx={{ color: 'text.disabled' }}
                              >
                                Select Level
                              </Typography>
                            )
                          }
                          label='Pain Level (1-10)'
                          sx={{
                            minHeight: '56px',
                            '.MuiSelect-select': {
                              paddingTop: '16.5px',
                              paddingBottom: '16.5px',
                            },
                          }}
                        >
                          <MenuItem value=''>Select Level</MenuItem>
                          {painLevels.map((level) => (
                            <MenuItem key={level} value={level}>
                              {level}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Section 3: Supplements Options */}
              <Grid item xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  Supplements
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(60, 60, 65, 0.6)',
                    borderRadius: '16px',
                  }}
                >
                  {' '}
                  {/* M3 surface variant */}
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={1}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{ color: 'text.secondary', flexGrow: 1 }}
                    >
                      Supplements:
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: theme.palette.secondary.main, // M3 secondary color for this button
                        color: theme.palette.secondary.contrastText,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.light,
                        },
                      }}
                      onClick={() => setIsManageSupplementsOpen(true)}
                    >
                      Manage Supplements
                    </Button>
                  </Box>
                  <Grid container spacing={1}>
                    {formSupplements.map((sup, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box display='flex' alignItems='center'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={sup.taken}
                                onChange={(e) =>
                                  handleSupplementCheckboxChange(
                                    sup.name,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={
                              <Typography sx={{ color: 'text.secondary' }}>
                                {sup.name}
                              </Typography>
                            }
                          />
                          {sup.taken && (
                            <TextField
                              size='small'
                              placeholder='Quantity'
                              value={sup.quantity}
                              onChange={(e) =>
                                handleSupplementQuantityChange(
                                  sup.name,
                                  e.target.value
                                )
                              }
                              sx={{ ml: 1, flexGrow: 1 }}
                            />
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              {/* Section 4: Notes Field and Add Entry Button */}
              <Grid item xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  Notes
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(60, 60, 65, 0.6)',
                    borderRadius: '16px',
                  }}
                >
                  {' '}
                  {/* M3 surface variant */}
                  <TextField
                    label='Notes'
                    multiline
                    rows={3}
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Paper>
              </Grid>
              {/* Form Action Buttons (now part of Section 4's grid item) */}
              <Grid
                item
                xs={12}
                display='flex'
                justifyContent='flex-end'
                gap={2}
              >
                {currentEditingIndex > -1 && (
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button type='submit' variant='contained' color='primary'>
                  {currentEditingIndex > -1 ? 'Update Entry' : 'Add Entry'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        {currentTab === 1 && (
          <Box sx={{ mt: 2, p: 4 }} component={Paper} elevation={0}>
            {' '}
            {/* Paper elevation 0 for content area */}
            <Typography variant='h5' align='center' gutterBottom>
              Summary Statistics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2'>
                  <strong>Total Entries:</strong> {stats.totalEntries}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2'>
                  <strong>Average Weight:</strong> {stats.avgWeight}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2'>
                  <strong>Average BMI:</strong> {stats.avgBMI}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2'>
                  <strong>Most Frequent Workout:</strong>{' '}
                  {stats.mostFrequentWorkout}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body2'>
                  <strong>Avg Pain Level:</strong> {stats.avgPainLevel}
                </Typography>
              </Grid>
              {Object.entries(stats.supplementFrequencies).map(
                ([name, freq]) => (
                  <Grid item xs={12} sm={6} md={4} key={name}>
                    <Typography variant='body2'>
                      <strong>{name} Taken:</strong> {freq}
                    </Typography>
                  </Grid>
                )
              )}
            </Grid>
            <Box display='flex' justifyContent='center' mt={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={fetchFitnessInsight}
                startIcon={<PsychologyIcon />}
                disabled={isLlmLoading || fitnessEntries.length === 0}
              >
                {isLlmLoading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Get Fitness Insights ✨'
                )}
              </Button>
            </Box>
          </Box>
        )}
        {currentTab === 2 && (
          <Box sx={{ mt: 2, p: 4 }} component={Paper} elevation={0}>
            {' '}
            {/* Paper elevation 0 for content area */}
            <Typography variant='h5' align='center' gutterBottom>
              Filter & Sort Entries
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Start Date'
                  type='date'
                  fullWidth
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label='End Date'
                  type='date'
                  fullWidth
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required sx={{ minWidth: 200 }}>
                  <InputLabel id='filter-workout-label'>
                    Filter Workout
                  </InputLabel>
                  <Select
                    labelId='filter-workout-label'
                    value={filterWorkout}
                    onChange={(e) => setFilterWorkout(e.target.value)}
                    label='Filter Workout'
                    renderValue={(selected) =>
                      selected ? (
                        <Chip
                          label={selected}
                          sx={{ backgroundColor: getWorkoutColor(selected) }}
                        />
                      ) : (
                        'All Workouts'
                      )
                    }
                    sx={{
                      minHeight: '56px',
                      '.MuiSelect-select': {
                        paddingTop: '16.5px',
                        paddingBottom: '16.5px',
                      },
                    }}
                  >
                    <MenuItem value=''>All Workouts</MenuItem>
                    {workoutSplits.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='center' gap={2}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    setIsFilteredViewActive(true);
                    setCurrentTab(3);
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    setFilterStartDate('');
                    setFilterEndDate('');
                    setFilterWorkout('');
                    setSortOrder('desc');
                    setIsFilteredViewActive(false);
                    setCurrentTab(3);
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControl fullWidth required sx={{ minWidth: 200 }}>
                  <InputLabel id='sort-order-label'>Sort By Date</InputLabel>
                  <Select
                    labelId='sort-order-label'
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label='Sort By Date'
                    sx={{
                      minHeight: '56px',
                      '.MuiSelect-select': {
                        paddingTop: '16.5px',
                        paddingBottom: '16.5px',
                      },
                    }}
                  >
                    <MenuItem value='desc'>Newest First</MenuItem>
                    <MenuItem value='asc'>Oldest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
        {currentTab === 3 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant='h5' align='center' gutterBottom>
              Your Progress
            </Typography>
            {entriesToDisplay.length === 0 ? (
              <Typography
                variant='body1'
                align='center'
                sx={{ color: 'text.disabled', mt: 3 }}
              >
                No entries yet. Add one above!
              </Typography>
            ) : (
              <List
                sx={{
                  '& > div': {
                    mb: 2,
                    p: 2,
                    borderRadius: '16px',
                    backgroundColor: 'rgba(60, 60, 65, 0.6)',
                  },
                  mt: 3,
                }}
              >
                {' '}
                {/* M3 surface variant */}
                {entriesToDisplay.map((entry, index) => {
                  const displayWeight = convertWeight(
                    entry.weight,
                    'kg',
                    unitSystem === 'metric' ? 'kg' : 'lbs'
                  ).toFixed(1);
                  let displayHeight = 'N/A';
                  if (entry.height) {
                    if (unitSystem === 'metric') {
                      displayHeight = `${entry.height.toFixed(1)} cm`;
                    } else {
                      const convertedHeight = convertCmToDisplayHeight(
                        entry.height,
                        'ft/in'
                      );
                      displayHeight = `${
                        convertedHeight.feet
                      }' ${convertedHeight.inches.toFixed(1)}''`;
                    }
                  }
                  const bmi = calculateBMI(entry.weight, entry.height);
                  const workoutSplitDisplay = Array.isArray(entry.workoutSplit)
                    ? entry.workoutSplit.join(', ')
                    : entry.workoutSplit;

                  let supplementsDisplay = 'None';
                  if (entry.supplements && entry.supplements.length > 0) {
                    const takenSupplements = entry.supplements.filter(
                      (s) => s.taken
                    );
                    if (takenSupplements.length > 0) {
                      supplementsDisplay = takenSupplements
                        .map((s) => {
                          return s.quantity
                            ? `${s.name} (${s.quantity})`
                            : s.name;
                        })
                        .join(', ');
                    }
                  }

                  return (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        borderRadius: '16px',
                        backgroundColor: theme.palette.background.paper,
                      }}
                    >
                      <ListItem alignItems='flex-start'>
                        <ListItemText
                          primary={
                            <Box
                              display='flex'
                              justifyContent='space-between'
                              alignItems='center'
                            >
                              <Typography
                                variant='h6'
                                sx={{ color: 'text.primary' }}
                              >
                                {entry.date}
                              </Typography>
                              <Typography
                                variant='body2'
                                sx={{ color: 'text.secondary' }}
                              >
                                Weight: {displayWeight}{' '}
                                {unitSystem === 'metric' ? 'kg' : 'lbs'}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.secondary'
                                display='block'
                              >
                                <strong>Height:</strong> {displayHeight}
                              </Typography>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.secondary'
                                display='block'
                              >
                                <strong>BMI:</strong>{' '}
                                {bmi !== null ? bmi : 'N/A'}
                              </Typography>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.secondary'
                                display='block'
                              >
                                <strong>Workout:</strong> {workoutSplitDisplay}
                              </Typography>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.secondary'
                                display='block'
                              >
                                <strong>Pain Level:</strong> {entry.painLevel}
                              </Typography>
                              <Typography
                                component='span'
                                variant='body2'
                                color='text.secondary'
                                display='block'
                              >
                                <strong>Supplements:</strong>{' '}
                                {supplementsDisplay}
                              </Typography>
                              {entry.notes && (
                                <Typography
                                  component='span'
                                  variant='body2'
                                  color='text.secondary'
                                  display='block'
                                  sx={{ whiteSpace: 'pre-wrap' }}
                                >
                                  <strong>Notes:</strong> {entry.notes}
                                </Typography>
                              )}
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge='end'
                            aria-label='edit'
                            onClick={() => handleEditEntry(index)}
                          >
                            <EditIcon
                              sx={{ color: theme.palette.secondary.main }}
                            />
                          </IconButton>
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => handleDeleteEntry(index)}
                          >
                            <DeleteIcon
                              sx={{ color: theme.palette.error.main }}
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Paper>
                  );
                })}
              </List>
            )}
            <Box display='flex' justifyContent='center' gap={2} mt={4}>
              <Button
                variant='contained'
                color='success'
                onClick={handleDownloadCsv}
              >
                Download as CSV
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleClearAllData}
              >
                Clear All Data
              </Button>
            </Box>
          </Box>
        )}
        {/* Supplement Management Dialog */}
        <Dialog
          open={isManageSupplementsOpen}
          onClose={() => setIsManageSupplementsOpen(false)}
        >
          <DialogTitle>Manage Custom Supplements</DialogTitle>
          <DialogContent>
            <Box display='flex' gap={1} mb={2}>
              <TextField
                autoFocus
                margin='dense'
                label='New supplement name'
                fullWidth
                value={newSupplementName}
                onChange={(e) => setNewSupplementName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSupplement();
                    e.preventDefault();
                  }
                }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddSupplement}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
            <List>
              {customSupplements.length === 0 ? (
                <Typography
                  variant='body2'
                  align='center'
                  sx={{ color: 'text.disabled', mt: 2 }}
                >
                  No custom supplements added yet.
                </Typography>
              ) : (
                customSupplements.map((name, index) => (
                  <ListItem
                    key={name}
                    sx={{
                      bgcolor: theme.palette.background.default,
                      mb: 1,
                      borderRadius: '12px',
                    }}
                  >
                    {' '}
                    {/* M3 surface shape */}
                    <ListItemText
                      primary={name}
                      sx={{ color: 'text.primary' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDeleteCustomSupplement(name)}
                      >
                        <DeleteIcon sx={{ color: theme.palette.error.main }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsManageSupplementsOpen(false)}
              variant='outlined'
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* Confirmation Dialog for Clear All Data */}
        <Dialog
          open={isConfirmClearOpen}
          onClose={cancelClearAllData}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Confirm Clear All Data'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete ALL your fitness data? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelClearAllData} color='secondary' autoFocus>
              Cancel
            </Button>
            <Button onClick={confirmClearAllData} color='error'>
              Delete All
            </Button>
          </DialogActions>
        </Dialog>
        {/* Confirmation Dialog for Delete Single Entry */}
        <Dialog
          open={isConfirmDeleteEntryOpen}
          onClose={cancelDeleteEntry}
          aria-labelledby='delete-entry-dialog-title'
          aria-describedby='delete-entry-dialog-description'
        >
          <DialogTitle id='delete-entry-dialog-title'>
            {'Confirm Delete Entry'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='delete-entry-dialog-description'>
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDeleteEntry} color='secondary' autoFocus>
              Cancel
            </Button>
            <Button onClick={confirmDeleteEntry} color='error'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* Confirmation Dialog for Delete Custom Supplement */}
        <Dialog
          open={isConfirmDeleteCustomSupplementOpen}
          onClose={cancelDeleteCustomSupplement}
          aria-labelledby='delete-custom-supplement-dialog-title'
          aria-describedby='delete-custom-supplement-dialog-description'
        >
          <DialogTitle id='delete-custom-supplement-dialog-title'>
            {'Confirm Delete Supplement'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='delete-custom-supplement-dialog-description'>
              Are you sure you want to remove "{supplementToDelete}" from your
              custom supplements? This will not remove it from existing entries.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={cancelDeleteCustomSupplement}
              color='secondary'
              autoFocus
            >
              Cancel
            </Button>
            <Button onClick={confirmDeleteCustomSupplement} color='error'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for existing entry (new for M3) */}
        <Dialog
          open={isEntryExistsDialogOpen}
          onClose={handleCancelUpdateExistingEntry}
          aria-labelledby='entry-exists-dialog-title'
          aria-describedby='entry-exists-dialog-description'
        >
          <DialogTitle id='entry-exists-dialog-title'>
            {'Entry Already Exists'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='entry-exists-dialog-description'>
              An entry for {entryExistsDialogData?.date} already exists. Do you
              want to update it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelUpdateExistingEntry} color='secondary'>
              No, Keep Both
            </Button>
            <Button
              onClick={handleConfirmUpdateExistingEntry}
              color='primary'
              autoFocus
            >
              Yes, Update
            </Button>
          </DialogActions>
        </Dialog>
        {/* Simple Alert Dialog (new for M3) */}
        <Dialog
          open={isSimpleAlertDialogOpen}
          onClose={closeSimpleAlertDialog}
          aria-labelledby='simple-alert-dialog-title'
          aria-describedby='simple-alert-dialog-description'
        >
          <DialogTitle id='simple-alert-dialog-title'>{'Alert'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='simple-alert-dialog-description'>
              {simpleAlertDialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSimpleAlertDialog} color='primary' autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for Fitness Insights */}
        <Dialog
          open={isInsightDialogOpen}
          onClose={() => setIsInsightDialogOpen(false)}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Fitness Insights from Gemini ✨</DialogTitle>
          <DialogContent dividers>
            {isLlmLoading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='150px'
              >
                <CircularProgress />
                <Typography variant='body1' sx={{ ml: 2 }}>
                  Generating insights...
                </Typography>
              </Box>
            ) : llmInsight ? (
              <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
                {llmInsight}
              </Typography>
            ) : (
              <Typography variant='body1' color='error'>
                Could not retrieve insights.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsInsightDialogOpen(false)}
              color='primary'
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      {/* Footer added at the bottom */}
      <Box
        sx={{
          mt: 4,
          py: 2,
          backgroundColor: 'rgba(26, 32, 44, 0.7)',
          textAlign: 'center',
          borderRadius: '10px', // Smaller radius for footer
          maxWidth: 'md',
          mx: 'auto',
          color: 'text.secondary',
        }}
      >
        <Typography variant='body2'>
          Made with ❤️ by{' '}
          <a
            href='https://portfolio-eta-seven-57.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Shamsul Arifin
          </a>
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
