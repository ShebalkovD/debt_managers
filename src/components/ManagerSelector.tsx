import type { JSX } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from "@mui/material/Select"
import { useEffect, useState } from "react";
import { createRequest } from "../api/createRequest";
import type { ManagersList } from "../types/managers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { encodeSearchParams } from "./utils/encodeSearchParams";
import { decodeSearchParams } from "./utils/decodeSearchParams";

export const ManagerFilter = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = (): Promise<ManagersList> => {
      const result = createRequest<ManagersList>({
          url: '/sale_managers',
          method: 'GET',
      })
      return result
  }

  const {data, error, isPending, isError} = useQuery({
      queryKey: ['Managers'],
      queryFn: getData
  })

  const managers = data?.map(el => el.name)
  managers?.unshift('Все менеджеры')
  
  const [currManager, setCurrManager] = useState("")

  const getCurrentManager = (): void => {
    const decodedParams = decodeSearchParams(searchParams)
    if ( !("manager_id" in decodedParams) ) {
      setCurrManager('Все менеджеры')
      return
    }
    const currentManagerId = Number(decodedParams.manager_id) 
    data?.map(el => el.id === currentManagerId ? setCurrManager(el.name) : null)
  }

  useEffect(getCurrentManager, [data, searchParams])
  
  const setQueryParams = (managerId: string | boolean | undefined | null | string[]): void => {
    const encodedSearchParams = encodeSearchParams({manager_id: managerId})
    setSearchParams(encodedSearchParams)
  }
  
  const handleManagerChange = (event: SelectChangeEvent): void => {
    const value: string = event.target.value
    if  (value === 'Все менеджеры') {
      setCurrManager(value)
      setQueryParams(null)
      return
    }
    setCurrManager(value)
    const managerId = data?.filter(el => el.name === value)[0].id.toString()
    setQueryParams(managerId)
  }

  if (isError) return <>Ошибка {error.message}</>

  return (
  <FormControl sx={{maxWidth: "20rem", marginTop: "1rem", marginLeft: "5rem"}}>
      <InputLabel id='manager-select-label'>Менеджер</InputLabel>
      <Select
        labelId="manager-select-label"
        id="manager-select"
        value={currManager}
        label="Менеджер"
        disabled={isPending}
        onChange={handleManagerChange}
      >
        {managers?.map(manager => (
          <MenuItem value={manager}>{manager}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}