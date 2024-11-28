import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import './styles/index.css'
import { systemConfig } from "./theme"
import { Toaster } from "./components/ui/toaster"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={systemConfig}>
      <ThemeProvider attribute="class" disableTransitionOnChange >
        <Toaster />
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
