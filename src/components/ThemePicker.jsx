import React, { useState, useEffect, useRef } from "react"
import { Box, Typography, InputBase, Drawer, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { MT_PALETTES } from "../themes"

// ── Pretty display names ─────────────────────────────────────────────────────
function toLabel(key) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Theme groups (Monkeytype-inspired categorization) ────────────────────────
const GROUPS = [
  {
    label: "Popular",
    keys: [
      "serika_dark", "serika", "dark", "catppuccin", "dracula", "nord",
      "rose_pine", "gruvbox_dark", "monokai", "onedark", "vscode", "github",
    ],
  },
  {
    label: "Dark",
    keys: [
      "8008", "aether", "alduin", "alpine", "anti_hero", "arch", "aurora",
      "bento", "bliss", "blue_dolphin", "blueberry_dark", "botanical",
      "bouquet", "bushido", "carbon", "chaos_theory", "cherry_blossom",
      "comfy", "copper", "cy_red", "cyberspace", "dark_magic_girl", "dark_note",
      "darling", "deku", "dev", "diner", "discord", "dots", "drowning",
      "earthsong", "everblush", "evil_eye", "ez_mode", "fire", "fledgling",
      "floret", "future_funk", "github", "grand_prix", "grape", "gruvbox_dark",
      "hammerhead", "horizon", "husqy", "iceberg_dark", "incognito", "ishtar",
      "iv_spade", "joker", "laser", "leather", "luna", "mashu", "matcha_moccha",
      "material", "matrix", "metaverse", "metropolis", "miami_nights", "midnight",
      "mint", "modern_dolch", "monokai", "moonlight", "mountain", "muted",
      "nautilus", "nebula", "night_runner", "nord", "norse", "oblivion",
      "olivia", "onedark", "pale_nimbus", "passion_fruit", "peach_blossom",
      "phantom", "pulse", "purpleish", "red_dragon", "red_samurai", "repose_dark",
      "rose_pine", "rose_pine_moon", "rudy", "ryujinscales", "serika_dark",
      "sewing_tin", "shadow", "solarized_dark", "solarized_osaka", "sonokai",
      "spiderman", "stealth", "striker", "suisei", "sunset", "superuser",
      "sweden", "terminal", "terra", "terror_below", "trance", "tron_orange",
      "vaporwave", "vesper", "viridescent", "voc", "vscode", "watermelon",
      "wavez",
    ],
  },
  {
    label: "Light",
    keys: [
      "9009", "beach", "bingsu", "blueberry_light", "breeze", "cafe",
      "camping", "cheesecake", "darling", "desert_oasis", "dino", "dmg",
      "dollar", "dualshot", "fleuriste", "froyo", "fruit_chew", "fundamentals",
      "godspeed", "gruvbox_light", "hanok", "honey", "iceberg_light",
      "iv_clover", "lavender", "lil_dragon", "lilac_mist", "lime", "magic_girl",
      "mexican", "miami", "milkshake", "mizu", "modern_dolch_light", "modern_ink",
      "mr_sleeves", "ms_cupcakes", "nord_light", "olive", "our_theme", "paper",
      "pastel", "peaches", "pink_lemonade", "rainbow_trail", "repose_light",
      "retro", "rose_pine_dawn", "serika", "sewing_tin_light", "shoko",
      "slambook", "snes", "soaring_skies", "solarized_light", "strawberry",
      "tangerine", "taro", "terrazzo", "tiramisu", "vesper_light",
      "witch_girl",
    ],
  },
  {
    label: "Nature",
    keys: [
      "botanical", "camping", "earthsong", "everblush", "floret", "graen",
      "gruvbox_dark", "gruvbox_light", "hedge", "matcha_moccha", "mint",
      "olive", "terra", "terror_below", "viridescent", "wavez", "watermelon",
    ],
  },
  {
    label: "Colorful",
    keys: [
      "aurora", "chaos_theory", "frozen_llama", "future_funk", "grape",
      "horizon", "joker", "laser", "miami", "miami_nights", "nebula",
      "our_theme", "pale_nimbus", "pastel", "rainbow_trail", "retrocast",
      "rgb", "ryujinscales", "tron_orange", "vaporwave",
    ],
  },
]

// De-duplicate: each key appears only in its first matching group
const seen = new Set()
const DEDUPED_GROUPS = GROUPS.map((g) => ({
  ...g,
  keys: g.keys.filter((k) => {
    if (seen.has(k) || !MT_PALETTES[k]) return false
    seen.add(k)
    return true
  }),
})).filter((g) => g.keys.length > 0)

// Catch-all: any palette key not yet in a group
const ALL_KEYS = Object.keys(MT_PALETTES)
const uncategorized = ALL_KEYS.filter((k) => !seen.has(k))
if (uncategorized.length > 0) {
  DEDUPED_GROUPS.push({ label: "Other", keys: uncategorized.sort() })
}

// ── Luminance helper ─────────────────────────────────────────────────────────
function isLight(hex) {
  const h = hex.replace("#", "").padEnd(6, "0")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

// ── Single theme card ─────────────────────────────────────────────────────────
function ThemeCard({ themeKey, isActive, onClick }) {
  const { bg, main, sub, text } = MT_PALETTES[themeKey]
  const label = toLabel(themeKey)

  return (
    <Box
      onClick={() => onClick(themeKey)}
      title={label}
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        border: isActive ? `2px solid ${main}` : "2px solid transparent",
        outline: isActive ? `3px solid ${main}40` : "3px solid transparent",
        outlineOffset: "1px",
        transition: "all 0.12s ease",
        "&:hover": {
          border: `2px solid ${main}cc`,
          transform: "translateY(-2px)",
          boxShadow: `0 6px 20px ${main}33`,
        },
      }}
    >
      {/* Color strips */}
      <Box sx={{ backgroundColor: bg, height: 44, display: "flex" }}>
        <Box sx={{ width: "50%", backgroundColor: main }} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, backgroundColor: sub }} />
          <Box sx={{ flex: 1, backgroundColor: text + "88" }} />
        </Box>
      </Box>
      {/* Label */}
      <Box sx={{ backgroundColor: bg, borderTop: `1px solid ${main}25`, px: 0.75, py: 0.4 }}>
        <Typography
          variant="caption"
          sx={{
            color: text,
            fontWeight: isActive ? 700 : 400,
            fontSize: "0.58rem",
            letterSpacing: "0.02em",
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

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 120)
    else setSearch("")
  }, [open])

  const query = search.toLowerCase().replace(/_/g, " ")

  // Search across all themes, flat
  const filteredGroups = search
    ? [{
        label: "Results",
        keys: ALL_KEYS.filter((k) =>
          toLabel(k).toLowerCase().includes(query) ||
          k.toLowerCase().replace(/_/g, " ").includes(query)
        ).sort(),
      }]
    : DEDUPED_GROUPS

  const activePalette = MT_PALETTES[currentThemeName] || MT_PALETTES.serika_dark
  const { bg, main, text: textColor, sub } = activePalette
  const bgIsLight = isLight(bg)

  const drawerBg   = bg
  const borderCol  = bgIsLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"
  const surfaceBg  = bgIsLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)"
  const textMuted  = bgIsLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.35)"

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
          borderTop: `1px solid ${borderCol}`,
          borderRadius: "16px 16px 0 0",
          maxHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          "&&": { backgroundImage: "none", boxShadow: "none" },
        },
      }}
      ModalProps={{ keepMounted: false }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: "flex", alignItems: "center", gap: 1.5, borderBottom: `1px solid ${borderCol}`, flexShrink: 0, position: "relative" }}>
        {/* Drag handle */}
        <Box sx={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 36, height: 4, borderRadius: 2, backgroundColor: textMuted }} />

        <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, mt: 0.25 }}>
          Theme
        </Typography>

        {/* Active theme badge */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, backgroundColor: surfaceBg, border: `1px solid ${main}50`, borderRadius: "20px", px: 1.25, py: 0.2, mt: 0.25, minWidth: 0, flexShrink: 0 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: main, flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: textColor, fontWeight: 600, fontSize: "0.65rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 100 }}>
            {toLabel(currentThemeName)}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Search */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, backgroundColor: surfaceBg, border: `1px solid ${borderCol}`, borderRadius: "8px", px: 1.25, py: 0.35, flexShrink: 0 }}>
          <SearchIcon sx={{ fontSize: 13, color: textMuted }} />
          <InputBase
            inputRef={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search themes"
            sx={{ color: textColor, fontSize: "0.78rem", width: 110, "& input": { padding: 0 }, "& input::placeholder": { color: textMuted, opacity: 1 } }}
          />
          {search && (
            <Box component="span" onClick={() => setSearch("")} sx={{ cursor: "pointer", color: textMuted, fontSize: 11, lineHeight: 1, "&:hover": { color: textColor } }}>✕</Box>
          )}
        </Box>

        <IconButton size="small" onClick={onClose} sx={{ color: textMuted, "&:hover": { color: textColor } }}>
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* ── Theme count ────────────────────────────────────────────────── */}
      <Box sx={{ px: 2.5, pt: 1, pb: 0.25, flexShrink: 0 }}>
        <Typography variant="caption" sx={{ color: textMuted, fontSize: "0.62rem" }}>
          {ALL_KEYS.length} themes
        </Typography>
      </Box>

      {/* ── Scrollable grid ────────────────────────────────────────────── */}
      <Box sx={{ overflowY: "auto", flex: 1, px: 2.5, pb: 3 }}>
        {filteredGroups.every((g) => g.keys.length === 0) ? (
          <Typography variant="body2" sx={{ color: textMuted, textAlign: "center", mt: 4 }}>
            No themes match "{search}"
          </Typography>
        ) : (
          filteredGroups.map((group) =>
            group.keys.length === 0 ? null : (
              <Box key={group.label} sx={{ mt: 2 }}>
                <Typography variant="overline" sx={{ color: textMuted, fontSize: "0.62rem", letterSpacing: "0.12em", fontWeight: 700, display: "block", mb: 0.75 }}>
                  {group.label}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 0.75 }}>
                  {group.keys.map((key) => (
                    <ThemeCard key={key} themeKey={key} isActive={key === currentThemeName} onClick={setCurrentThemeName} />
                  ))}
                </Box>
              </Box>
            )
          )
        )}
      </Box>
    </Drawer>
  )
}
