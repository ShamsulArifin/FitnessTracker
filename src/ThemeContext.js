import React, { createContext, useState, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { themes } from "./themes"

export const ThemeContext = createContext()

export const ThemeProviderWrapper = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState(() => {
    return localStorage.getItem("appTheme") || "serika_dark"
  })

  const selectedTheme = themes[currentThemeName] || themes.serika_dark

  useEffect(() => {
    localStorage.setItem("appTheme", currentThemeName)
  }, [currentThemeName])

  return (
    <ThemeContext.Provider value={{ currentThemeName, setCurrentThemeName }}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
