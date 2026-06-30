import { createTheme } from "@mui/material/styles"

export const themes = {
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#9CE0FF", light: "#C7EEFF", dark: "#006494", contrastText: "#000000" },
      secondary: { main: "#B0C4DE", light: "#DAE2F0", dark: "#4A5C6F", contrastText: "#000000" },
      error: { main: "#CF6679", light: "#FF8A80", dark: "#B00020", contrastText: "#FFFFFF" },
      success: { main: "#80E280", light: "#A7F2A7", dark: "#008000", contrastText: "#000000" },
      background: { default: "#000000", paper: "#2F2E31" },
      text: { primary: "#E6E1E5", secondary: "#A8A3AB", disabled: "#938F99" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          @keyframes gradientMove {
            0%   { background-position: 0% 50%; }
            25%  { background-position: 100% 0%; }
            50%  { background-position: 100% 100%; }
            75%  { background-position: 0% 100%; }
            100% { background-position: 0% 50%; }
          }
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
            borderRadius: "0px",
            backgroundColor: "rgba(20, 18, 30, 0.35)",
            backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#E6E1E5",
            borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(156, 224, 255, 0.25)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(156, 224, 255, 0.55)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#9CE0FF" },
            '& input[type="date"]': { colorScheme: "dark" },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: "#C9C5CD", "&.Mui-focused": { color: "#9CE0FF" }, "&.Mui-disabled": { color: "#938F99" } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "#E6E1E5", borderRadius: "0px" },
          icon: { color: "#E6E1E5" },
        },
      },
      MuiCheckbox: {
        styleOverrides: { root: { color: "#938F99", "&.Mui-checked": { color: "#9CE0FF" } } },
      },
      MuiRadio: {
        styleOverrides: { root: { color: "#938F99", "&.Mui-checked": { color: "#9CE0FF" } } },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0px",
            textTransform: "none",
            fontWeight: 500,
            padding: "3px 10px",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
          containedPrimary: { backgroundColor: "#9CE0FF", color: "#000000", "&:hover": { backgroundColor: "#C7EEFF" } },
          containedSuccess: { backgroundColor: "#80E280", color: "#000000", "&:hover": { backgroundColor: "#A7F2A7" } },
          containedError: { backgroundColor: "#CF6679", color: "#FFFFFF", "&:hover": { backgroundColor: "#FF8A80" } },
          containedSecondary: { backgroundColor: "#B0C4DE", color: "#000000", "&:hover": { backgroundColor: "#DAE2F0" } },
          outlined: {
            borderColor: "#C9C5CD", color: "#C9C5CD",
            "&:hover": { borderColor: "#E6E1E5", color: "#E6E1E5", backgroundColor: "rgba(230, 225, 229, 0.08)" },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: "none", color: "#C9C5CD", "&.Mui-selected": { color: "#9CE0FF", fontWeight: 500 } },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(20, 18, 30, 0.65)",
            backgroundImage: "none",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#E6E1E5", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#C9C5CD" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(156, 224, 255, 0.1)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  light: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#6200EE", light: "#9D46FF", dark: "#0057B7", contrastText: "#FFFFFF" },
      secondary: { main: "#03DAC6", light: "#66FFF9", dark: "#00A89A", contrastText: "#000000" },
      error: { main: "#B00020", light: "#E57373", dark: "#7F0000", contrastText: "#FFFFFF" },
      success: { main: "#4CAF50", light: "#81C784", dark: "#388E3C", contrastText: "#FFFFFF" },
      background: { default: "#F5F5F5", paper: "#FFFFFF" },
      text: { primary: "#212121", secondary: "#757575", disabled: "#BDBDBD" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.25)", boxShadow: "0 8px 32px rgba(98, 0, 238, 0.15)",
            borderRadius: "0px", backgroundColor: "rgba(255, 255, 255, 0.45)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.06)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#212121", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(98, 0, 238, 0.25)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(98, 0, 238, 0.55)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6200EE" },
            '& input[type="date"]': { colorScheme: "light" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#757575", "&.Mui-focused": { color: "#6200EE" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(0, 0, 0, 0.06)", color: "#212121", borderRadius: "0px" },
          icon: { color: "#757575" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#757575", "&.Mui-checked": { color: "#6200EE" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#757575", "&.Mui-checked": { color: "#6200EE" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary: { backgroundColor: "#6200EE", color: "#FFFFFF", "&:hover": { backgroundColor: "#7F39FB" } },
          containedSuccess: { backgroundColor: "#4CAF50", color: "#FFFFFF", "&:hover": { backgroundColor: "#66BB6A" } },
          containedError: { backgroundColor: "#B00020", color: "#FFFFFF", "&:hover": { backgroundColor: "#D32F2F" } },
          containedSecondary: { backgroundColor: "#03DAC6", color: "#000000", "&:hover": { backgroundColor: "#00C8AF" } },
          outlined: { borderColor: "#757575", color: "#757575", "&:hover": { borderColor: "#212121", color: "#212121", backgroundColor: "rgba(0, 0, 0, 0.04)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#757575", "&.Mui-selected": { color: "#6200EE", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(255, 255, 255, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(255, 255, 255, 0.5)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(98, 0, 238, 0.2)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#212121", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#757575" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#212121", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(98, 0, 238, 0.1)" },
          deleteIcon: { color: "rgba(0, 0, 0, 0.54)", "&:hover": { color: "rgba(0, 0, 0, 0.87)" } },
        },
      },
    },
  }),

  ocean: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#81D4FA", light: "#B2EBF2", dark: "#00A1C1", contrastText: "#000000" },
      secondary: { main: "#B39DDB", light: "#D1C4E9", dark: "#6D4C41", contrastText: "#000000" },
      error: { main: "#EF9A9A", light: "#FFCDD2", dark: "#D32F2F", contrastText: "#000000" },
      success: { main: "#A5D6A7", light: "#C8E6C9", dark: "#66BB6A", contrastText: "#000000" },
      background: { default: "#0D47A1", paper: "#1976D2" },
      text: { primary: "#E0F2F7", secondary: "#BBDEFB", disabled: "#90CAF9" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(129, 212, 250, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            borderRadius: "0px", backgroundColor: "rgba(0, 30, 80, 0.35)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.08)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#E0F2F7", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(129, 212, 250, 0.3)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(129, 212, 250, 0.6)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#81D4FA" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#BBDEFB", "&.Mui-focused": { color: "#81D4FA" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#E0F2F7", borderRadius: "0px" },
          icon: { color: "#E0F2F7" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#90CAF9", "&.Mui-checked": { color: "#81D4FA" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#90CAF9", "&.Mui-checked": { color: "#81D4FA" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary: { backgroundColor: "#81D4FA", color: "#000000", "&:hover": { backgroundColor: "#B2EBF2" } },
          containedSuccess: { backgroundColor: "#A5D6A7", color: "#000000", "&:hover": { backgroundColor: "#C8E6C9" } },
          containedError: { backgroundColor: "#EF9A9A", color: "#000000", "&:hover": { backgroundColor: "#FFCDD2" } },
          containedSecondary: { backgroundColor: "#B39DDB", color: "#000000", "&:hover": { backgroundColor: "#D1C4E9" } },
          outlined: { borderColor: "#BBDEFB", color: "#BBDEFB", "&:hover": { borderColor: "#E0F2F7", color: "#E0F2F7", backgroundColor: "rgba(255, 255, 255, 0.08)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#BBDEFB", "&.Mui-selected": { color: "#81D4FA", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(0, 30, 80, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(129, 212, 250, 0.2)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#E0F2F7", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#BBDEFB" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(129, 212, 250, 0.2)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  forest: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#A8E6CF", light: "#D2F8D2", dark: "#70C09E", contrastText: "#000000" },
      secondary: { main: "#DCDCDC", light: "#EDEDED", dark: "#A9A9A9", contrastText: "#000000" },
      error: { main: "#F48FB1", light: "#FFCDD2", dark: "#C2185B", contrastText: "#000000" },
      success: { main: "#8BC34A", light: "#C5E1A5", dark: "#689F38", contrastText: "#000000" },
      background: { default: "#2E4057", paper: "#4F6C7B" },
      text: { primary: "#F0F5F0", secondary: "#D3DBE2", disabled: "#B0B5BB" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(168, 230, 207, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            borderRadius: "0px", backgroundColor: "rgba(10, 25, 15, 0.35)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.07)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#F0F5F0", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(168, 230, 207, 0.25)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(168, 230, 207, 0.55)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#A8E6CF" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#D3DBE2", "&.Mui-focused": { color: "#A8E6CF" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "#F0F5F0", borderRadius: "0px" },
          icon: { color: "#F0F5F0" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#B0B5BB", "&.Mui-checked": { color: "#A8E6CF" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#B0B5BB", "&.Mui-checked": { color: "#A8E6CF" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary: { backgroundColor: "#A8E6CF", color: "#000000", "&:hover": { backgroundColor: "#D2F8D2" } },
          containedSuccess: { backgroundColor: "#8BC34A", color: "#000000", "&:hover": { backgroundColor: "#C5E1A5" } },
          containedError: { backgroundColor: "#F48FB1", color: "#000000", "&:hover": { backgroundColor: "#FFCDD2" } },
          containedSecondary: { backgroundColor: "#DCDCDC", color: "#000000", "&:hover": { backgroundColor: "#EDEDED" } },
          outlined: { borderColor: "#D3DBE2", color: "#D3DBE2", "&:hover": { borderColor: "#F0F5F0", color: "#F0F5F0", backgroundColor: "rgba(255, 255, 255, 0.06)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#D3DBE2", "&.Mui-selected": { color: "#A8E6CF", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(10, 25, 15, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(168, 230, 207, 0.2)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#F0F5F0", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#D3DBE2" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(168, 230, 207, 0.2)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  purpleHaze: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#BB86FC", light: "#E8D4FF", dark: "#8F54C0", contrastText: "#000000" },
      secondary: { main: "#03DAC6", light: "#66FFF9", dark: "#00A89A", contrastText: "#000000" },
      error: { main: "#CF6679", light: "#FF8A80", dark: "#B00020", contrastText: "#FFFFFF" },
      success: { main: "#80E280", light: "#A7F2A7", dark: "#008000", contrastText: "#000000" },
      background: { default: "#121212", paper: "#1F1B24" },
      text: { primary: "#FFFFFF", secondary: "#BBBBBB", disabled: "#757575" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(187, 134, 252, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(15, 5, 25, 0.35)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.07)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#FFFFFF", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(187, 134, 252, 0.3)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(187, 134, 252, 0.6)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#BB86FC" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#BBBBBB", "&.Mui-focused": { color: "#BB86FC" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "#FFFFFF", borderRadius: "0px" },
          icon: { color: "#FFFFFF" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#757575", "&.Mui-checked": { color: "#BB86FC" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#757575", "&.Mui-checked": { color: "#BB86FC" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none" },
          containedPrimary: { backgroundColor: "#BB86FC", color: "#000000" },
          containedSuccess: { backgroundColor: "#80E280", color: "#000000" },
          containedError: { backgroundColor: "#CF6679", color: "#FFFFFF" },
          containedSecondary: { backgroundColor: "#03DAC6", color: "#000000" },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#BBBBBB", "&.Mui-selected": { color: "#BB86FC", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(15, 5, 25, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(187, 134, 252, 0.2)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#FFFFFF" } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#BBBBBB" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(187, 134, 252, 0.15)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  sunny: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#FFC107", light: "#FFECB3", dark: "#FFA000", contrastText: "#000000" },
      secondary: { main: "#8BC34A", light: "#DCEDC8", dark: "#689F38", contrastText: "#000000" },
      error: { main: "#F44336", light: "#E57373", dark: "#D32F2F", contrastText: "#FFFFFF" },
      success: { main: "#4CAF50", light: "#A5D6A7", dark: "#388E3C", contrastText: "#FFFFFF" },
      background: { default: "#FFFDE7", paper: "#FFFFFF" },
      text: { primary: "#212121", secondary: "#757575", disabled: "#BDBDBD" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 193, 7, 0.2)", boxShadow: "0 8px 32px rgba(255, 152, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.45)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: "rgba(0, 0, 0, 0.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "#212121", borderRadius: "0px" },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#757575", "&.Mui-focused": { color: "#FFC107" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(0, 0, 0, 0.05)", color: "#212121", borderRadius: "0px" },
          icon: { color: "#757575" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#BDBDBD", "&.Mui-checked": { color: "#FFC107" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#BDBDBD", "&.Mui-checked": { color: "#FFC107" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none" },
          containedPrimary: { backgroundColor: "#FFC107", color: "#000000" },
          containedSuccess: { backgroundColor: "#4CAF50", color: "#FFFFFF" },
          containedError: { backgroundColor: "#F44336", color: "#FFFFFF" },
          containedSecondary: { backgroundColor: "#8BC34A", color: "#000000" },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#757575", "&.Mui-selected": { color: "#FFC107", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(255, 255, 255, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(255, 193, 7, 0.3)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(255, 152, 0, 0.2)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#212121" } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#757575" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#212121", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(255, 193, 7, 0.15)" },
          deleteIcon: { color: "rgba(0, 0, 0, 0.54)", "&:hover": { color: "rgba(0, 0, 0, 0.87)" } },
        },
      },
    },
  }),

  grayscale: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#BDBDBD", light: "#E0E0E0", dark: "#616161", contrastText: "#000000" },
      secondary: { main: "#9E9E9E", light: "#BDBDBD", dark: "#424242", contrastText: "#000000" },
      error: { main: "#EF9A9A", light: "#FFCDD2", dark: "#D32F2F", contrastText: "#000000" },
      success: { main: "#A5D6A7", light: "#C8E6C9", dark: "#66BB6A", contrastText: "#000000" },
      background: { default: "#212121", paper: "#424242" },
      text: { primary: "#FFFFFF", secondary: "#E0E0E0", disabled: "#9E9E9E" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.55)",
            backgroundColor: "rgba(10, 10, 10, 0.35)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: "rgba(255, 255, 255, 0.07)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "#FFFFFF", borderRadius: "0px" },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#E0E0E0", "&.Mui-focused": { color: "#BDBDBD" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "#FFFFFF", borderRadius: "0px" },
          icon: { color: "#FFFFFF" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#9E9E9E", "&.Mui-checked": { color: "#BDBDBD" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#9E9E9E", "&.Mui-checked": { color: "#BDBDBD" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none" },
          containedPrimary: { backgroundColor: "#BDBDBD", color: "#000000" },
          containedSuccess: { backgroundColor: "#A5D6A7", color: "#000000" },
          containedError: { backgroundColor: "#EF9A9A", color: "#000000" },
          containedSecondary: { backgroundColor: "#9E9E9E", color: "#000000" },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#E0E0E0", "&.Mui-selected": { color: "#BDBDBD", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(10, 10, 10, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.55)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#FFFFFF" } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#E0E0E0" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(189, 189, 189, 0.15)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  retro: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#00BCD4", light: "#80DEEA", dark: "#00838F", contrastText: "#000000" },
      secondary: { main: "#FFEB3B", light: "#FFF59D", dark: "#FBC02D", contrastText: "#000000" },
      error: { main: "#FF5722", light: "#FFAB91", dark: "#E64A19", contrastText: "#FFFFFF" },
      success: { main: "#4CAF50", light: "#A5D6A7", dark: "#388E3C", contrastText: "#FFFFFF" },
      background: { default: "#ECEFF1", paper: "#CFD8DC" },
      text: { primary: "#263238", secondary: "#455A64", disabled: "#90A4AE" },
    },
    typography: {
      fontFamily: '"Press Start 2P", cursive',
      h4: { fontFamily: '"Press Start 2P", cursive', fontWeight: 400, fontSize: "2rem" },
      h5: { fontFamily: '"Press Start 2P", cursive', fontWeight: 400, fontSize: "1.5rem" },
      h6: { fontFamily: '"Press Start 2P", cursive', fontWeight: 400, fontSize: "1.2rem" },
      body1: { fontFamily: "Roboto Mono, monospace", fontWeight: 400, fontSize: "0.9rem" },
      body2: { fontFamily: "Roboto Mono, monospace", fontWeight: 400, fontSize: "0.8rem" },
      button: { fontFamily: '"Press Start 2P", cursive', fontWeight: 400, fontSize: "0.75rem", textTransform: "uppercase" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          body { font-family: "Roboto Mono", monospace; }
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "2px solid rgba(0, 188, 212, 0.3)", boxShadow: "5px 5px 0px 0px rgba(0,188,212,0.3)",
            backgroundColor: "rgba(5, 15, 25, 0.45)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 188, 212, 0.1)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#263238", border: "1px dashed rgba(0, 188, 212, 0.5)", borderRadius: "0px",
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#455A64", "&.Mui-focused": { color: "#00BCD4" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(0, 188, 212, 0.1)", color: "#263238", border: "1px dashed rgba(0, 188, 212, 0.5)" },
          icon: { color: "#263238" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#90A4AE", "&.Mui-checked": { color: "#00BCD4" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#90A4AE", "&.Mui-checked": { color: "#00BCD4" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "uppercase", border: "2px solid", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.3)" },
          containedPrimary: { backgroundColor: "#00BCD4", color: "#263238", borderColor: "#00838F", "&:hover": { backgroundColor: "#00ACC1", boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.3)" } },
          containedSuccess: { backgroundColor: "#4CAF50", color: "#FFFFFF", borderColor: "#388E3C", "&:hover": { backgroundColor: "#5CB85C", boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.3)" } },
          containedError: { backgroundColor: "#FF5722", color: "#FFFFFF", borderColor: "#E64A19", "&:hover": { backgroundColor: "#FF6F42", boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.3)" } },
          containedSecondary: { backgroundColor: "#FFEB3B", color: "#263238", borderColor: "#FBC02D", "&:hover": { backgroundColor: "#FFEE58", boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.3)" } },
          outlined: { borderColor: "#455A64", color: "#455A64", "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "uppercase", color: "#455A64", "&.Mui-selected": { color: "#00BCD4", fontWeight: 700 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(5, 15, 25, 0.65)", backgroundImage: "none",
            border: "2px solid rgba(0, 188, 212, 0.3)", borderRadius: "0px",
            boxShadow: "5px 5px 0px 0px rgba(0,188,212,0.3)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#263238", fontWeight: 700 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#455A64" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#263238", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(0, 188, 212, 0.15)", border: "1px dashed rgba(0, 131, 143, 0.5)" },
          deleteIcon: { color: "rgba(0, 0, 0, 0.54)", "&:hover": { color: "rgba(0, 0, 0, 0.87)" } },
        },
      },
    },
  }),

  sunset: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#FF7043", light: "#FFAB91", dark: "#E64A19", contrastText: "#FFFFFF" },
      secondary: { main: "#FFCA28", light: "#FFE082", dark: "#FFB300", contrastText: "#000000" },
      error: { main: "#D32F2F", light: "#EF9A9A", dark: "#C62828", contrastText: "#FFFFFF" },
      success: { main: "#8BC34A", light: "#C5E1A5", dark: "#689F38", contrastText: "#FFFFFF" },
      background: { default: "#3E2723", paper: "#5D4037" },
      text: { primary: "#FFFDE7", secondary: "#F5DEB3", disabled: "#D2B48C" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 152, 0, 0.2)", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
            borderRadius: "0px", backgroundColor: "rgba(93, 64, 55, 0.7)",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(110, 75, 65, 0.6)", color: "#FFFDE7", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 172, 128, 0.4)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 172, 128, 0.7)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FF7043" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#F5DEB3", "&.Mui-focused": { color: "#FF7043" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(110, 75, 65, 0.6)", color: "#FFFDE7", borderRadius: "0px" },
          icon: { color: "#FFFDE7" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#D2B48C", "&.Mui-checked": { color: "#FF7043" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#D2B48C", "&.Mui-checked": { color: "#FF7043" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary: { backgroundColor: "#FF7043", color: "#FFFFFF", "&:hover": { backgroundColor: "#FF8A65" } },
          containedSuccess: { backgroundColor: "#8BC34A", color: "#FFFFFF", "&:hover": { backgroundColor: "#A5D6A7" } },
          containedError: { backgroundColor: "#D32F2F", color: "#FFFFFF", "&:hover": { backgroundColor: "#EF5350" } },
          containedSecondary: { backgroundColor: "#FFCA28", color: "#000000", "&:hover": { backgroundColor: "#FFE082" } },
          outlined: { borderColor: "#F5DEB3", color: "#F5DEB3", "&:hover": { borderColor: "#FFFDE7", color: "#FFFDE7", backgroundColor: "rgba(255, 255, 255, 0.06)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#F5DEB3", "&.Mui-selected": { color: "#FF7043", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(20, 5, 0, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(255, 112, 67, 0.2)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#FFFDE7", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#F5DEB3" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#FFFFFF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(255, 112, 67, 0.2)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  midnight: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#A7A7FF", light: "#CCCCFF", dark: "#6A6AFF", contrastText: "#000000" },
      secondary: { main: "#64FFDA", light: "#A7FFEB", dark: "#1DE9B6", contrastText: "#000000" },
      error: { main: "#FF8A80", light: "#FFCDD2", dark: "#D32F2F", contrastText: "#000000" },
      success: { main: "#B9F6CA", light: "#E8F5E9", dark: "#69F0AE", contrastText: "#000000" },
      background: { default: "#1A0033", paper: "#2C004F" },
      text: { primary: "#E0E0FF", secondary: "#B0B0FF", disabled: "#8080B0" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(167, 167, 255, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            borderRadius: "0px", backgroundColor: "rgba(3, 0, 26, 0.35)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.07)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#E0E0FF", borderRadius: "0px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(167, 167, 255, 0.4)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(167, 167, 255, 0.7)" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#A7A7FF" },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#B0B0FF", "&.Mui-focused": { color: "#A7A7FF" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(255, 255, 255, 0.07)", color: "#E0E0FF", borderRadius: "0px" },
          icon: { color: "#E0E0FF" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#8080B0", "&.Mui-checked": { color: "#A7A7FF" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#8080B0", "&.Mui-checked": { color: "#A7A7FF" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary: { backgroundColor: "#A7A7FF", color: "#000000", "&:hover": { backgroundColor: "#CCCCFF" } },
          containedSuccess: { backgroundColor: "#B9F6CA", color: "#000000", "&:hover": { backgroundColor: "#E8F5E9" } },
          containedError: { backgroundColor: "#FF8A80", color: "#000000", "&:hover": { backgroundColor: "#FFCDD2" } },
          containedSecondary: { backgroundColor: "#64FFDA", color: "#000000", "&:hover": { backgroundColor: "#A7FFEB" } },
          outlined: { borderColor: "#B0B0FF", color: "#B0B0FF", "&:hover": { borderColor: "#E0E0FF", color: "#E0E0FF", backgroundColor: "rgba(255, 255, 255, 0.08)" } },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#B0B0FF", "&.Mui-selected": { color: "#A7A7FF", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(3, 0, 26, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(167, 167, 255, 0.2)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#E0E0FF", fontWeight: 600 } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#B0B0FF" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#E0E0FF", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(167, 167, 255, 0.15)" },
          deleteIcon: { color: "rgba(255, 255, 255, 0.7)", "&:hover": { color: "rgba(255, 255, 255, 0.9)" } },
        },
      },
    },
  }),

  vibrantGreen: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#76FF03", light: "#B2FF59", dark: "#64DD17", contrastText: "#000000" },
      secondary: { main: "#00E5FF", light: "#84FFFF", dark: "#00B8D4", contrastText: "#000000" },
      error: { main: "#F44336", light: "#E57373", dark: "#D32F2F", contrastText: "#FFFFFF" },
      success: { main: "#4CAF50", light: "#A5D6A7", dark: "#388E3C", contrastText: "#FFFFFF" },
      background: { default: "#E8F5E9", paper: "#F0F4C3" },
      text: { primary: "#212121", secondary: "#4CAF50", disabled: "#9E9E9E" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(118, 255, 3, 0.2)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(230, 255, 230, 0.4)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: "rgba(0, 0, 0, 0.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "#212121", borderRadius: "0px" },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#4CAF50", "&.Mui-focused": { color: "#76FF03" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(0, 0, 0, 0.05)", color: "#212121", borderRadius: "0px" },
          icon: { color: "#4CAF50" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#9E9E9E", "&.Mui-checked": { color: "#76FF03" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#9E9E9E", "&.Mui-checked": { color: "#76FF03" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none" },
          containedPrimary: { backgroundColor: "#76FF03", color: "#000000" },
          containedSuccess: { backgroundColor: "#4CAF50", color: "#FFFFFF" },
          containedError: { backgroundColor: "#F44336", color: "#FFFFFF" },
          containedSecondary: { backgroundColor: "#00E5FF", color: "#000000" },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#4CAF50", "&.Mui-selected": { color: "#76FF03", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(230, 255, 230, 0.65)", backgroundImage: "none",
            border: "1px solid rgba(118, 255, 3, 0.25)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(0, 200, 83, 0.2)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#212121" } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#4CAF50" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#212121", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(118, 255, 3, 0.15)" },
          deleteIcon: { color: "rgba(0, 0, 0, 0.54)", "&:hover": { color: "rgba(0, 0, 0, 0.87)" } },
        },
      },
    },
  }),

  softPastel: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#B39DDB", light: "#D1C4E9", dark: "#7E57C2", contrastText: "#000000" },
      secondary: { main: "#81D4FA", light: "#B2EBF2", dark: "#4FC3F7", contrastText: "#000000" },
      error: { main: "#FFCDD2", light: "#FFE0B2", dark: "#EF9A9A", contrastText: "#000000" },
      success: { main: "#C8E6C9", light: "#E8F5E9", dark: "#A5D6A7", contrastText: "#000000" },
      background: { default: "#F8F8F8", paper: "#FFFFFF" },
      text: { primary: "#424242", secondary: "#757575", disabled: "#BDBDBD" },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h4: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: { styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');` },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(179, 157, 219, 0.25)", boxShadow: "0 8px 32px rgba(179, 157, 219, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.45)", backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: "rgba(0, 0, 0, 0.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", color: "#424242", borderRadius: "0px" },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { color: "#757575", "&.Mui-focused": { color: "#B39DDB" } } } },
      MuiSelect: {
        styleOverrides: {
          select: { backgroundColor: "rgba(0, 0, 0, 0.05)", color: "#424242", borderRadius: "0px" },
          icon: { color: "#757575" },
        },
      },
      MuiCheckbox: { styleOverrides: { root: { color: "#BDBDBD", "&.Mui-checked": { color: "#B39DDB" } } } },
      MuiRadio: { styleOverrides: { root: { color: "#BDBDBD", "&.Mui-checked": { color: "#B39DDB" } } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "0px", textTransform: "none" },
          containedPrimary: { backgroundColor: "#B39DDB", color: "#000000" },
          containedSuccess: { backgroundColor: "#C8E6C9", color: "#000000" },
          containedError: { backgroundColor: "#FFCDD2", color: "#000000" },
          containedSecondary: { backgroundColor: "#81D4FA", color: "#000000" },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: "none", color: "#757575", "&.Mui-selected": { color: "#B39DDB", fontWeight: 500 } } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)", backgroundImage: "none",
            border: "1px solid rgba(179, 157, 219, 0.3)", borderRadius: "0px",
            boxShadow: "0 8px 32px rgba(179, 157, 219, 0.2)",
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: "#424242" } } },
      MuiDialogContentText: { styleOverrides: { root: { color: "#757575" } } },
      MuiChip: {
        styleOverrides: {
          root: { color: "#424242", margin: "2px", borderRadius: "0px", fontWeight: 500, backgroundColor: "rgba(179, 157, 219, 0.1)" },
          deleteIcon: { color: "rgba(0, 0, 0, 0.54)", "&:hover": { color: "rgba(0, 0, 0, 0.87)" } },
        },
      },
    },
  }),
}

// Per-theme blob definitions
export const themeBlobs = {
  dark:         { base: "#080810", b1: "#3d1aff", b2: "#c020c0", b3: "#0a2a6e" },
  light:        { base: "#ddd8f0", b1: "#a070ff", b2: "#ff70c0", b3: "#70a0ff" },
  ocean:        { base: "#010d1f", b1: "#0057ff", b2: "#00c8ff", b3: "#0030a0" },
  forest:       { base: "#0a140a", b1: "#1a7a30", b2: "#50c878", b3: "#0d4020" },
  purpleHaze:   { base: "#0a0010", b1: "#7000ff", b2: "#c000ff", b3: "#3300aa" },
  sunny:        { base: "#fff5cc", b1: "#ffb300", b2: "#ff7043", b3: "#fdd835" },
  grayscale:    { base: "#0a0a0a", b1: "#505050", b2: "#888888", b3: "#303030" },
  retro:        { base: "#050f18", b1: "#00bcd4", b2: "#ffeb3b", b3: "#005f70" },
  sunset:       { base: "#100400", b1: "#ff4500", b2: "#ff8c00", b3: "#c2185b" },
  midnight:     { base: "#02000f", b1: "#4040ff", b2: "#00e5ff", b3: "#200060" },
  vibrantGreen: { base: "#e0ffe0", b1: "#00c853", b2: "#64dd17", b3: "#00e5ff" },
  softPastel:   { base: "#f0ecff", b1: "#b39ddb", b2: "#f48fb1", b3: "#90caf9" },
}
