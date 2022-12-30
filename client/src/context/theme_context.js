import { useState, createContext, useContext, useEffect } from "react";

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {

  let defaultTheme = localStorage ? localStorage.getItem("theme") : "light"

  const [theme, setTheme] = useState(defaultTheme);

  function changeTheme(value) {
    setTheme(value)
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
