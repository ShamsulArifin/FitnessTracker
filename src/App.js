import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
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
} from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// Changed import for CloseIcon
import { Close as CloseIcon } from '@mui/icons-material';
import PsychologyIcon from '@mui/icons-material/Psychology'; // For the Gemini API button
import BrushIcon from '@mui/icons-material/Brush'; // Changed from SettingsIcon

// Recharts imports for the graph
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// --- THEME DEFINITIONS ---
// Define multiple themes
const themes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#9CE0FF',
        light: '#C7EEFF',
        dark: '#006494',
        contrastText: '#000000',
      },
      secondary: {
        main: '#B0C4DE',
        light: '#DAE2F0',
        dark: '#4A5C6F',
        contrastText: '#000000',
      },
      error: {
        main: '#CF6679',
        light: '#FF8A80',
        dark: '#B00020',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#80E280',
        light: '#A7F2A7',
        dark: '#008000',
        contrastText: '#000000',
      },
      background: { default: '#000000', paper: '#2F2E31' }, // Main container background
      text: { primary: '#E6E1E5', secondary: '#A8A3AB', disabled: '#938F99' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
            borderRadius: '28px',
            backgroundColor: '#3A3740', // Adjusted to a more opaque, slightly different dark background for sections
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: '#4C4952',
            color: '#E6E1E5',
            borderRadius: '16px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(197, 198, 201, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(197, 198, 201, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9CE0FF',
            },
            '& input[type="date"]': { colorScheme: 'dark' },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#C9C5CD',
            '&.Mui-focused': { color: '#9CE0FF' },
            '&.Mui-disabled': { color: '#938F99' },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: '#4C4952',
            color: '#E6E1E5',
            borderRadius: '16px',
          },
          icon: { color: '#E6E1E5' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#938F99', '&.Mui-checked': { color: '#9CE0FF' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#938F99', '&.Mui-checked': { color: '#9CE0FF' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#9CE0FF',
            color: '#000000',
            '&:hover': { backgroundColor: '#C7EEFF' },
          },
          containedSuccess: {
            backgroundColor: '#80E280',
            color: '#000000',
            '&:hover': { backgroundColor: '#A7F2A7' },
          },
          containedError: {
            backgroundColor: '#CF6679',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#FF8A80' },
          },
          containedSecondary: {
            backgroundColor: '#B0C4DE',
            color: '#000000',
            '&:hover': { backgroundColor: '#DAE2F0' },
          },
          outlined: {
            borderColor: '#C9C5CD',
            color: '#C9C5CD',
            '&:hover': {
              borderColor: '#E6E1E5',
              color: '#E6E1E5',
              backgroundColor: 'rgba(230, 225, 229, 0.08)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#C9C5CD',
            '&.Mui-selected': { color: '#9CE0FF', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#36343B',
            backgroundImage: 'none',
            borderRadius: '28px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#E6E1E5', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#C9C5CD' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(156, 224, 255, 0.1)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),

  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#6200EE',
        light: '#9D46FF',
        dark: '#0057B7',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#03DAC6',
        light: '#66FFF9',
        dark: '#00A89A',
        contrastText: '#000000',
      },
      error: {
        main: '#B00020',
        light: '#E57373',
        dark: '#7F0000',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
      },
      background: { default: '#F5F5F5', paper: '#FFFFFF' },
      text: { primary: '#212121', secondary: '#757575', disabled: '#BDBDBD' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '28px',
            backgroundColor: '#FFFFFF',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: '#F5F5F5',
            color: '#212121',
            borderRadius: '16px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6200EE',
            },
            '& input[type="date"]': { colorScheme: 'light' },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-focused': { color: '#6200EE' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: '#F5F5F5',
            color: '#212121',
            borderRadius: '16px',
          },
          icon: { color: '#757575' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-checked': { color: '#6200EE' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-checked': { color: '#6200EE' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#6200EE',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#7F39FB' },
          },
          containedSuccess: {
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#66BB6A' },
          },
          containedError: {
            backgroundColor: '#B00020',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#D32F2F' },
          },
          containedSecondary: {
            backgroundColor: '#03DAC6',
            color: '#000000',
            '&:hover': { backgroundColor: '#00C8AF' },
          },
          outlined: {
            borderColor: '#757575',
            color: '#757575',
            '&:hover': {
              borderColor: '#212121',
              color: '#212121',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#757575',
            '&.Mui-selected': { color: '#6200EE', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderRadius: '28px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#212121', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#757575' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#212121',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(98, 0, 238, 0.1)',
          },
          deleteIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': { color: 'rgba(0, 0, 0, 0.87)' },
          },
        },
      },
    },
  }),

  ocean: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#81D4FA',
        light: '#B2EBF2',
        dark: '#00A1C1',
        contrastText: '#000000',
      },
      secondary: {
        main: '#B39DDB',
        light: '#D1C4E9',
        dark: '#6D4C41',
        contrastText: '#000000',
      },
      error: {
        main: '#EF9A9A',
        light: '#FFCDD2',
        dark: '#D32F2F',
        contrastText: '#000000',
      },
      success: {
        main: '#A5D6A7',
        light: '#C8E6C9',
        dark: '#66BB6A',
        contrastText: '#000000',
      },
      background: { default: '#0D47A1', paper: '#1976D2' }, // Deeper blues
      text: { primary: '#E0F2F7', secondary: '#BBDEFB', disabled: '#90CAF9' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
            backgroundColor: 'rgba(25, 118, 210, 0.7)', // Primary dark blue with transparency
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(30, 136, 229, 0.6)', // Slightly lighter primary blue with transparency
            color: '#E0F2F7',
            borderRadius: '12px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#81D4FA',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#BBDEFB', '&.Mui-focused': { color: '#81D4FA' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: 'rgba(30, 136, 229, 0.6)',
            color: '#E0F2F7',
            borderRadius: '12px',
          },
          icon: { color: '#E0F2F7' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#90CAF9', '&.Mui-checked': { color: '#81D4FA' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#90CAF9', '&.Mui-checked': { color: '#81D4FA' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#81D4FA',
            color: '#000000',
            '&:hover': { backgroundColor: '#B2EBF2' },
          },
          containedSuccess: {
            backgroundColor: '#A5D6A7',
            color: '#000000',
            '&:hover': { backgroundColor: '#C8E6C9' },
          },
          containedError: {
            backgroundColor: '#EF9A9A',
            color: '#000000',
            '&:hover': { backgroundColor: '#FFCDD2' },
          },
          containedSecondary: {
            backgroundColor: '#B39DDB',
            color: '#000000',
            '&:hover': { backgroundColor: '#D1C4E9' },
          },
          outlined: {
            borderColor: '#BBDEFB',
            color: '#BBDEFB',
            '&:hover': {
              borderColor: '#E0F2F7',
              color: '#E0F2F7',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#BBDEFB',
            '&.Mui-selected': { color: '#81D4FA', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#1565C0',
            backgroundImage: 'none',
            borderRadius: '20px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#E0F2F7', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#BBDEFB' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '6px',
            fontWeight: 500,
            backgroundColor: 'rgba(129, 212, 250, 0.2)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),

  forest: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#A8E6CF',
        light: '#D2F8D2',
        dark: '#70C09E',
        contrastText: '#000000',
      },
      secondary: {
        main: '#DCDCDC',
        light: '#EDEDED',
        dark: '#A9A9A9',
        contrastText: '#000000',
      },
      error: {
        main: '#F48FB1',
        light: '#FFCDD2',
        dark: '#C2185B',
        contrastText: '#000000',
      },
      success: {
        main: '#8BC34A',
        light: '#C5E1A5',
        dark: '#689F38',
        contrastText: '#000000',
      },
      background: { default: '#2E4057', paper: '#4F6C7B' }, // Muted forest tones
      text: { primary: '#F0F5F0', secondary: '#D3DBE2', disabled: '#B0B5BB' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            borderRadius: '24px',
            backgroundColor: 'rgba(79, 108, 123, 0.8)', // Paper color with transparency
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(95, 129, 142, 0.7)', // Input field with transparency
            color: '#F0F5F0',
            borderRadius: '14px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A8E6CF',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#D3DBE2', '&.Mui-focused': { color: '#A8E6CF' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: 'rgba(95, 129, 142, 0.7)',
            color: '#F0F5F0',
            borderRadius: '14px',
          },
          icon: { color: '#F0F5F0' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#B0B5BB', '&.Mui-checked': { color: '#A8E6CF' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#B0B5BB', '&.Mui-checked': { color: '#A8E6CF' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '18px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#A8E6CF',
            color: '#000000',
            '&:hover': { backgroundColor: '#D2F8D2' },
          },
          containedSuccess: {
            backgroundColor: '#8BC34A',
            color: '#000000',
            '&:hover': { backgroundColor: '#C5E1A5' },
          },
          containedError: {
            backgroundColor: '#F48FB1',
            color: '#000000',
            '&:hover': { backgroundColor: '#FFCDD2' },
          },
          containedSecondary: {
            backgroundColor: '#DCDCDC',
            color: '#000000',
            '&:hover': { backgroundColor: '#EDEDED' },
          },
          outlined: {
            borderColor: '#D3DBE2',
            color: '#D3DBE2',
            '&:hover': {
              borderColor: '#F0F5F0',
              color: '#F0F5F0',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#D3DBE2',
            '&.Mui-selected': { color: '#A8E6CF', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#394A5D',
            backgroundImage: 'none',
            borderRadius: '24px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#F0F5F0', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#D3DBE2' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '7px',
            fontWeight: 500,
            backgroundColor: 'rgba(168, 230, 207, 0.2)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),
  purpleHaze: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#BB86FC',
        light: '#E8D4FF',
        dark: '#8F54C0',
        contrastText: '#000000',
      },
      secondary: {
        main: '#03DAC6',
        light: '#66FFF9',
        dark: '#00A89A',
        contrastText: '#000000',
      },
      error: {
        main: '#CF6679',
        light: '#FF8A80',
        dark: '#B00020',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#80E280',
        light: '#A7F2A7',
        dark: '#008000',
        contrastText: '#000000',
      },
      background: { default: '#121212', paper: '#1F1B24' },
      text: { primary: '#FFFFFF', secondary: '#BBBBBB', disabled: '#757575' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            backgroundColor: '#2D2930',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: '#3F3B44', color: '#FFFFFF' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#BBBBBB', '&.Mui-focused': { color: '#BB86FC' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: '#3F3B44', color: '#FFFFFF' },
          icon: { color: '#FFFFFF' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-checked': { color: '#BB86FC' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-checked': { color: '#BB86FC' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '16px', textTransform: 'none' },
          containedPrimary: { backgroundColor: '#BB86FC', color: '#000000' },
          containedSuccess: { backgroundColor: '#80E280', color: '#000000' },
          containedError: { backgroundColor: '#CF6679', color: '#FFFFFF' },
          containedSecondary: { backgroundColor: '#03DAC6', color: '#000000' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#BBBBBB',
            '&.Mui-selected': { color: '#BB86FC', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#28242A',
            backgroundImage: 'none',
            borderRadius: '20px',
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: '#FFFFFF' } } },
      MuiDialogContentText: { styleOverrides: { root: { color: '#BBBBBB' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(187, 134, 252, 0.15)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),
  sunny: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FFC107',
        light: '#FFECB3',
        dark: '#FFA000',
        contrastText: '#000000',
      },
      secondary: {
        main: '#8BC34A',
        light: '#DCEDC8',
        dark: '#689F38',
        contrastText: '#000000',
      },
      error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#4CAF50',
        light: '#A5D6A7',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
      },
      background: { default: '#FFFDE7', paper: '#FFFFFF' },
      text: { primary: '#212121', secondary: '#757575', disabled: '#BDBDBD' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '28px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: '#FFF8E1', color: '#212121' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-focused': { color: '#FFC107' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: '#FFF8E1', color: '#212121' },
          icon: { color: '#757575' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#BDBDBD', '&.Mui-checked': { color: '#FFC107' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#BDBDBD', '&.Mui-checked': { color: '#FFC107' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '20px', textTransform: 'none' },
          containedPrimary: { backgroundColor: '#FFC107', color: '#000000' },
          containedSuccess: { backgroundColor: '#4CAF50', color: '#FFFFFF' },
          containedError: { backgroundColor: '#F44336', color: '#FFFFFF' },
          containedSecondary: { backgroundColor: '#8BC34A', color: '#000000' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#757575',
            '&.Mui-selected': { color: '#FFC107', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderRadius: '28px',
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: '#212121' } } },
      MuiDialogContentText: { styleOverrides: { root: { color: '#757575' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#212121',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
          },
          deleteIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': { color: 'rgba(0, 0, 0, 0.87)' },
          },
        },
      },
    },
  }),
  grayscale: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#BDBDBD',
        light: '#E0E0E0',
        dark: '#616161',
        contrastText: '#000000',
      },
      secondary: {
        main: '#9E9E9E',
        light: '#BDBDBD',
        dark: '#424242',
        contrastText: '#000000',
      },
      error: {
        main: '#EF9A9A',
        light: '#FFCDD2',
        dark: '#D32F2F',
        contrastText: '#000000',
      },
      success: {
        main: '#A5D6A7',
        light: '#C8E6C9',
        dark: '#66BB6A',
        contrastText: '#000000',
      },
      background: { default: '#212121', paper: '#424242' },
      text: { primary: '#FFFFFF', secondary: '#E0E0E0', disabled: '#9E9E9E' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '28px',
            backgroundColor: '#525252',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: '#616161', color: '#FFFFFF' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#E0E0E0', '&.Mui-focused': { color: '#BDBDBD' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: '#616161', color: '#FFFFFF' },
          icon: { color: '#FFFFFF' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#9E9E9E', '&.Mui-checked': { color: '#BDBDBD' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#9E9E9E', '&.Mui-checked': { color: '#BDBDBD' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '20px', textTransform: 'none' },
          containedPrimary: { backgroundColor: '#BDBDBD', color: '#000000' },
          containedSuccess: { backgroundColor: '#A5D6A7', color: '#000000' },
          containedError: { backgroundColor: '#EF9A9A', color: '#000000' },
          containedSecondary: { backgroundColor: '#9E9E9E', color: '#000000' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#E0E0E0',
            '&.Mui-selected': { color: '#BDBDBD', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#383838',
            backgroundImage: 'none',
            borderRadius: '28px',
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: '#FFFFFF' } } },
      MuiDialogContentText: { styleOverrides: { root: { color: '#E0E0E0' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(189, 189, 189, 0.15)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),
  retro: createTheme({
    palette: {
      mode: 'light', // Can be light or dark based on the retro feel
      primary: {
        main: '#00BCD4',
        light: '#80DEEA',
        dark: '#00838F',
        contrastText: '#000000',
      },
      secondary: {
        main: '#FFEB3B',
        light: '#FFF59D',
        dark: '#FBC02D',
        contrastText: '#000000',
      },
      error: {
        main: '#FF5722',
        light: '#FFAB91',
        dark: '#E64A19',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#4CAF50',
        light: '#A5D6A7',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
      },
      background: { default: '#ECEFF1', paper: '#CFD8DC' }, // Light blue-gray for paper/card
      text: { primary: '#263238', secondary: '#455A64', disabled: '#90A4AE' },
    },
    typography: {
      fontFamily: '"Press Start 2P", cursive', // Example retro font
      h4: {
        fontFamily: '"Press Start 2P", cursive',
        fontWeight: 400,
        fontSize: '2rem',
      },
      h5: {
        fontFamily: '"Press Start 2P", cursive',
        fontWeight: 400,
        fontSize: '1.5rem',
      },
      h6: {
        fontFamily: '"Press Start 2P", cursive',
        fontWeight: 400,
        fontSize: '1.2rem',
      },
      body1: {
        fontFamily: 'Roboto Mono, monospace',
        fontWeight: 400,
        fontSize: '0.9rem',
      },
      body2: {
        fontFamily: 'Roboto Mono, monospace',
        fontWeight: 400,
        fontSize: '0.8rem',
      },
      button: {
        fontFamily: '"Press Start 2P", cursive',
        fontWeight: 400,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); /* Also import Bebas Neue */
          body {
            font-family: "Roboto Mono", monospace;
          }
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            backgroundColor: '#B0BEC5',
            border: '2px solid #607D8B',
            boxShadow: '5px 5px 0px 0px #78909C',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: '#CFD8DC',
            color: '#263238',
            border: '1px dashed #607D8B',
            borderRadius: '4px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#455A64', '&.Mui-focused': { color: '#00BCD4' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: '#CFD8DC',
            color: '#263238',
            border: '1px dashed #607D8B',
          },
          icon: { color: '#263238' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#90A4AE', '&.Mui-checked': { color: '#00BCD4' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#90A4AE', '&.Mui-checked': { color: '#00BCD4' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            textTransform: 'uppercase',
            border: '2px solid',
            boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
          },
          containedPrimary: {
            backgroundColor: '#00BCD4',
            color: '#263238',
            borderColor: '#00838F',
            '&:hover': {
              backgroundColor: '#00ACC1',
              boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.3)',
            },
          },
          containedSuccess: {
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            borderColor: '#388E3C',
            '&:hover': {
              backgroundColor: '#5CB85C',
              boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.3)',
            },
          },
          containedError: {
            backgroundColor: '#FF5722',
            color: '#FFFFFF',
            borderColor: '#E64A19',
            '&:hover': {
              backgroundColor: '#FF6F42',
              boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.3)',
            },
          },
          containedSecondary: {
            backgroundColor: '#FFEB3B',
            color: '#263238',
            borderColor: '#FBC02D',
            '&:hover': {
              backgroundColor: '#FFEE58',
              boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.3)',
            },
          },
          outlined: {
            borderColor: '#455A64',
            color: '#455A64',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            color: '#455A64',
            '&.Mui-selected': { color: '#00BCD4', fontWeight: 700 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#CFD8DC',
            backgroundImage: 'none',
            borderRadius: '8px',
            border: '2px solid #607D8B',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#263238', fontWeight: 700 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#455A64' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#263238',
            margin: '2px',
            borderRadius: '4px',
            fontWeight: 500,
            backgroundColor: 'rgba(0, 188, 212, 0.15)',
            border: '1px dashed rgba(0, 131, 143, 0.5)',
          },
          deleteIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': { color: 'rgba(0, 0, 0, 0.87)' },
          },
        },
      },
    },
  }),
  // New themes added below
  sunset: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF7043',
        light: '#FFAB91',
        dark: '#E64A19',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFCA28',
        light: '#FFE082',
        dark: '#FFB300',
        contrastText: '#000000',
      },
      error: {
        main: '#D32F2F',
        light: '#EF9A9A',
        dark: '#C62828',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#8BC34A',
        light: '#C5E1A5',
        dark: '#689F38',
        contrastText: '#FFFFFF',
      },
      background: { default: '#3E2723', paper: '#5D4037' }, // Deep earthy tones
      text: { primary: '#FFFDE7', secondary: '#F5DEB3', disabled: '#D2B48C' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 152, 0, 0.2)', // Orange hint
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '24px',
            backgroundColor: 'rgba(93, 64, 55, 0.7)', // Paper with transparency
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(110, 75, 65, 0.6)', // Input field with transparency
            color: '#FFFDE7',
            borderRadius: '14px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 172, 128, 0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 172, 128, 0.7)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF7043',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#F5DEB3', '&.Mui-focused': { color: '#FF7043' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: 'rgba(110, 75, 65, 0.6)',
            color: '#FFFDE7',
            borderRadius: '14px',
          },
          icon: { color: '#FFFDE7' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#D2B48C', '&.Mui-checked': { color: '#FF7043' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#D2B48C', '&.Mui-checked': { color: '#FF7043' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '18px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#FF7043',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#FF8A65' },
          },
          containedSuccess: {
            backgroundColor: '#8BC34A',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#A5D6A7' },
          },
          containedError: {
            backgroundColor: '#D32F2F',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#EF5350' },
          },
          containedSecondary: {
            backgroundColor: '#FFCA28',
            color: '#000000',
            '&:hover': { backgroundColor: '#FFE082' },
          },
          outlined: {
            borderColor: '#F5DEB3',
            color: '#F5DEB3',
            '&:hover': {
              borderColor: '#FFFDE7',
              color: '#FFFDE7',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#F5DEB3',
            '&.Mui-selected': { color: '#FF7043', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#4E342E',
            backgroundImage: 'none',
            borderRadius: '24px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#FFFDE7', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#F5DEB3' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            margin: '2px',
            borderRadius: '7px',
            fontWeight: 500,
            backgroundColor: 'rgba(255, 112, 67, 0.2)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),
  midnight: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#A7A7FF',
        light: '#CCCCFF',
        dark: '#6A6AFF',
        contrastText: '#000000',
      }, // Soft purple/blue
      secondary: {
        main: '#64FFDA',
        light: '#A7FFEB',
        dark: '#1DE9B6',
        contrastText: '#000000',
      }, // Teal accent
      error: {
        main: '#FF8A80',
        light: '#FFCDD2',
        dark: '#D32F2F',
        contrastText: '#000000',
      },
      success: {
        main: '#B9F6CA',
        light: '#E8F5E9',
        dark: '#69F0AE',
        contrastText: '#000000',
      },
      background: { default: '#1A0033', paper: '#2C004F' }, // Very dark purple/blue
      text: { primary: '#E0E0FF', secondary: '#B0B0FF', disabled: '#8080B0' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(167, 167, 255, 0.1)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
            borderRadius: '28px',
            backgroundColor: 'rgba(44, 0, 79, 0.7)', // Paper with transparency
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(56, 0, 100, 0.6)', // Input field with transparency
            color: '#E0E0FF',
            borderRadius: '16px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(167, 167, 255, 0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(167, 167, 255, 0.7)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A7A7FF',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#B0B0FF', '&.Mui-focused': { color: '#A7A7FF' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: 'rgba(56, 0, 100, 0.6)',
            color: '#E0E0FF',
            borderRadius: '16px',
          },
          icon: { color: '#E0E0FF' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#8080B0', '&.Mui-checked': { color: '#A7A7FF' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#8080B0', '&.Mui-checked': { color: '#A7A7FF' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '3px 10px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: '#A7A7FF',
            color: '#000000',
            '&:hover': { backgroundColor: '#CCCCFF' },
          },
          containedSuccess: {
            backgroundColor: '#B9F6CA',
            color: '#000000',
            '&:hover': { backgroundColor: '#E8F5E9' },
          },
          containedError: {
            backgroundColor: '#FF8A80',
            color: '#000000',
            '&:hover': { backgroundColor: '#FFCDD2' },
          },
          containedSecondary: {
            backgroundColor: '#64FFDA',
            color: '#000000',
            '&:hover': { backgroundColor: '#A7FFEB' },
          },
          outlined: {
            borderColor: '#B0B0FF',
            color: '#B0B0FF',
            '&:hover': {
              borderColor: '#E0E0FF',
              color: '#E0E0FF',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#B0B0FF',
            '&.Mui-selected': { color: '#A7A7FF', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#20003D',
            backgroundImage: 'none',
            borderRadius: '28px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: { root: { color: '#E0E0FF', fontWeight: 600 } },
      },
      MuiDialogContentText: { styleOverrides: { root: { color: '#B0B0FF' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#E0E0FF',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(167, 167, 255, 0.15)',
          },
          deleteIcon: {
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: 'rgba(255, 255, 255, 0.9)' },
          },
        },
      },
    },
  }),
  vibrantGreen: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#76FF03',
        light: '#B2FF59',
        dark: '#64DD17',
        contrastText: '#000000',
      }, // Lime Green
      secondary: {
        main: '#00E5FF',
        light: '#84FFFF',
        dark: '#00B8D4',
        contrastText: '#000000',
      }, // Cyan accent
      error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#4CAF50',
        light: '#A5D6A7',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
      },
      background: { default: '#E8F5E9', paper: '#F0F4C3' }, // Light greenish/yellowish
      text: { primary: '#212121', secondary: '#4CAF50', disabled: '#9E9E9E' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '28px',
            backgroundColor: '#F9FBE7',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: '#F0F4C3', color: '#212121' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#4CAF50', '&.Mui-focused': { color: '#76FF03' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: '#F0F4C3', color: '#212121' },
          icon: { color: '#4CAF50' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#9E9E9E', '&.Mui-checked': { color: '#76FF03' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#9E9E9E', '&.Mui-checked': { color: '#76FF03' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '20px', textTransform: 'none' },
          containedPrimary: { backgroundColor: '#76FF03', color: '#000000' },
          containedSuccess: { backgroundColor: '#4CAF50', color: '#FFFFFF' },
          containedError: { backgroundColor: '#F44336', color: '#FFFFFF' },
          containedSecondary: { backgroundColor: '#00E5FF', color: '#000000' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#4CAF50',
            '&.Mui-selected': { color: '#76FF03', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#F0F4C3',
            backgroundImage: 'none',
            borderRadius: '28px',
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: '#212121' } } },
      MuiDialogContentText: { styleOverrides: { root: { color: '#4CAF50' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#212121',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(118, 255, 3, 0.15)',
          },
          deleteIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': { color: 'rgba(0, 0, 0, 0.87)' },
          },
        },
      },
    },
  }),
  softPastel: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#B39DDB',
        light: '#D1C4E9',
        dark: '#7E57C2',
        contrastText: '#000000',
      }, // Light Purple
      secondary: {
        main: '#81D4FA',
        light: '#B2EBF2',
        dark: '#4FC3F7',
        contrastText: '#000000',
      }, // Light Blue
      error: {
        main: '#FFCDD2',
        light: '#FFE0B2',
        dark: '#EF9A9A',
        contrastText: '#000000',
      }, // Soft Red
      success: {
        main: '#C8E6C9',
        light: '#E8F5E9',
        dark: '#A5D6A7',
        contrastText: '#000000',
      }, // Soft Green
      background: { default: '#F8F8F8', paper: '#FFFFFF' },
      text: { primary: '#424242', secondary: '#757575', disabled: '#BDBDBD' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
      button: { fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '28px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: '#F5F5F5', color: '#424242' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: '#757575', '&.Mui-focused': { color: '#B39DDB' } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: '#F5F5F5', color: '#424242' },
          icon: { color: '#757575' },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { color: '#BDBDBD', '&.Mui-checked': { color: '#B39DDB' } },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { color: '#BDBDBD', '&.Mui-checked': { color: '#B39DDB' } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '20px', textTransform: 'none' },
          containedPrimary: { backgroundColor: '#B39DDB', color: '#000000' },
          containedSuccess: { backgroundColor: '#C8E6C9', color: '#000000' },
          containedError: { backgroundColor: '#FFCDD2', color: '#000000' },
          containedSecondary: { backgroundColor: '#81D4FA', color: '#000000' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#757575',
            '&.Mui-selected': { color: '#B39DDB', fontWeight: 500 },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none',
            borderRadius: '28px',
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: '#424242' } } },
      MuiDialogContentText: { styleOverrides: { root: { color: '#757575' } } },
      MuiChip: {
        styleOverrides: {
          root: {
            color: '#424242',
            margin: '2px',
            borderRadius: '8px',
            fontWeight: 500,
            backgroundColor: 'rgba(179, 157, 219, 0.1)',
          },
          deleteIcon: {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': { color: 'rgba(0, 0, 0, 0.87)' },
          },
        },
      },
    },
  }),
};

// Create a ThemeContext to manage the current theme state
const ThemeContext = createContext();

// ThemeProviderWrapper component to provide theme switching capability
const ThemeProviderWrapper = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState(() => {
    // Load theme preference from localStorage, default to 'dark'
    return localStorage.getItem('appTheme') || 'dark';
  });

  const selectedTheme = themes[currentThemeName] || themes.dark; // Fallback to dark if invalid

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appTheme', currentThemeName);
  }, [currentThemeName]);

  return (
    <ThemeContext.Provider value={{ currentThemeName, setCurrentThemeName }}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

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

function AppContent() {
  // Renamed App to AppContent
  // Use useTheme hook to access the theme object
  const theme = useTheme();
  const { currentThemeName, setCurrentThemeName } = useContext(ThemeContext);

  // Utility function to get color for workout chips
  const getWorkoutColor = useCallback(
    (workoutName) => {
      switch (workoutName) {
        case 'Chest':
          return theme.palette.primary.light;
        case 'Biceps':
          return theme.palette.secondary.light;
        case 'Back':
          return theme.palette.mode === 'dark' ? '#D0BCFF' : '#424242'; // Adjust for light mode visibility
        case 'Triceps':
          return theme.palette.mode === 'dark' ? '#B3F0E6' : '#26A69A';
        case 'Shoulder':
          return theme.palette.mode === 'dark' ? '#FFE082' : '#FFB300';
        case 'Traps':
          return theme.palette.error.light;
        case 'Forearms':
          return theme.palette.mode === 'dark' ? '#D7C7A2' : '#795548';
        case 'Abs':
          return theme.palette.success.light;
        case 'Legs':
          return theme.palette.mode === 'dark' ? '#FFEB99' : '#FBC02D';
        case 'Cardio':
          return theme.palette.mode === 'dark' ? '#A6E4FF' : '#0288D1';
        case 'Rest Day':
          return theme.palette.text.disabled;
        case 'Other':
          return theme.palette.primary.main; // Fallback for 'Other' or any new types
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
      if (level <= 6)
        return theme.palette.mode === 'dark' ? '#FFD180' : '#FFAB40'; // Adjust for light mode visibility
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

  // Settings Dialog State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    let csvContent = [...baseHeaders, ...supplementHeaders].join(',') + '\n';

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

  // --- Data for Chart ---
  const getChartData = useCallback(() => {
    return fitnessEntries
      .map((entry) => {
        const displayWeight = parseFloat(
          convertWeight(
            entry.weight,
            'kg',
            unitSystem === 'metric' ? 'kg' : 'lbs'
          ).toFixed(1)
        );
        const bmi = parseFloat(calculateBMI(entry.weight, entry.height));
        return {
          date: entry.date,
          weight: displayWeight,
          bmi: bmi,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(a.date)); // Sort by date for chronological chart
  }, [fitnessEntries, unitSystem]);

  const chartData = getChartData();

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
      const apiKey = 'AIzaSyCQSkWi7iJTYTL3QmyMhPGmXarT-gE9lh4'; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
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
    <>
      <CssBaseline />
      {/* Ensure the body has a minimum height to allow for vertical centering of fixed elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            theme.palette.mode === 'dark'
              ? 'repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 1px, transparent 1px, transparent 20px)'
              : 'repeating-linear-gradient(45deg, #E0E0E0 0, #E0E0E0 1px, transparent 1px, transparent 20px)',
          backgroundSize: '20px 20px',
          opacity: 1,
          zIndex: -1,
          backgroundColor: theme.palette.background.default,
        }}
      />

      {/* Removed ad banners */}

      <Container
        maxWidth='md'
        sx={{
          my: 4,
          p: 4,
          borderRadius: '28px',
          backgroundColor: theme.palette.background.paper,
          pb: '100px', // Adjusted padding-bottom to account for footer
          // No top padding adjustment needed as banners are removed
          // Use auto margins to center the container for desktop view
          ml: { md: 'auto' },
          mr: { md: 'auto' },
        }}
        component={Paper}
      >
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
          <IconButton color='primary' onClick={() => setIsSettingsOpen(true)}>
            <BrushIcon /> {/* Changed icon to BrushIcon */}
          </IconButton>
        </Box>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          gutterBottom
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            letterSpacing: '0.2em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: `2px 2px 4px ${theme.palette.text.secondary}`, // Subtle shadow for depth
            lineHeight: 1, // Prevent extra spacing around the large text
          }}
        >
          Gainss
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
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#3A3740' : '#E0E0E0',
                    borderRadius: '16px',
                  }}
                >
                  <Grid container spacing={2}>
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
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#3A3740' : '#E0E0E0',
                    borderRadius: '16px',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth required sx={{ minWidth: 250 }}>
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
                                    event.stopPropagation();
                                  }}
                                  sx={{
                                    backgroundColor: getWorkoutColor(value),
                                    color:
                                      theme.palette.mode === 'dark'
                                        ? 'white'
                                        : 'black',
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
                          <MenuItem value=''>Select Workout(s)</MenuItem>{' '}
                          {/* Added option for initial clear state */}
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
                      <FormControl fullWidth required sx={{ minWidth: 250 }}>
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
                                onDelete={() => setPainLevel('')}
                                onMouseDown={(event) => {
                                  event.stopPropagation();
                                }}
                                sx={{
                                  backgroundColor: getPainLevelColor(selected),
                                  color:
                                    theme.palette.mode === 'dark'
                                      ? 'white'
                                      : 'black',
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
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#3A3740' : '#E0E0E0',
                    borderRadius: '16px',
                  }}
                >
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
                        backgroundColor: theme.palette.secondary.main,
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
                              placeholder='Quantity (grams)'
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
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#3A3740' : '#E0E0E0',
                    borderRadius: '16px',
                  }}
                >
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

            {/* Fitness Progress Chart */}
            <Typography
              variant='h6'
              align='center'
              gutterBottom
              sx={{ mt: 5, mb: 3 }}
            >
              Weight & BMI Progress
            </Typography>
            {chartData.length > 0 ? (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke={theme.palette.text.disabled}
                  />
                  <XAxis
                    dataKey='date'
                    minTickGap={30} // Adjust as needed for date density
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.text.secondary }}
                  />
                  <YAxis
                    yAxisId='left'
                    label={{
                      value: `Weight (${
                        unitSystem === 'metric' ? 'kg' : 'lbs'
                      })`,
                      angle: -90,
                      position: 'insideLeft',
                      fill: theme.palette.text.primary,
                    }}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.text.secondary }}
                  />
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    label={{
                      value: 'BMI',
                      angle: 90,
                      position: 'insideRight',
                      fill: theme.palette.text.primary,
                    }}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.text.secondary }}
                    tickLine={{ stroke: theme.palette.text.secondary }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.text.disabled}`,
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: theme.palette.text.primary }}
                    itemStyle={{ color: theme.palette.text.secondary }}
                    formatter={(value, name, props) => {
                      if (
                        name ===
                        `Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`
                      ) {
                        return [
                          `${value.toFixed(1)} ${
                            unitSystem === 'metric' ? 'kg' : 'lbs'
                          }`,
                          'Weight',
                        ];
                      }
                      return [`${value.toFixed(2)}`, name];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: theme.palette.text.primary }}
                  />
                  <Line
                    yAxisId='left'
                    type='monotone'
                    dataKey='weight'
                    name={`Weight (${unitSystem === 'metric' ? 'kg' : 'lbs'})`}
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='bmi'
                    name='BMI'
                    stroke={theme.palette.secondary.main}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography
                variant='body1'
                align='center'
                sx={{ color: 'text.disabled', mt: 3 }}
              >
                Add entries to see your progress chart!
              </Typography>
            )}
          </Box>
        )}

        {currentTab === 2 && (
          <Box sx={{ mt: 2, p: 4 }} component={Paper} elevation={0}>
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
                          sx={{
                            backgroundColor: getWorkoutColor(selected),
                            color:
                              theme.palette.mode === 'dark' ? 'white' : 'black',
                          }}
                        />
                      ) : (
                        <Typography
                          variant='body1'
                          sx={{ color: 'text.disabled' }}
                        >
                          All Workouts
                        </Typography>
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
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#3A3740' : '#E0E0E0',
                  },
                  mt: 3,
                }}
              >
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
                Could not retrieve insights.!
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

        {/* Settings Dialog */}
        <Dialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          aria-labelledby='theme-dialog-title' // Changed ID to match new title
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle id='theme-dialog-title'>Theme</DialogTitle>{' '}
          {/* Changed title to "Theme" */}
          <DialogContent>
            <FormControl fullWidth margin='dense'>
              <InputLabel id='theme-select-label'>Choose Theme</InputLabel>
              <Select
                labelId='theme-select-label'
                value={currentThemeName}
                label='Choose Theme'
                onChange={(e) => setCurrentThemeName(e.target.value)}
              >
                {Object.keys(themes).map((themeName) => (
                  <MenuItem key={themeName} value={themeName}>
                    {themeName.charAt(0).toUpperCase() +
                      themeName
                        .slice(1)
                        .replace(/([A-Z])/g, ' $1')
                        .trim()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSettingsOpen(false)} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Ad message */}
        <Box
          sx={{
            mt: 4,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            p: 2,
            borderRadius: '8px',
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
          }}
        >
          For posting your ad here, contact developer.
        </Box>
      </Container>
      {/* Footer added at the bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          py: 2,
          backgroundColor: 'rgba(26, 32, 44, 0.9)',
          textAlign: 'center',
          color: 'text.secondary',
          zIndex: 1200,
        }}
      >
        <Container maxWidth='md'>
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
        </Container>
      </Box>
    </>
  );
}

// Main App component which wraps AppContent with ThemeProviderWrapper
function App() {
  return (
    <ThemeProviderWrapper>
      <AppContent />
    </ThemeProviderWrapper>
  );
}

export default App;
