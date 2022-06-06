import {useName, useRequest} from "@/hooks"
import {getter}              from "@/libs"

const headers = ["tank id", "owner", "size", "genotype", "sexual", "birthday", "quantity", "time", "result"]

const cellStyle = "table-cell px-0.5 border-b border-slate-200 align-middle"

export const Recordings = () => {
  const name = useName()
  const {data} = useRequest<Recording[]>(`/recordings?owner=${name}`, getter)

  return <div>

    <div
      className={"w-11/12 mx-auto mt-8 mb-5 shadow overflow-x-scroll border-b border-gray-200 sm:rounded-md recording-table"}>
      <div className={"table w-full"}>
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
              <div className={`${cellStyle} py-2.5`}>{d.tankId}</div>
              <div className={cellStyle}>{d.owner}</div>
              <div className={cellStyle}>{d.size}</div>
              <div className={`${cellStyle} max-w-8`}>{d.genotype}</div>
              <div className={`${cellStyle} max-w-10`}>{d.sexual}</div>
              <div className={cellStyle}>{d.birthday}</div>
              <div className={cellStyle}>{d.quantity}</div>
              <div className={`${cellStyle} whitespace-nowrap`}>{d.time}</div>
              {Math.random() < 0.5
                ? <div className={cellStyle}>
                  <svg viewBox="0 0 16 16" className={"w-7 scale-95 mx-auto fill-green-400/80"}>
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                : <div className={cellStyle}>
                  <svg viewBox="0 0 16 16" className={"w-8 mx-auto fill-red-500/75"}>
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>

  </div>
}
