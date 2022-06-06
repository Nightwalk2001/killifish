import React from "react"

type TableProps = {
  className?: string
  children: React.ReactNode
}

export const Table = ({className, children}: TableProps) =>
  <div
    // layout
    className={`table-container ${className}`}>
    <table className={"min-w-full"}>{children}</table>
  </div>

type TheadProps = {
  headers: string[]
}

export const Thead = ({headers}: TheadProps) => {
  return <thead>
  <tr>
    {headers.map(d => <th key={d} scope={"col"} className={"th"}>{d}</th>)}
  </tr>
  </thead>
}
