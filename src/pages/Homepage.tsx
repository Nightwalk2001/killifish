import {useFaceted, useName, useSearch} from "@/hooks"
import {mainPart}                       from "@/libs"
import {PieChart}                       from "@/widgets"
import {RatioChart}                     from "@/widgets/RatioChart"
import {sum}                            from "d3-array"
import {useEffect, useState}            from "react"
import {useNavigate}                    from "react-router-dom"
import {SearchParams}                   from "meilisearch"
import {fetch as tauri_fetch}           from "@tauri-apps/api/http"

export const Homepage = () => {
  const name = useName()
  const [t1,setT1] = useState<number>(),
        [t2,setT2] = useState<number>()
  const {data, count, time, distribution} = useSearch(name, {facetsDistribution: ["amount", "genotype", "species"]}, [])

  const fishAmount = distribution && sum(Object.entries(distribution["amount"]), d => +d[0] * d[1])

  const navigate = useNavigate()

  useEffect(() => {
    const test1 = async () => {
      const time1 = +new Date()
      const result = await fetch("http://localhost:4000/api/manager/persons").then(r => r.json())
      const time2 = +new Date()
      setT1(time2 - time1)
      // console.log(result)
    }

    const test2 = async () => {
      const time1 = +new Date()
      const result = await tauri_fetch<Person[]>("http://localhost:4000/api/manager/persons").then(r => r.data)
      const time2 = +new Date()
      setT2(time2 - time1)
    }

    test1()
    test2()
  }, [])

  return <div className={"flex justify-between px-8 lg:px-12 py-6 text-gray-600"}>
    <div className={"w-2/5"}>
      <div>fetch: {t1}</div>
      <div>tauri: {t2}</div>
      <h1 className={"text-2xl text-gray-800 font-medium"}>
        Good afternoon, <span className={"font-semibold"}>LMJ!</span>
      </h1>

      <h2 className={"text-xl text-gray-600 font-medium"}>
        total tank amount: <span className={"font-semibold"}>{count ?? ""}</span>
      </h2>

      <button>
        see monitor analysis
      </button>

      <button onClick={() => navigate(`/tanks/${name}`)}>
        see all tanks {time}ms
      </button>
    </div>
    <div className={"w-3/5"}>
      <h2>total fishes: {fishAmount}</h2>
      <h2>main genotype: <span
        className={"uppercase text-gray-700 font-medium"}>
        {distribution && mainPart(distribution["genotype"])}
      </span>
      </h2>
      {
        count && distribution && <div className={"flex justify-between"}>
          <div className={"w-60 h-60"}>
            <PieChart data={distribution["genotype"]}/>
          </div>
          <div className={"w-60 h-60"}>
            <PieChart data={distribution["species"]}/>
          </div>
        </div>
      }
      <h2>main species:
        <span
          className={"uppercase text-gray-700 font-medium"}>
        {distribution && mainPart(distribution["species"])}
      </span>
      </h2>
      <RatioChart
        name={"demo"}
        data={[{name: "variety_a", value: 123}, {name: "variety_b", value: 88}]}
      />
    </div>
  </div>
}
