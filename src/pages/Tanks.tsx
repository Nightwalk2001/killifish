import {API_URL, getter}            from "@/libs"
import {fetch}                      from "@tauri-apps/api/http"
import {useEffect, useState}        from "react"
import {useParams, useResolvedPath} from "react-router-dom"

const Tanks = () => {
  const {name} = useParams()

  const [tanks, setTanks] = useState<Tank[]>()

  const fetchTanks = async () => {
    const res = await fetch<Tank[]>(API_URL + `/tanks?name=${name}`).then(r => r.data)
    setTanks(res)
  }

  useEffect(() => {
    fetchTanks().then()
  }, [name])

  return <main>
   <div className={"grid grid-cols-5 place-content-center gap-x-3 gap-y-2 pl-8 pr-6 my-4 overflow-y-scroll"}>
     {tanks && tanks.map(d =>
       <div key={d.id} className={"px-2 py-1.5 text-white bg-indigo-300 rounded-md"}>
         <div>鱼缸编号：{d.id}</div>
         <div>所有者：{d.owner}</div>
         <div>鳉鱼数量：{d.amount}</div>
       </div>
     )}
   </div>
  </main>
}

export default Tanks
