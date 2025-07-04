import type { JSX }  from "react"
import { DebtsBar } from "./DebtsBar/DebtsBar.tsx"
import { ManagerFilter } from "./ManagerSelector.tsx"

export const Layout = (): JSX.Element => {
  
  
  return (
    <>
      <ManagerFilter />
      <DebtsBar />
    </>
  )
}