import {useSearch}  from "@/hooks"
import {Pagination} from "@/widgets"
import {TankCard}   from "@/widgets/TankCard"

export const Management = () => {
  const {data, count} = useSearch("03", {offset: 20, limit: 10})

  return <div>
    {data && <>
      <div className={"grid grid-cols-5 place-content-center gap-x-4 gap-y-2.5 mx-8 my-5"}>
        {data.map((d, i) =>
          <TankCard
            key={d.id}
            {...d}
            index={i}
          />
        )}
      </div>
      <Pagination total={count}/>
    </>}
  </div>
}
