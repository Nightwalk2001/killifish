import {motion} from "framer-motion"
import React from "react"

export const thStyle = "table-cell px-3 py-3.5 text-gray-500 border-b border-slate-200 align-middle text-xs font-semibold text-gray-500 uppercase tracking-wider select-none"
export const tdStyle = "table-cell px-0.5 text-gray-500 border-b border-slate-200 align-middle"

type TableProps = {
  children: React.ReactNode
}

export const Table = ({children}: TableProps) => <div
  className={"shadow overflow-x-scroll overflow-y-hidden border-b border-gray-200 sm:rounded-md recording-table"}>
  <div className={"table table-fixed w-full"}>
    {children}
  </div>
</div>

type TheadProps = {
  headers: string[]
}

export const Thead = ({headers}: TheadProps) => {
  return <div className={"table-header-group text-center"}>
    <div className={"table-row"}>
      {headers.map(d => <div key={d} className={thStyle}>{d}</div>)}
    </div>
  </div>
}

type TbodyProps = {
  children: React.ReactNode
}

export const Tbody = ({children}: TbodyProps) =>
  <motion.div layout={"size"} className={"table-row-group bg-white"}>
    {children}
  </motion.div>