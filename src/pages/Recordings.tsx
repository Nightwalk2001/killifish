import {useFindOne, useRequest} from "@/hooks"
import {classNames, getter}     from "@/libs"
import {PopFilter, TankProfile} from "@/widgets"
import {differenceInDays}       from "date-fns"
import {motion}                 from "framer-motion"
import {ChangeEvent, useState}  from "react"
import {useParams}              from "react-router-dom"

const headers = [
  "owner",
  // "size",
  "genotype",
  // "sexual",
  "age",
  "quantity",
  "trigger",
  "time",
  "result"
]

type InputChangeEvent = ChangeEvent<HTMLInputElement>

const cellStyle = "table-cell px-0.5 text-gray-500 border-b border-slate-200 align-middle"

const triggers  = ["ALL", "AUTO", "MANUAL"],
      results   = ["ALL", "SUCCESS", "FAIL"],
      pagesizes = ["10", "15", "20", "30", "50"],
      dates     = ["ALL", "within 3 days"],
      sorts     = ["None", "owner", "genotype", "age", "time"]

export const Recordings = () => {
  const {id} = useParams()

  const {data: tank} = useFindOne(id)

  const [trigger, setTrigger]   = useState<string>(triggers[0]),
        [result, setResult]     = useState<string>(results[0]),
        [pagesize, setPagesize] = useState<string>(pagesizes[0]),
        [date, setDate]         = useState<string>(dates[0]),
        [sort, setSort]         = useState<string>(sorts[0])

  const params = `id=${id}&trigger=${trigger}&result=${result === "SUCCESS"}&pagesize=${pagesize}`

  const {data} = useRequest<Recording[]>("/recordings?" + params, getter)

  const handleTrigger  = (ev: InputChangeEvent) => setTrigger(ev.target.value),
        handleResult   = (ev: InputChangeEvent) => setResult(ev.target.value),
        handlePagesize = (ev: InputChangeEvent) => setPagesize(ev.target.value),
        handleDate     = (ev: InputChangeEvent) => setDate(ev.target.value)

  return <div className={"w-11/12 mx-auto mt-8 mb-5 "}>
    <div>{params}</div>

    {tank &&  <TankProfile {...tank}/>}

    <div>
      operations: <button className={"px-3 py-2 text-white bg-sky-300 rounded-md"}>Manually Feed</button>
    </div>

    <div className={"flex space-x-8 my-3"}>
      <PopFilter name={"trigger"} active={trigger != "ALL"}>
        <div className="px-2" onChange={handleTrigger}>
          {triggers.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                name="trigger"
                id={d}
                value={d}
                checked={d === trigger}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
            </div>
          )}
        </div>
      </PopFilter>

      <PopFilter name={"result"}>
        <div className="px-2" onChange={handleResult}>
          {results.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                name="date"
                id={d}
                value={d}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
            </div>
          )}
        </div>
      </PopFilter>

      <PopFilter name={"age"} className={"w-36"}>
        <div className="px-2" onChange={handleDate}>
          {dates.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                name="date"
                id={d}
                value={d}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal whitespace-nowrap">{d}</label>
            </div>
          )}
        </div>
      </PopFilter>

      <PopFilter name={"page size"} className={"w-36"}>
        <div className="px-2 grid grid-cols-2 place-content-center gap-x-3" onChange={handlePagesize}>
          {pagesizes.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                name="pagesize"
                id={d}
                value={d}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
            </div>
          )}
        </div>
      </PopFilter>

      <PopFilter name={"sort by"}>
        <div className="px-2" onChange={handleDate}>
          {sorts.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                name="trigger"
                id={d}
                value={d}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
            </div>
          )}
        </div>
      </PopFilter>
    </div>

    {
      <div>filters: </div>
    }

    <div
      className={"shadow overflow-x-scroll overflow-y-hidden border-b border-gray-200 sm:rounded-md recording-table"}>
      <div className={"table table-fixed w-full"}>
        <div className={"table-header-group text-center"}>
          <div className={"table-row"}>
            {
              headers.map(d =>
                <div
                  key={d}
                  className={`${cellStyle} px-3 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider select-none`}>
                  {d}
                </div>)}
          </div>
        </div>
        <motion.div layout={"size"} className={"table-row-group bg-white"}>
          {data && data.map(d =>
            <div
              key={`${d.tank}-${d.time}`}
              className={"table-row text-center text-gray-700"}>
              {/*<div className={`${cellStyle} py-2.5`}>{d.tankId}</div>*/}
              <div className={`${cellStyle} py-2.5`}>{d.owner}</div>
              {/*<div className={`${cellStyle} py-2.5`}>{d.size}</div>*/}
              <div className={`${cellStyle} max-w-8`}>{d.genotype}</div>
              {/*<div className={`${cellStyle} max-w-10`}>{d.sexual ?? Math.random() < 0.5 ? "male" : "female"}</div>*/}
              <div className={cellStyle}>{differenceInDays(Date.parse(d.birthday!), new Date())}d</div>
              <div className={`${cellStyle} py-2.5`}>{d.quantity}</div>

              <div
                className={
                  classNames(cellStyle,
                    "py-2.5 font-medium",
                    d.trigger === "AUTO" ? "text-indigo-300" : "text-cyan-400")
                }>{d.trigger}</div>

              <div className={`${cellStyle} whitespace-nowrap`}>{d.time}</div>

              {d.succeed
                ? <div className={cellStyle}>
                  <svg viewBox="0 0 512 512" className={"w-7 scale-95 mx-auto text-green-500/80"}>
                    <path fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10"
                          strokeWidth="52" d="M416 128L192 384l-96-96"/>
                  </svg>
                </div>
                : <div className={cellStyle}>
                  <svg viewBox="0 0 512 512" className={"w-7 mx-auto fill-red-500/80"}>
                    <path
                      d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"/>
                  </svg>
                </div>
              }
            </div>
          )}
        </motion.div>
      </div>
    </div>

  </div>
}
