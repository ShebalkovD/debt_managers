import type { JSX }  from "react"
import { useQuery } from '@tanstack/react-query'
import type { Debts } from '../types/debts.ts'
import { DebtsBar } from "./DebtsBar/DebtsBar.tsx"
import { ManagerFilter } from "./ManagerSelector.tsx"
import { createRequest } from "../api/createRequest.ts"
import { useSearchParams } from "react-router";
import { decodeSearchParams } from "./utils/decodeSearchParams.ts"

export const Layout = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = (): Promise<Debts> => {
    const result = createRequest<Debts>({
      url: 'reports/sale_debts',
      method: 'GET',
      params: decodeSearchParams(searchParams),
    })
    return result
  }

  const query = decodeSearchParams(searchParams)
  
  const {data, isPending, isError, error} = useQuery<Debts>({
    queryKey: ['debts', query], 
    queryFn: getData
  })
 
  const isLoading = isPending
  if (isError) return <>Произошла ошибка: {error.message}</>
  
  return (
    <>
      <ManagerFilter isLoading={isLoading}/>
      <DebtsBar isLoading={isLoading} data={data}/>
    </>
  )
}