import {useName, useRequest} from "@/hooks"
import {getter}              from "@/libs"
import {PopFilter}           from "@/widgets"
import {differenceInDays}    from "date-fns"
import {motion}              from "framer-motion"

const headers = [
  "owner",
  // "size",
  "genotype",
  // "sexual",
  "age",
  "quantity",
  "trigger",
  "time",
  "result"]

const cellStyle = "table-cell px-0.5 text-gray-500 border-b border-slate-200 align-middle"

const dates = ["2001"]

export const Recordings = () => {
  const name = useName()
  const {data} = useRequest<Recording[]>(`/recordings?owner=${name}`, getter)

  const searchPanel = <div className={"flex space-x-8 my-3"}>
    <PopFilter name={"trigger"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {dates.map(d => <div key={d} className="pb-2">
              <input type="radio" name="type"
                     value="all"
                     id="all" className="styledRadio"/>
              <label
                htmlFor="all"
                className="text-xs font-grey-darker font-lf-regular font-normal">{d}</label>
            </div>
          )}
        </div>
      </div>
    </PopFilter>
    <PopFilter name={"result"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {dates.map(d => <div key={d} className="pb-2">
              <input type="radio" name="type"
                     value="all"
                     id="all" className="styledRadio"/>
              <label
                htmlFor="all"
                className="text-xs font-grey-darker font-lf-regular font-normal">{d}</label>
            </div>
          )}
        </div>
      </div>
    </PopFilter>
    <PopFilter name={"age"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {dates.map(d => <div key={d} className="pb-2">
              <input type="radio" name="type"
                     value="all"
                     id="all" className="styledRadio"/>
              <label
                htmlFor="all"
                className="text-xs font-grey-darker font-lf-regular font-normal">{d}</label>
            </div>
          )}
        </div>
      </div>
    </PopFilter>
    <PopFilter name={"page size"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {dates.map(d => <div key={d} className="pb-2">
              <input type="radio" name="type"
                     value="all"
                     id="all" className="styledRadio"/>
              <label
                htmlFor="all"
                className="text-xs font-grey-darker font-lf-regular font-normal">{d}</label>
            </div>
          )}
        </div>
      </div>
    </PopFilter>
    <PopFilter name={"Sort by"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {dates.map(d => <div key={d} className="pb-2">
              <input type="radio" name="type"
                     value="all"
                     id="all" className="styledRadio"/>
              <label
                htmlFor="all"
                className="text-xs font-grey-darker font-lf-regular font-normal">{d}</label>
            </div>
          )}
        </div>
      </div>
    </PopFilter>
  </div>

  return <div className={"w-11/12 mx-auto mt-8 mb-5 "}>

    {searchPanel}

    <div
      className={"shadow overflow-x-scroll border-b border-gray-200 sm:rounded-md recording-table"}>
      <motion.div layout className={"table w-full"}>
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
        <div className={"table-row-group bg-white"}>
          {data && data.map(d =>
            <div
              key={`${d.tankId}-${d.time}`}
              className={"table-row text-center text-gray-700"}>
              {/*<div className={`${cellStyle} py-2.5`}>{d.tankId}</div>*/}
              <div className={`${cellStyle} py-2.5`}>{d.owner}</div>
              {/*<div className={`${cellStyle} py-2.5`}>{d.size}</div>*/}
              <div className={`${cellStyle} max-w-8`}>{d.genotype}</div>
              {/*<div className={`${cellStyle} max-w-10`}>{d.sexual ?? Math.random() < 0.5 ? "male" : "female"}</div>*/}
              <div className={cellStyle}>{differenceInDays(Date.parse(d.birthday!), new Date())}d</div>
              <div className={`${cellStyle} py-2.5`}>{d.quantity}</div>

              {Math.random() < 0.75
                ? <div className={`${cellStyle} font-semibold text-cyan-400/90`}>
                  AUTO
                </div>
                : <div className={`${cellStyle} font-semibold text-indigo-300`}>
                  MANUAL
                </div>
              }

              <div className={`${cellStyle} whitespace-nowrap`}>{d.time}</div>

              {Math.random() < 0.95
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
        </div>
      </motion.div>
    </div>

  </div>
}
