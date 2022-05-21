import {TopBar}                                 from "@/widgets"
import React                                    from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {RecoilRoot}                             from "recoil"

const SignIn = React.lazy(() => import("@/pages/SignIn"))
const Workspace = React.lazy(() => import("@/pages/Workspace"))
const Management = React.lazy(() => import("@/pages/Management"))
const Tanks = React.lazy(() => import("@/pages/Tanks"))
const NotFound = React.lazy(() => import("@/pages/NotFound"))

const suspense = (element: React.ReactNode) =>
  <React.Suspense fallback={"loading..."}>
    {element}
  </React.Suspense>

const App = () => <RecoilRoot>
  <Router>
    <TopBar/>

    <div className={"w-screen"}>
      <Routes>
        <Route path={"/"} element={suspense(<SignIn/>)}/>
        <Route path={"/workspace"} element={suspense(<Workspace/>)}/>
        <Route path={"/management"} element={suspense(<Management/>)}/>
        <Route path={"/tanks/:name"} element={suspense(<Tanks/>)}/>
        <Route path={"*"} element={suspense(<NotFound/>)}/>
      </Routes>
    </div>
  </Router>
</RecoilRoot>

export default App
