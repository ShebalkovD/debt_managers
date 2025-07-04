import type { JSX }  from "react"
import { DebtsBar } from "./DebtsBar/DebtsBar.tsx"
import { ManagerFilter } from "./ManagerSelector.tsx"
import { Form } from "./Form.tsx"
import { Grid } from "./Grid.tsx"

export const Layout = (): JSX.Element => {
  
  
  return (
    <>
      <ManagerFilter />
      <Form />
      <DebtsBar />
      <Grid />
    </>
  )
}