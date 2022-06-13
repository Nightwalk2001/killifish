import {appWindow}  from "@tauri-apps/api/window"
import React        from "react"
import ReactDOM     from "react-dom/client"
import {RecoilRoot} from "recoil"
import App          from "./App"
import "./styles/index.css"

const clickHandler = (id: string, handler: () => Promise<void>) =>
  document.getElementById(id)?.addEventListener("click", handler)

clickHandler("titlebar-minimize", appWindow.minimize)
clickHandler("titlebar-maximize", appWindow.toggleMaximize)
clickHandler("titlebar-close", appWindow.close)

// document.addEventListener(
//   "contextmenu",
//   e => {
//     e.preventDefault()
//     return false
//   },
//   {capture: true}
// )

const root = document.getElementById("root") as HTMLDivElement

ReactDOM.createRoot(root).render(<RecoilRoot><App/></RecoilRoot>)
