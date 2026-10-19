import React, { useState } from "react"
import { Box, Button, Typography, CircularProgress } from "@mui/material"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import FavoriteIcon from "@mui/icons-material/Favorite"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import BoltIcon from "@mui/icons-material/Bolt"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts"
import { signInWithGoogle } from "../firebase"

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Tomorrow:wght@400;600;700&family=Inter:wght@400;500&display=swap');
<<<<<<< HEAD
@keyframes floatUp {
  0%   { transform: translateY(0px)   rotate(0deg);  opacity: var(--op); }
  50%  { transform: translateY(-30px) rotate(10deg); opacity: calc(var(--op) * 1.4); }
  100% { transform: translateY(0px)   rotate(-5deg); opacity: var(--op); }
=======

@keyframes floatUp {
  0%   { transform: translateY(0px)   rotate(0deg);   opacity: var(--op); }
  50%  { transform: translateY(-30px) rotate(10deg);  opacity: calc(var(--op) * 1.4); }
  100% { transform: translateY(0px)   rotate(-5deg);  opacity: var(--op); }
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
}
@keyframes floatDiag {
  0%   { transform: translate(0px, 0px)    rotate(0deg);   opacity: var(--op); }
  33%  { transform: translate(12px, -20px) rotate(15deg);  opacity: calc(var(--op) * 1.3); }
  66%  { transform: translate(-8px, -35px) rotate(-10deg); opacity: calc(var(--op) * 0.7); }
  100% { transform: translate(0px, 0px)    rotate(0deg);   opacity: var(--op); }
}
@keyframes floatSpin {
  0%   { transform: translateY(0px)   rotate(0deg);   opacity: var(--op); }
  50%  { transform: translateY(-25px) rotate(180deg); opacity: calc(var(--op) * 1.5); }
  100% { transform: translateY(0px)   rotate(360deg); opacity: var(--op); }
}
`

<<<<<<< HEAD
const PARTICLES = [
  { icon: FitnessCenterIcon,     top: "8%",  left: "7%",  size: 28, anim: "floatUp",   dur: "6s",   delay: "0s",   op: 0.07 },
  { icon: WhatshotIcon,          top: "15%", left: "88%", size: 22, anim: "floatDiag", dur: "7.5s", delay: "1s",   op: 0.09 },
  { icon: DirectionsRunIcon,     top: "25%", left: "18%", size: 26, anim: "floatUp",   dur: "8s",   delay: "2s",   op: 0.06 },
  { icon: EmojiEventsIcon,       top: "30%", left: "78%", size: 20, anim: "floatSpin", dur: "9s",   delay: "0.5s", op: 0.08 },
  { icon: BoltIcon,              top: "42%", left: "5%",  size: 24, anim: "floatDiag", dur: "6.5s", delay: "3s",   op: 0.07 },
  { icon: TrackChangesIcon,      top: "45%", left: "92%", size: 22, anim: "floatUp",   dur: "7s",   delay: "1.5s", op: 0.06 },
  { icon: FavoriteIcon,          top: "58%", left: "13%", size: 20, anim: "floatSpin", dur: "8.5s", delay: "2.5s", op: 0.08 },
  { icon: ShowChartIcon,         top: "62%", left: "82%", size: 26, anim: "floatDiag", dur: "7s",   delay: "0s",   op: 0.07 },
  { icon: SelfImprovementIcon,   top: "72%", left: "22%", size: 24, anim: "floatUp",   dur: "9s",   delay: "1s",   op: 0.06 },
  { icon: SportsMartialArtsIcon, top: "78%", left: "70%", size: 22, anim: "floatDiag", dur: "6s",   delay: "3.5s", op: 0.08 },
  { icon: FitnessCenterIcon,     top: "85%", left: "40%", size: 20, anim: "floatSpin", dur: "7.5s", delay: "2s",   op: 0.05 },
  { icon: BoltIcon,              top: "90%", left: "8%",  size: 18, anim: "floatUp",   dur: "8s",   delay: "0.5s", op: 0.07 },
  { icon: EmojiEventsIcon,       top: "5%",  left: "55%", size: 22, anim: "floatDiag", dur: "7s",   delay: "4s",   op: 0.06 },
  { icon: WhatshotIcon,          top: "55%", left: "50%", size: 18, anim: "floatSpin", dur: "9.5s", delay: "1.5s", op: 0.05 },
  { icon: DirectionsRunIcon,     top: "92%", left: "62%", size: 24, anim: "floatUp",   dur: "6.5s", delay: "2.5s", op: 0.06 },
=======
// Each particle: position, size, animation, delay, opacity
const PARTICLES = [
  { icon: FitnessCenterIcon,      top:  "8%",  left: "7%",   size: 28, anim: "floatUp",   dur: "6s",  delay: "0s",    op: 0.07 },
  { icon: WhatshotIcon,           top: "15%",  left: "88%",  size: 22, anim: "floatDiag", dur: "7.5s",delay: "1s",    op: 0.09 },
  { icon: DirectionsRunIcon,      top: "25%",  left: "18%",  size: 26, anim: "floatUp",   dur: "8s",  delay: "2s",    op: 0.06 },
  { icon: EmojiEventsIcon,        top: "30%",  left: "78%",  size: 20, anim: "floatSpin", dur: "9s",  delay: "0.5s",  op: 0.08 },
  { icon: BoltIcon,               top: "42%",  left: "5%",   size: 24, anim: "floatDiag", dur: "6.5s",delay: "3s",    op: 0.07 },
  { icon: TrackChangesIcon,       top: "45%",  left: "92%",  size: 22, anim: "floatUp",   dur: "7s",  delay: "1.5s",  op: 0.06 },
  { icon: FavoriteIcon,           top: "58%",  left: "13%",  size: 20, anim: "floatSpin", dur: "8.5s",delay: "2.5s",  op: 0.08 },
  { icon: ShowChartIcon,          top: "62%",  left: "82%",  size: 26, anim: "floatDiag", dur: "7s",  delay: "0s",    op: 0.07 },
  { icon: SelfImprovementIcon,    top: "72%",  left: "22%",  size: 24, anim: "floatUp",   dur: "9s",  delay: "1s",    op: 0.06 },
  { icon: SportsMartialArtsIcon,  top: "78%",  left: "70%",  size: 22, anim: "floatDiag", dur: "6s",  delay: "3.5s",  op: 0.08 },
  { icon: FitnessCenterIcon,      top: "85%",  left: "40%",  size: 20, anim: "floatSpin", dur: "7.5s",delay: "2s",    op: 0.05 },
  { icon: BoltIcon,               top: "90%",  left: "8%",   size: 18, anim: "floatUp",   dur: "8s",  delay: "0.5s",  op: 0.07 },
  { icon: EmojiEventsIcon,        top: "5%",   left: "55%",  size: 22, anim: "floatDiag", dur: "7s",  delay: "4s",    op: 0.06 },
  { icon: WhatshotIcon,           top: "55%",  left: "50%",  size: 18, anim: "floatSpin", dur: "9.5s",delay: "1.5s",  op: 0.05 },
  { icon: DirectionsRunIcon,      top: "92%",  left: "62%",  size: 24, anim: "floatUp",   dur: "6.5s",delay: "2.5s",  op: 0.06 },
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
]

function FloatingIcons() {
  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {PARTICLES.map((p, i) => {
        const Icon = p.icon
        return (
<<<<<<< HEAD
          <Box key={i} sx={{
            position: "absolute", top: p.top, left: p.left,
            "--op": p.op, opacity: p.op, color: "#fff",
            animation: `${p.anim} ${p.dur} ${p.delay} ease-in-out infinite`,
          }}>
=======
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: p.top,
              left: p.left,
              "--op": p.op,
              opacity: p.op,
              animation: `${p.anim} ${p.dur} ${p.delay} ease-in-out infinite`,
              color: "#fff",
            }}
          >
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
            <Icon sx={{ fontSize: p.size }} />
          </Box>
        )
      })}
    </Box>
  )
}

export default function AuthScreen() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  const handleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      await signInWithGoogle()
    } catch (e) {
      if (e.code !== "auth/popup-closed-by-user") {
        setError("Sign-in failed. Please try again.")
      }
      setLoading(false)
    }
  }

  return (
    <>
      <style>{FONT_STYLE}</style>
<<<<<<< HEAD
      <Box sx={{ minHeight: "100vh", backgroundColor: "#000", position: "relative" }}>
        <FloatingIcons />
        <Box sx={{
          position: "relative", zIndex: 1, minHeight: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", px: 2,
        }}>
          <Box sx={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", alignItems: "center" }}>

            <Typography sx={{
              fontFamily: "'Tomorrow', sans-serif", fontSize: "2.25rem", fontWeight: 700,
              letterSpacing: "0.04em", color: "#fff", lineHeight: 1, mb: 1, textTransform: "uppercase",
            }}>
              GAINSS
            </Typography>
            <Typography sx={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", mb: 5,
            }}>
              Fitness Tracker
            </Typography>
            <Typography sx={{
              fontFamily: "'Tomorrow', sans-serif", fontSize: "1.2rem", fontWeight: 600,
              color: "#fff", textAlign: "center", mb: 0.75, width: "100%",
=======

      <Box sx={{ minHeight: "100vh", backgroundColor: "#000", position: "relative" }}>

        <FloatingIcons />

        {/* Centered content */}
        <Box sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}>
          <Box sx={{
            width: "100%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>

            {/* Wordmark */}
            <Typography sx={{
              fontFamily: "'Tomorrow', sans-serif",
              fontSize: "2.25rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#fff",
              lineHeight: 1,
              mb: 1,
              textTransform: "uppercase",
            }}>
              GAINSS
            </Typography>

            {/* Subtitle */}
            <Typography sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 5,
            }}>
              Fitness Tracker
            </Typography>

            {/* Heading */}
            <Typography sx={{
              fontFamily: "'Tomorrow', sans-serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#fff",
              textAlign: "center",
              mb: 0.75,
              width: "100%",
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
            }}>
              Sign in to Gainss
            </Typography>
            <Typography sx={{
<<<<<<< HEAD
              fontFamily: "'Inter', sans-serif", fontSize: "0.82rem",
              color: "rgba(255,255,255,0.38)", textAlign: "center", mb: 3.5,
=======
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.38)",
              textAlign: "center",
              mb: 3.5,
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
            }}>
              Your fitness data, synced across all devices
            </Typography>

<<<<<<< HEAD
            <Box sx={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.07)", mb: 3 }} />

            <Button fullWidth onClick={handleSignIn} disabled={loading} sx={{
              height: 44, borderRadius: "8px", backgroundColor: "#1a1a1a", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem",
              textTransform: "none", letterSpacing: "0.01em",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", gap: 1.5,
              "&:hover": { backgroundColor: "#252525", borderColor: "rgba(255,255,255,0.2)" },
              "&:active": { backgroundColor: "#111" },
              "&.Mui-disabled": { color: "rgba(255,255,255,0.25)" },
              transition: "all 0.12s ease",
            }}>
              {loading
                ? <CircularProgress size={16} thickness={5} sx={{ color: "rgba(255,255,255,0.5)" }} />
                : <Box component="img" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" sx={{ width: 18, height: 18, flexShrink: 0 }} />
              }
=======
            {/* Divider */}
            <Box sx={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.07)", mb: 3 }} />

            {/* Google sign-in button */}
            <Button
              fullWidth
              onClick={handleSignIn}
              disabled={loading}
              sx={{
                height: 44,
                borderRadius: "8px",
                backgroundColor: "#1a1a1a",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                textTransform: "none",
                letterSpacing: "0.01em",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": {
                  backgroundColor: "#252525",
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:active": { backgroundColor: "#111" },
                "&.Mui-disabled": { color: "rgba(255,255,255,0.25)" },
                transition: "all 0.12s ease",
              }}
            >
              {loading ? (
                <CircularProgress size={16} thickness={5} sx={{ color: "rgba(255,255,255,0.5)" }} />
              ) : (
                <Box
                  component="img"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                  sx={{ width: 18, height: 18, flexShrink: 0 }}
                />
              )}
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
              {loading ? "Signing in…" : "Continue with Google"}
            </Button>

            {error && (
<<<<<<< HEAD
              <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#ff4444", textAlign: "center", mt: 2 }}>
=======
              <Typography sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "#ff4444",
                textAlign: "center",
                mt: 2,
              }}>
>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
                {error}
              </Typography>
            )}

<<<<<<< HEAD
            <Typography sx={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.68rem",
              color: "rgba(255,255,255,0.16)", textAlign: "center", mt: 4, lineHeight: 1.7,
            }}>
              By continuing, your data is stored privately<br />under your own Google account.
            </Typography>
          </Box>
        </Box>

        <Typography sx={{
          position: "fixed", bottom: 24, left: 0, right: 0, textAlign: "center",
          fontFamily: "'Inter', sans-serif", fontSize: "0.68rem",
          color: "rgba(255,255,255,0.12)", zIndex: 1,
        }}>
          Made with ❤️ by Shamsul Arifin
        </Typography>
=======
            {/* Privacy note */}
            <Typography sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.16)",
              textAlign: "center",
              mt: 4,
              lineHeight: 1.7,
            }}>
              By continuing, your data is stored privately<br />
              under your own Google account.
            </Typography>

          </Box>
        </Box>

        {/* Footer */}
        <Typography sx={{
          position: "fixed",
          bottom: 24,
          left: 0, right: 0,
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.68rem",
          color: "rgba(255,255,255,0.12)",
          zIndex: 1,
        }}>
          Made with ❤️ by Shamsul Arifin
        </Typography>

>>>>>>> 597334a677ef07ef70a93389dd2fd7ea5a84af01
      </Box>
    </>
  )
}
