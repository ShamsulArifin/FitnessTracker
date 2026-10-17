import { createTheme } from "@mui/material/styles"

// ── Monkeytype color palette per theme ───────────────────────────────────────
// Fields: bg, main (accent/caret), sub (secondary text), text (primary text)
// Sourced directly from monkeytypegame/monkeytype frontend/src/ts/constants/themes.ts
export const MT_PALETTES = {
  "9009":                { bg: "#f5f5ed", main: "#8c8f8a", sub: "#b2b5b0", text: "#2b2f2c" },
  "80s_after_dark":      { bg: "#1a1a2e", main: "#e94560", sub: "#16213e", text: "#e0e0e0" },
  "8008":                { bg: "#111", main: "#eee", sub: "#444", text: "#eee" },
  aether:                { bg: "#101820", main: "#eedaea", sub: "#cf6bdd", text: "#eedaea" },
  alduin:                { bg: "#1c1c1c", main: "#dfd7af", sub: "#444444", text: "#f5f3ed" },
  alpine:                { bg: "#6c687f", main: "#ffffff", sub: "#9994b8", text: "#ffffff" },
  anti_hero:             { bg: "#00002e", main: "#ffadad", sub: "#ff3d8b", text: "#f1deef" },
  arch:                  { bg: "#0c0d11", main: "#7ebab5", sub: "#454864", text: "#f6f5f5" },
  aurora:                { bg: "#011926", main: "#00e980", sub: "#245c69", text: "#ffffff" },
  beach:                 { bg: "#ffeead", main: "#96ceb4", sub: "#ffcc5c", text: "#5b7869" },
  bento:                 { bg: "#2d394d", main: "#ff7a90", sub: "#4a768d", text: "#fffaf8" },
  bingsu:                { bg: "#b8a7aa", main: "#83616e", sub: "#48373d", text: "#ebe6ea" },
  bliss:                 { bg: "#262727", main: "#f0d3c9", sub: "#665957", text: "#ffffff" },
  blue_dolphin:          { bg: "#003950", main: "#ffcefb", sub: "#00e4ff", text: "#82eaff" },
  blueberry_dark:        { bg: "#212b42", main: "#add7ff", sub: "#5c7da5", text: "#91b4d5" },
  blueberry_light:       { bg: "#dae0f5", main: "#506477", sub: "#92a4be", text: "#678198" },
  botanical:             { bg: "#7b9c98", main: "#eaf1f3", sub: "#495755", text: "#eaf1f3" },
  bouquet:               { bg: "#173f35", main: "#eaa09c", sub: "#408e7b", text: "#e9e0d2" },
  breeze:                { bg: "#e8d5c4", main: "#7d67a9", sub: "#3a98b9", text: "#1b4c5e" },
  bushido:               { bg: "#242933", main: "#ec4c56", sub: "#596172", text: "#f6f0e9" },
  cafe:                  { bg: "#ceb18d", main: "#14120f", sub: "#d4d2d1", text: "#14120f" },
  camping:               { bg: "#faf1e4", main: "#618c56", sub: "#c2b8aa", text: "#3c403b" },
  carbon:                { bg: "#313131", main: "#f66e0d", sub: "#616161", text: "#f5e6c8" },
  catppuccin:            { bg: "#1e1e2e", main: "#cba6f7", sub: "#7f849c", text: "#cdd6f4" },
  chaos_theory:          { bg: "#141221", main: "#fd77d7", sub: "#676e8a", text: "#dde5ed" },
  cheesecake:            { bg: "#fdf0d5", main: "#8e2949", sub: "#d91c81", text: "#3a3335" },
  cherry_blossom:        { bg: "#323437", main: "#d65ccc", sub: "#787d82", text: "#d1d0c5" },
  comfy:                 { bg: "#4a5b6e", main: "#f8cdc6", sub: "#9ec1cc", text: "#f5efee" },
  copper:                { bg: "#442f29", main: "#b46a55", sub: "#7ebab5", text: "#e7e0de" },
  creamsicle:            { bg: "#ff9869", main: "#fcfcf8", sub: "#ff661f", text: "#fcfcf8" },
  cy_red:                { bg: "#6e2626", main: "#e55050", sub: "#ff6060", text: "#ffaaaa" },
  cyberspace:            { bg: "#181c18", main: "#00ce7c", sub: "#9578d3", text: "#c2fbe1" },
  dark_magic_girl:       { bg: "#091f2c", main: "#f5b1cc", sub: "#93e8d3", text: "#a288d9" },
  dark_note:             { bg: "#1f1f1f", main: "#f2c17b", sub: "#768f95", text: "#d2dff4" },
  dark:                  { bg: "#111111", main: "#eeeeee", sub: "#444444", text: "#eeeeee" },
  darling:               { bg: "#fec8cd", main: "#ffffff", sub: "#a30000", text: "#ffffff" },
  deku:                  { bg: "#058b8c", main: "#b63530", sub: "#255458", text: "#f7f2ea" },
  desert_oasis:          { bg: "#fff2d5", main: "#d19d01", sub: "#0061fe", text: "#332800" },
  dev:                   { bg: "#1b2028", main: "#23a9d5", sub: "#4b5975", text: "#ccccb5" },
  diner:                 { bg: "#537997", main: "#c3af5b", sub: "#445c7f", text: "#dfdbc8" },
  dino:                  { bg: "#ffffff", main: "#40d672", sub: "#d5d5d5", text: "#1d221f" },
  discord:               { bg: "#313338", main: "#5a65ea", sub: "#565861", text: "#dcdee3" },
  dmg:                   { bg: "#dadbdc", main: "#ae185e", sub: "#3846b1", text: "#414141" },
  dollar:                { bg: "#e4e4d4", main: "#6b886b", sub: "#8a9b69", text: "#555a56" },
  dots:                  { bg: "#121520", main: "#ffffff", sub: "#676e8a", text: "#ffffff" },
  dracula:               { bg: "#282a36", main: "#bd93f9", sub: "#6272a4", text: "#f8f8f2" },
  drowning:              { bg: "#191826", main: "#4a6fb5", sub: "#50688c", text: "#9393a7" },
  dualshot:              { bg: "#737373", main: "#212222", sub: "#aaaaaa", text: "#212222" },
  earthsong:             { bg: "#292521", main: "#509452", sub: "#f5ae2d", text: "#e6c7a8" },
  everblush:             { bg: "#141b1e", main: "#8ccf7e", sub: "#838887", text: "#dadada" },
  evil_eye:              { bg: "#0084c2", main: "#f7f2ea", sub: "#01589f", text: "#171718" },
  ez_mode:               { bg: "#0068c6", main: "#fa62d5", sub: "#138bf7", text: "#ffffff" },
  fire:                  { bg: "#0f0000", main: "#b31313", sub: "#683434", text: "#ffffff" },
  fledgling:             { bg: "#3b363f", main: "#fc6e83", sub: "#8e5568", text: "#e6d5d3" },
  fleuriste:             { bg: "#c6b294", main: "#405a52", sub: "#64374d", text: "#091914" },
  floret:                { bg: "#00272c", main: "#ffdd6d", sub: "#779097", text: "#e5e5e5" },
  froyo:                 { bg: "#e1dacb", main: "#7b7d7d", sub: "#b29c5e", text: "#7b7d7d" },
  frozen_llama:          { bg: "#9bf2ea", main: "#6d44a6", sub: "#b690fd", text: "#ffffff" },
  fruit_chew:            { bg: "#d6d3d6", main: "#5c1e5f", sub: "#b49cb5", text: "#282528" },
  fundamentals:          { bg: "#727474", main: "#7fa482", sub: "#cac4be", text: "#131313" },
  future_funk:           { bg: "#2e1a47", main: "#f7f2ea", sub: "#c18fff", text: "#f7f2ea" },
  github:                { bg: "#212830", main: "#41ce5c", sub: "#788386", text: "#ccdae6" },
  godspeed:              { bg: "#eae4cf", main: "#9abbcd", sub: "#ada998", text: "#646669" },
  graen:                 { bg: "#303c36", main: "#a59682", sub: "#181d1a", text: "#a59682" },
  grand_prix:            { bg: "#36475c", main: "#c0d036", sub: "#5c6c80", text: "#c1c7d7" },
  grape:                 { bg: "#2c003e", main: "#ff8f00", sub: "#6e225e", text: "#ffffff" },
  gruvbox_dark:          { bg: "#282828", main: "#d79921", sub: "#665c54", text: "#ebdbb2" },
  gruvbox_light:         { bg: "#fbf1c7", main: "#689d6a", sub: "#a89984", text: "#3c3836" },
  hammerhead:            { bg: "#030613", main: "#4fcdb9", sub: "#213c53", text: "#e2f1f5" },
  hanok:                 { bg: "#d8d2c3", main: "#513a2a", sub: "#8b6f5c", text: "#393b3b" },
  hedge:                 { bg: "#415e31", main: "#6a994e", sub: "#ede5b4", text: "#f7f1d6" },
  honey:                 { bg: "#f2aa00", main: "#fff546", sub: "#a66b00", text: "#f3eecb" },
  horizon:               { bg: "#1c1e26", main: "#c4a88a", sub: "#db886f", text: "#bbbbbb" },
  husqy:                 { bg: "#000000", main: "#c58aff", sub: "#972fff", text: "#ebd7ff" },
  iceberg_dark:          { bg: "#161821", main: "#84a0c6", sub: "#595e76", text: "#c6c8d1" },
  iceberg_light:         { bg: "#e8e9ec", main: "#2d539e", sub: "#adb1c4", text: "#33374c" },
  incognito:             { bg: "#0e0e0e", main: "#ff9900", sub: "#555555", text: "#c6c6c6" },
  ishtar:                { bg: "#202020", main: "#91170c", sub: "#847869", text: "#fae1c3" },
  iv_clover:             { bg: "#a0a0a0", main: "#573e40", sub: "#353535", text: "#3b2d3b" },
  iv_spade:              { bg: "#0c0c0c", main: "#b7976a", sub: "#404040", text: "#d3c2c3" },
  joker:                 { bg: "#1a0e25", main: "#99de1e", sub: "#7554a3", text: "#e9e2f5" },
  laser:                 { bg: "#221b44", main: "#009eaf", sub: "#b82356", text: "#dbe7e8" },
  lavender:              { bg: "#ada6c2", main: "#e4e3e9", sub: "#e4e3e9", text: "#2f2a41" },
  leather:               { bg: "#a86948", main: "#ffe4bc", sub: "#81482b", text: "#ffe4bc" },
  lil_dragon:            { bg: "#ebe1ef", main: "#8a5bd6", sub: "#a28db8", text: "#212b43" },
  lilac_mist:            { bg: "#fffbfe", main: "#b94189", sub: "#e094c2", text: "#5c2954" },
  lime:                  { bg: "#7c878e", main: "#93c247", sub: "#4b5257", text: "#bfcfdc" },
  luna:                  { bg: "#221c35", main: "#f67599", sub: "#5a3a7e", text: "#ffe3eb" },
  macroblank:            { bg: "#b2d2c8", main: "#c13117", sub: "#717977", text: "#490909" },
  magic_girl:            { bg: "#ffffff", main: "#f5b1cc", sub: "#93e8d3", text: "#00ac8c" },
  mashu:                 { bg: "#2b2b2c", main: "#76689a", sub: "#d8a0a6", text: "#f1e2e4" },
  matcha_moccha:         { bg: "#523525", main: "#7ec160", sub: "#9e6749", text: "#ecddcc" },
  material:              { bg: "#263238", main: "#80cbc4", sub: "#4c6772", text: "#e6edf3" },
  matrix:                { bg: "#000000", main: "#15ff00", sub: "#006500", text: "#d1ffcd" },
  menthol:               { bg: "#00c18c", main: "#ffffff", sub: "#186544", text: "#ffffff" },
  metaverse:             { bg: "#232323", main: "#d82934", sub: "#5e5e5e", text: "#e8e8e8" },
  metropolis:            { bg: "#0f1f2c", main: "#56c3b7", sub: "#326984", text: "#e4edf1" },
  mexican:               { bg: "#f8ad34", main: "#b12189", sub: "#333333", text: "#eeeeee" },
  miami_nights:          { bg: "#18181a", main: "#e4609b", sub: "#47bac0", text: "#ffffff" },
  miami:                 { bg: "#f35588", main: "#05dfd7", sub: "#94294c", text: "#f0e9ec" },
  midnight:              { bg: "#0b0e13", main: "#60759f", sub: "#394760", text: "#9fadc6" },
  milkshake:             { bg: "#ffffff", main: "#212b43", sub: "#62cfe6", text: "#212b43" },
  mint:                  { bg: "#05385b", main: "#5cdb95", sub: "#20688a", text: "#edf5e1" },
  mizu:                  { bg: "#afcbdd", main: "#fcfbf6", sub: "#85a5bb", text: "#1a2633" },
  modern_dolch:          { bg: "#2d2e30", main: "#7eddd3", sub: "#54585c", text: "#e3e6eb" },
  modern_dolch_light:    { bg: "#dbdbdb", main: "#8fd1c3", sub: "#a3a2a2", text: "#454545" },
  modern_ink:            { bg: "#ffffff", main: "#ff360d", sub: "#b7b7b7", text: "#000000" },
  monokai:               { bg: "#272822", main: "#a6e22e", sub: "#e6db74", text: "#e2e2dc" },
  moonlight:             { bg: "#191f28", main: "#c69f68", sub: "#4b5975", text: "#ccccb5" },
  mountain:              { bg: "#0f0f0f", main: "#e7e7e7", sub: "#4c4c4c", text: "#e7e7e7" },
  mr_sleeves:            { bg: "#d1d7da", main: "#daa99b", sub: "#9a9fa1", text: "#1d1d1d" },
  ms_cupcakes:           { bg: "#ffffff", main: "#5ed5f3", sub: "#d64090", text: "#0a282f" },
  muted:                 { bg: "#525252", main: "#c5b4e3", sub: "#939eae", text: "#b1e4e3" },
  nautilus:              { bg: "#132237", main: "#ebb723", sub: "#0b4c6c", text: "#1cbaac" },
  nebula:                { bg: "#212135", main: "#be3c88", sub: "#19b3b8", text: "#838686" },
  night_runner:          { bg: "#212121", main: "#feff04", sub: "#5c4a9c", text: "#e8e8e8" },
  nord:                  { bg: "#242933", main: "#88c0d0", sub: "#929aaa", text: "#d8dee9" },
  nord_light:            { bg: "#eceff4", main: "#8fbcbb", sub: "#6a7791", text: "#8fbcbb" },
  norse:                 { bg: "#242425", main: "#2b5f6d", sub: "#505b5e", text: "#ccc2b1" },
  oblivion:              { bg: "#313231", main: "#a5a096", sub: "#5d6263", text: "#f7f5f1" },
  olive:                 { bg: "#e9e5cc", main: "#92946f", sub: "#b7b39e", text: "#373731" },
  olivia:                { bg: "#1c1b1d", main: "#deaf9d", sub: "#4e3e3e", text: "#f2efed" },
  onedark:               { bg: "#2f343f", main: "#61afef", sub: "#eceff4", text: "#98c379" },
  our_theme:             { bg: "#ce1226", main: "#fcd116", sub: "#6d0f19", text: "#ffffff" },
  pale_nimbus:           { bg: "#433e4c", main: "#94ffc2", sub: "#ffaca3", text: "#feffdb" },
  paper:                 { bg: "#eeeeee", main: "#444444", sub: "#b2b2b2", text: "#444444" },
  passion_fruit:         { bg: "#7c2142", main: "#f4a3b4", sub: "#9994b8", text: "#ffffff" },
  pastel:                { bg: "#e0b2bd", main: "#fbf4b6", sub: "#b4e9ff", text: "#6d5c6f" },
  peach_blossom:         { bg: "#292929", main: "#99b898", sub: "#616161", text: "#fecea8" },
  peaches:               { bg: "#e0d7c1", main: "#dd7a5f", sub: "#e7b28e", text: "#5f4c41" },
  phantom:               { bg: "#000011", main: "#7aa2f7", sub: "#414868", text: "#c0caf5" },
  pink_lemonade:         { bg: "#f6d992", main: "#f6a192", sub: "#f6b092", text: "#fcfcf8" },
  pulse:                 { bg: "#181818", main: "#17b8bd", sub: "#53565a", text: "#e5f4f4" },
  purpleish:             { bg: "#1e1e32", main: "#7a52cc", sub: "#5c5c99", text: "#a3a3cc" },
  rainbow_trail:         { bg: "#f5f5f5", main: "#363636", sub: "#4f4f4f", text: "#1f1f1f" },
  red_dragon:            { bg: "#1a0b0c", main: "#ff3a32", sub: "#e2a528", text: "#4a4d4e" },
  red_samurai:           { bg: "#84202c", main: "#c79e6e", sub: "#55131b", text: "#e2dad0" },
  repose_dark:           { bg: "#2f3338", main: "#d6d2bc", sub: "#8f8e84", text: "#d6d2bc" },
  repose_light:          { bg: "#efead0", main: "#5f605e", sub: "#8f8e84", text: "#333538" },
  retro:                 { bg: "#dad3c1", main: "#1d1b17", sub: "#918b7d", text: "#1d1b17" },
  retrocast:             { bg: "#07737a", main: "#88dbdf", sub: "#f3e03b", text: "#ffffff" },
  rgb:                   { bg: "#111111", main: "#eeeeee", sub: "#444444", text: "#eeeeee" },
  rose_pine:             { bg: "#1f1d27", main: "#9ccfd8", sub: "#c4a7e7", text: "#e0def4" },
  rose_pine_dawn:        { bg: "#fffaf3", main: "#56949f", sub: "#c4a7e7", text: "#286983" },
  rose_pine_moon:        { bg: "#2a273f", main: "#9ccfd8", sub: "#c4a7e7", text: "#e0def4" },
  rudy:                  { bg: "#1a2b3e", main: "#af8f5c", sub: "#3a506c", text: "#c9c8bf" },
  ryujinscales:          { bg: "#081426", main: "#f17754", sub: "#ffbc90", text: "#ffe4bc" },
  serika:                { bg: "#e1e1e3", main: "#e2b714", sub: "#aaaeb3", text: "#323437" },
  serika_dark:           { bg: "#323437", main: "#e2b714", sub: "#646669", text: "#d1d0c5" },
  sewing_tin:            { bg: "#241963", main: "#f2ce83", sub: "#446ad5", text: "#ffffff" },
  sewing_tin_light:      { bg: "#ffffff", main: "#2d2076", sub: "#385eca", text: "#2d2076" },
  shadow:                { bg: "#000000", main: "#eeeeee", sub: "#444444", text: "#eeeeee" },
  shoko:                 { bg: "#ced7e0", main: "#81c4dd", sub: "#7599b1", text: "#3b4c58" },
  slambook:              { bg: "#fffdde", main: "#03001c", sub: "#1c82ad", text: "#13005a" },
  snes:                  { bg: "#bfbec2", main: "#553d94", sub: "#9f8ad4", text: "#2e2e2e" },
  soaring_skies:         { bg: "#fff9f2", main: "#55c6f0", sub: "#1e107a", text: "#1d1e1e" },
  solarized_dark:        { bg: "#002b36", main: "#859900", sub: "#2aa198", text: "#268bd2" },
  solarized_light:       { bg: "#fdf6e3", main: "#859900", sub: "#2aa198", text: "#181819" },
  solarized_osaka:       { bg: "#00141a", main: "#859900", sub: "#2aa198", text: "#eee8d5" },
  sonokai:               { bg: "#2c2e34", main: "#9ed072", sub: "#e7c664", text: "#e2e2e3" },
  spiderman:             { bg: "#0d1219", main: "#e23636", sub: "#0476f2", text: "#f0f0f0" },
  stealth:               { bg: "#010203", main: "#383e42", sub: "#5e676e", text: "#383e42" },
  strawberry:            { bg: "#f37f83", main: "#fcfcf8", sub: "#e53c58", text: "#fcfcf8" },
  striker:               { bg: "#124883", main: "#d7dcda", sub: "#0f2d4e", text: "#d6dbd9" },
  suisei:                { bg: "#3b4a62", main: "#bef0ff", sub: "#fe9841", text: "#dbdeeb" },
  sunset:                { bg: "#211e24", main: "#f79777", sub: "#5b578e", text: "#f4e0c9" },
  superuser:             { bg: "#262a33", main: "#43ffaf", sub: "#526777", text: "#e5f7ef" },
  sweden:                { bg: "#0058a3", main: "#ffcc02", sub: "#57abdb", text: "#ffffff" },
  tangerine:             { bg: "#ffede0", main: "#fe5503", sub: "#ff9562", text: "#3d1705" },
  taro:                  { bg: "#b3baff", main: "#130f1a", sub: "#6f6c91", text: "#130f1a" },
  terminal:              { bg: "#191a1b", main: "#79a617", sub: "#48494b", text: "#e7eae0" },
  terra:                 { bg: "#0c100e", main: "#89c559", sub: "#436029", text: "#f0edd1" },
  terrazzo:              { bg: "#f1e5da", main: "#e0794e", sub: "#688e8f", text: "#023e3b" },
  terror_below:          { bg: "#0b1e1a", main: "#66ac92", sub: "#015c53", text: "#dceae5" },
  tiramisu:              { bg: "#cfc6b9", main: "#c0976f", sub: "#c0976f", text: "#7d5448" },
  trackday:              { bg: "#464d66", main: "#e0513e", sub: "#5c7eb9", text: "#cfcfcf" },
  trance:                { bg: "#00021b", main: "#e51376", sub: "#3c4c79", text: "#ffffff" },
  tron_orange:           { bg: "#0d1c1c", main: "#f0e800", sub: "#ff6600", text: "#ffffff" },
  vaporwave:             { bg: "#a4a7ea", main: "#e368da", sub: "#7c7faf", text: "#f1ebf1" },
  vesper:                { bg: "#101010", main: "#ffc799", sub: "#a0a0a0", text: "#ffffff" },
  vesper_light:          { bg: "#ffffff", main: "#fb7100", sub: "#a0a0a0", text: "#000000" },
  viridescent:           { bg: "#2c3333", main: "#95d5b2", sub: "#84a98c", text: "#e9f5db" },
  voc:                   { bg: "#190618", main: "#e0caac", sub: "#4c1e48", text: "#eeeae4" },
  vscode:                { bg: "#1e1e1e", main: "#007acc", sub: "#4d4d4d", text: "#d4d4d4" },
  watermelon:            { bg: "#1f4437", main: "#d6686f", sub: "#3e7a65", text: "#cdc6bc" },
  wavez:                 { bg: "#1c292f", main: "#6bde3b", sub: "#1f5e6b", text: "#e9efe6" },
  witch_girl:            { bg: "#f3dbda", main: "#56786a", sub: "#ddb4a7", text: "#56786a" },
}

// ── Shared font imports (injected once via the base theme override) ─────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&display=swap');`

// ── Detect if a hex color is "light" (for mode selection) ──────────────────
function isLight(hex) {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2).padStart(2, "0"), 16)
  const g = parseInt(h.slice(2, 4).padStart(2, "0"), 16)
  const b = parseInt(h.slice(4, 6).padStart(2, "0"), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

// ── Factory: build a full MUI theme from an MT palette ─────────────────────
function makeTheme({ bg, main, sub, text }) {
  const light = isLight(bg)
  return createTheme({
    palette: {
      mode: light ? "light" : "dark",
      primary:    { main, light: main, dark: main, contrastText: isLight(main) ? "#000" : "#fff" },
      secondary:  { main: sub,  light: sub,  dark: sub,  contrastText: isLight(sub)  ? "#000" : "#fff" },
      error:      { main: "#ca4754", light: "#e57373", dark: "#b71c1c", contrastText: "#fff" },
      success:    { main: "#80E280", light: "#A7F2A7", dark: "#008000", contrastText: "#000" },
      warning:    { main: "#FFA726", light: "#FFB74D", dark: "#F57C00", contrastText: "#000" },
      background: { default: bg, paper: bg },
      text:       { primary: text, secondary: sub, disabled: sub + "99" },
    },
    typography: {
      fontFamily: "DM Sans, sans-serif",
      h4: { fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "2.5rem" },
      h5: { fontFamily: "Barlow Condensed, sans-serif", fontWeight: 600, fontSize: "2rem" },
      h6: { fontFamily: "Barlow Condensed, sans-serif", fontWeight: 600, fontSize: "1.5rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.875rem" },
      button: { fontWeight: 500, fontSize: "0.875rem", textTransform: "none" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: FONT_IMPORT,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${main}28`,
            boxShadow: `0 8px 32px ${bg}88`,
            borderRadius: "6px",
            backgroundColor: bg + "ee",
            backgroundImage: "none",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& input[type="date"]': { colorScheme: light ? "light" : "dark" },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
            backgroundColor: light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)",
            color: text,
            borderRadius: "6px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: sub + "60" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: sub + "aa" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: main },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: sub, "&.Mui-focused": { color: main } },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: { color: text },
        },
      },
      MuiCheckbox: {
        styleOverrides: { root: { color: sub, "&.Mui-checked": { color: main } } },
      },
      MuiRadio: {
        styleOverrides: { root: { color: sub, "&.Mui-checked": { color: main } } },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "6px", textTransform: "none", fontWeight: 500, padding: "3px 10px", boxShadow: "none", "&:hover": { boxShadow: "none" } },
          containedPrimary:   { backgroundColor: main, color: isLight(main) ? "#000" : "#fff", "&:hover": { backgroundColor: main + "cc" } },
          containedSuccess:   { backgroundColor: "#80E280", color: "#000", "&:hover": { backgroundColor: "#A7F2A7" } },
          containedError:     { backgroundColor: "#ca4754", color: "#fff", "&:hover": { backgroundColor: "#e57373" } },
          containedSecondary: { backgroundColor: sub,  color: isLight(sub)  ? "#000" : "#fff", "&:hover": { backgroundColor: sub  + "cc" } },
          outlined: {
            borderColor: sub, color: text,
            "&:hover": { borderColor: main, color: main, backgroundColor: main + "11" },
          },
        },
      },
      MuiTab: {
        styleOverrides: { root: { textTransform: "none", color: sub, "&.Mui-selected": { color: main, fontWeight: 600 } } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: bg + "f0",
            backgroundImage: "none",
            border: `1px solid ${main}30`,
            borderRadius: "6px",
            boxShadow: `0 8px 32px ${bg}88`,
          },
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { color: text } } },
      MuiDialogContentText: { styleOverrides: { root: { color: sub } } },
      MuiChip: {
        styleOverrides: {
          root: {
            margin: "2px", borderRadius: "6px", fontWeight: 500,
            backgroundColor: main + "28",
            color: text,
          },
          deleteIcon: { color: sub, "&:hover": { color: text } },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: { "&.Mui-checked": { color: main }, "&.Mui-checked + .MuiSwitch-track": { backgroundColor: main } },
        },
      },
    },
  })
}

// ── Build the themes map ────────────────────────────────────────────────────
export const themes = Object.fromEntries(
  Object.entries(MT_PALETTES).map(([key, palette]) => [key, makeTheme(palette)])
)

// ── Notebook dot-grid background — derived from MT palette ─────────────────
// bg = page bg color, dot = subtle dot color
export const notebookBg = Object.fromEntries(
  Object.entries(MT_PALETTES).map(([key, { bg, sub }]) => {
    const light = isLight(bg)
    return [key, {
      bg,
      dot: light ? sub + "44" : sub + "33",
      dotSize: 1.5,
      spacing: 24,
    }]
  })
)

// themeBlobs kept as empty for compatibility (unused)
export const themeBlobs = {}
