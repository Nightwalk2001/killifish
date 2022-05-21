import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {appWindow} from "@tauri-apps/api/window"
import "./styles/index.css"

const clickHandler = (id: string, handler: () => Promise<void>) =>
  document.getElementById(id)?.addEventListener("click", handler)

clickHandler("titlebar-minimize", appWindow.minimize)
clickHandler("titlebar-maximize", appWindow.toggleMaximize)
clickHandler("titlebar-close", appWindow.close)

const root = document.getElementById("root") as HTMLDivElement

ReactDOM.createRoot(root).render(<App/>)
