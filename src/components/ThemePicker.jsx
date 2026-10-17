import React, { useState, useEffect, useRef } from "react"
import { Box, Typography, InputBase, Drawer, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { notebookBg } from "../themes"

// ── Static swatch metadata for each theme key ─────────────────────────────────
// [bgColor, primaryColor, secondaryColor, textColor]
const THEME_SWATCHES = {
  dark:         ["#0e0e14", "#9CE0FF", "#B0C4DE", "#E6E1E5"],
  light:        ["#f2f0fa", "#6200EE", "#03DAC6", "#212121"],
  ocean:        ["#04101f", "#81D4FA", "#4DD0E1", "#E1F5FE"],
  forest:       ["#0a1410", "#A8E6CF", "#6BCB77", "#C8E6C9"],
  purpleHaze:   ["#0c0016", "#BB86FC", "#03DAC6", "#FFFFFF"],
  sunny:        ["#fffdf0", "#FFC107", "#8BC34A", "#212121"],
  grayscale:    ["#111111", "#BDBDBD", "#9E9E9E", "#FFFFFF"],
  retro:        ["#060e18", "#00BCD4", "#FFEB3B", "#263238"],
  sunset:       ["#120500", "#FF7043", "#FFCA28", "#FFFDE7"],
  midnight:     ["#030010", "#A7A7FF", "#64FFDA", "#E0E0FF"],
  vibrantGreen: ["#edfff0", "#76FF03", "#00E5FF", "#212121"],
  softPastel:   ["#f8f4ff", "#B39DDB", "#81D4FA", "#424242"],
  cream:        ["#fdf6e3", "#7B5E3A", "#B58B5A", "#3E2A0F"],
  ivory:        ["#fffff0", "#5C6E4A", "#8A7A5A", "#2C2C1A"],
  brightWhite:  ["#ffffff", "#1565C0", "#0097A7", "#111111"],
  black:        ["#0a0a0a", "#E0E0E0", "#9E9E9E", "#EEEEEE"],
  pastelPink:   ["#fff0f6", "#C2185B", "#AD1457", "#2D1A24"],
  pastelBlue:   ["#f0f8ff", "#0277BD", "#0288D1", "#0D1B2A"],
  pastelGreen:  ["#f0fff4", "#2E7D32", "#00695C", "#0D2410"],
  pastelYellow: ["#fffde7", "#F57F17", "#FF8F00", "#2A1F00"],
  pastelPurple: ["#f8f0ff", "#6A1B9A", "#7B1FA2", "#1A0A28"],
}

const THEME_LABELS = {
  dark:         "Dark",
  light:        "Light",
  ocean:        "Ocean",
  forest:       "Forest",
  purpleHaze:   "Purple Haze",
  sunny:        "Sunny",
  grayscale:    "Grayscale",
  retro:        "Retro",
  sunset:       "Sunset",
  midnight:     "Midnight",
  vibrantGreen: "Vibrant Green",
  softPastel:   "Soft Pastel",
  cream:        "Cream",
  ivory:        "Ivory",
  brightWhite:  "Bright White",
  black:        "Black",
  pastelPink:   "Pastel Pink",
  pastelBlue:   "Pastel Blue",
  pastelGreen:  "Pastel Green",
  pastelYellow: "Pastel Yellow",
  pastelPurple: "Pastel Purple",
}

const GROUPS = [
  {
    label: "Dark",
    keys: ["dark", "black", "grayscale", "purpleHaze", "ocean", "forest", "sunset", "midnight"],
  },
  {
    label: "Light",
    keys: ["light", "sunny", "vibrantGreen", "softPastel", "retro"],
  },
  {
    label: "Notebook",
    keys: ["cream", "ivory", "brightWhite", "pastelPink", "pastelBlue", "pastelGreen", "pastelYellow", "pastelPurple"],
  },
]

// ── Single theme card ─────────────────────────────────────────────────────────
function ThemeCard({ themeKey, isActive, onClick }) {
  const [bg, primary, secondary, text] = THEME_SWATCHES[themeKey] || ["#111", "#fff", "#aaa", "#eee"]
  const label = THEME_LABELS[themeKey] || themeKey

  return (
    <Box
      onClick={() => onClick(themeKey)}
      title={label}
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        border: isActive
          ? `2px solid ${primary}`
          : "2px solid transparent",
        outline: isActive ? `3px solid ${primary}40` : "3px solid transparent",
        outlineOffset: "1px",
        transition: "all 0.15s ease",
        "&:hover": {
          border: `2px solid ${primary}cc`,
          transform: "translateY(-2px)",
          boxShadow: `0 6px 20px ${primary}33`,
        },
        "&:hover .theme-card-label": { opacity: 1 },
      }}
    >
      {/* Color preview block */}
      <Box sx={{ backgroundColor: bg, height: 52, display: "flex", alignItems: "stretch" }}>
        {/* Left strip: primary */}
        <Box sx={{ width: "40%", backgroundColor: primary, opacity: 0.9 }} />
        {/* Right two strips */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, backgroundColor: secondary, opacity: 0.75 }} />
          <Box sx={{ flex: 1, backgroundColor: text, opacity: 0.35 }} />
        </Box>
      </Box>
      {/* Label */}
      <Box
        className="theme-card-label"
        sx={{
          backgroundColor: bg,
          borderTop: `1px solid ${primary}30`,
          px: 0.75,
          py: 0.5,
          opacity: isActive ? 1 : 0.85,
          transition: "opacity 0.15s",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: text,
            fontWeight: isActive ? 700 : 400,
            fontSize: "0.6rem",
            letterSpacing: "0.04em",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

// ── Main ThemePicker ──────────────────────────────────────────────────────────
export default function ThemePicker({ open, onClose, currentThemeName, setCurrentThemeName }) {
  const [search, setSearch] = useState("")
  const searchRef = useRef(null)

  // Focus search when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 120)
    } else {
      setSearch("")
    }
  }, [open])

  const query = search.toLowerCase()

  const filteredGroups = GROUPS.map((group) => ({
    ...group,
    keys: group.keys.filter((k) => {
      if (!query) return true
      return (THEME_LABELS[k] || k).toLowerCase().includes(query)
    }),
  })).filter((g) => g.keys.length > 0)

  const nb = notebookBg[currentThemeName] || notebookBg.dark
  const isDark = ["dark", "black", "grayscale", "purpleHaze", "ocean", "forest", "sunset", "midnight", "retro"].includes(currentThemeName)

  const drawerBg = isDark
    ? `color-mix(in srgb, ${nb.bg} 80%, #1a1a1a 20%)`
    : `color-mix(in srgb, ${nb.bg} 80%, #f5f5f5 20%)`

  const surfaceBg  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  const textPrimary = isDark ? "#e8e8e8" : "#1a1a1a"
  const textMuted   = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
  const [swatchBg] = THEME_SWATCHES[currentThemeName] || ["#111"]
  const [, swatchPrimary] = THEME_SWATCHES[currentThemeName] || ["#111", "#fff"]

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: drawerBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: `1px solid ${borderColor}`,
          borderRadius: "16px 16px 0 0",
          maxHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          // Suppress the MUI Paper override from the active theme
          // so the drawer always looks like its own surface
          "&&": { backgroundImage: "none", boxShadow: "none" },
        },
      }}
      ModalProps={{ keepMounted: false }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: textMuted,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            color: textPrimary,
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flexShrink: 0,
            mt: 0.5,
          }}
        >
          Theme
        </Typography>

        {/* Active theme mini badge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            backgroundColor: surfaceBg,
            border: `1px solid ${swatchPrimary}50`,
            borderRadius: "20px",
            px: 1.25,
            py: 0.25,
            mt: 0.5,
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: swatchPrimary,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: textPrimary, fontWeight: 600, fontSize: "0.68rem", whiteSpace: "nowrap" }}
          >
            {THEME_LABELS[currentThemeName] || currentThemeName}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            backgroundColor: surfaceBg,
            border: `1px solid ${borderColor}`,
            borderRadius: "8px",
            px: 1.25,
            py: 0.4,
            flexShrink: 0,
          }}
        >
          <SearchIcon sx={{ fontSize: 14, color: textMuted }} />
          <InputBase
            inputRef={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            sx={{
              color: textPrimary,
              fontSize: "0.8rem",
              width: 110,
              "& input": { padding: 0 },
              "& input::placeholder": { color: textMuted, opacity: 1 },
            }}
          />
          {search && (
            <Box
              component="span"
              onClick={() => setSearch("")}
              sx={{ cursor: "pointer", color: textMuted, lineHeight: 1, fontSize: 12, "&:hover": { color: textPrimary } }}
            >
              ✕
            </Box>
          )}
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: textMuted, ml: 0.5, "&:hover": { color: textPrimary } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Scrollable theme grid ───────────────────────────────────────── */}
      <Box sx={{ overflowY: "auto", flex: 1, px: 2.5, pb: 3 }}>
        {filteredGroups.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ color: textMuted, textAlign: "center", mt: 4 }}
          >
            No themes match "{search}"
          </Typography>
        ) : (
          filteredGroups.map((group) => (
            <Box key={group.label} sx={{ mt: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: textMuted,
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  display: "block",
                  mb: 1,
                }}
              >
                {group.label}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  gap: 1,
                }}
              >
                {group.keys.map((key) => (
                  <ThemeCard
                    key={key}
                    themeKey={key}
                    isActive={key === currentThemeName}
                    onClick={(k) => {
                      setCurrentThemeName(k)
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  )
}
