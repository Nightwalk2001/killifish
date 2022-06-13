import TankLogo                from "@/assets/tank.ico"
import {useName, useSearch}    from "@/hooks"
import {PAGE_SIZE}             from "@/libs"
import {Pagination, PopFilter} from "@/widgets"
import {motion}                from "framer-motion"
import {useState}              from "react"
import {useNavigate}           from "react-router-dom"

const rooms = ["all", "01", "02", "03", "04", "05"]

type RoomId = "all" | "01" | "02" | "03" | "04" | "05"

export const Tanks = () => {
  const name = useName()

  const navigate = useNavigate()

  const [page, setPage] = useState(1),
        [room, setRoom] = useState<string>(rooms[0])

  const {data: tanks, count} = useSearch(
    name,
    {
      offset: PAGE_SIZE * (page - 1),
      limit: PAGE_SIZE,
      filter: `owner = ${name}`
    },
    [page]
  )

  const searchPanel = <div className={"flex space-x-8 my-3"}>
    <PopFilter name={"鱼房编号"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {rooms.map(d => <div key={d} className="pb-2">
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
    <PopFilter name={"基因型"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {rooms.map(d => <div key={d} className="pb-2">
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
    <PopFilter name={"性别"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {rooms.map(d => <div key={d} className="pb-2">
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
    <PopFilter name={"出生日期"}>
      <div className={"w-12 rounded-lg bg-white"}>
        <div className="px-2">
          {rooms.map(d => <div key={d} className="pb-2">
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
          {rooms.map(d => <div key={d} className="pb-2">
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

  const toRecordings = (id: string) => {
    navigate(`/recordings/${id}`)
  }

  return <main className={"pl-8 pr-6 my-4"}>
    <h2 className={"mb-2 text-lg text-gray-600 tracking-wider"}>
      <strong className={"mx-0.5 font-semibold text-gray-600"}>{count} </strong>
      search results found for
      <strong className={"mx-0.5 font-semibold text-gray-600"}> "{name}"</strong>
    </h2>

    {searchPanel}

    <motion.div
      layout
      className={"grid grid-cols-5 place-content-center gap-x-3 gap-y-2"}>
      {tanks && tanks.map((d: Tank, i: number) =>
        <motion.div
          key={d.id}
          // animate={{opacity: [0.4, 1]}}
          // transition={{duration: 0.01, delay: 0.0103 * i}}
          className={"relative h-20 px-2 py-1.5 text-white bg-blue-400/90 rounded-md"}
          onClick={() => toRecordings(d.id)}
        >
          <div>鱼缸编号：{d.id}</div>
          {/*<div>所有者：{d.owner}</div>*/}
          <div>鳉鱼数量：{d.amount}</div>
          <div>基因型：{d.genotype}</div>

          <img src={TankLogo} alt="" className={"absolute -top-1 right-1 w-12 h-12"}/>
        </motion.div>
      )}
    </motion.div>
    <Pagination pageSize={PAGE_SIZE} total={count} onPageChange={setPage}/>
  </main>
}
