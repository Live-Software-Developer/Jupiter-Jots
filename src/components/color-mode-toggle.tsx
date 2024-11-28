import { IconButton } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <IconButton aria-label="toggle color mode" onClick={toggleColorMode} size={'sm'} variant={'plain'}>
      {theme === "light" ? <LuMoon /> : <LuSun />}
    </IconButton>
  )
}
