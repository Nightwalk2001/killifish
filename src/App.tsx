import {store}                                                    from "@/libs"
import {Homepage, Management, NotFound, SignIn, Workspace, Tanks} from "@/pages"
import {profileAtom, showTopAtom}                                 from "@/stores"
import {TopBar}                                                   from "@/widgets"
import React, {useEffect}                                         from "react"
import {BrowserRouter as Router, Route, Routes}                   from "react-router-dom"
import {useRecoilState}                                           from "recoil"

const App = () => {
  const [profile, setProfile] = useRecoilState(profileAtom),
        [showTop, setShowTop] = useRecoilState(showTopAtom)

  useEffect(() => {
    const loadPrevious = async () => {
      const prev = await store.get<Profile>("profile")

      if (prev && prev != profile) {
        setProfile(prev)
        setShowTop(true)
      }
    }

    loadPrevious().then()
  }, [])

  const index = profile ? <Homepage/> : <SignIn/>

  return <Router>
    <TopBar/>

    <div className={"w-screen"}>
      <Routes>
        <Route path={"/"} element={index}/>
        <Route path={"/workspace"} element={<Workspace/>}/>
        <Route path={"/management"} element={<Management/>}/>
        <Route path={"/tanks/:name"} element={<Tanks/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    </div>
  </Router>
}

export default App
