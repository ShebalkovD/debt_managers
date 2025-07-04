import { useEffect, useState, type JSX } from "react";
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { decodeSearchParams } from "./utils/decodeSearchParams";
import { useSearchParams } from "react-router";
import { type DebtsList, debtsListDTO } from "../types/debts";
import { createRequest } from "../api/createRequest";
import { useQuery } from "@tanstack/react-query";
import Box from '@mui/material/Box';
import type { ColDef } from "ag-grid-community";

export const Grid = (): JSX.Element => {
    ModuleRegistry.registerModules([AllCommunityModule]);
    
    const [searchParams] = useSearchParams();

    const getData = (): Promise<DebtsList> => {
        const result = createRequest<DebtsList, typeof debtsListDTO>({
        options: {
            url: 'reports/sale_debts',
            method: 'GET',
            params: decodeSearchParams(searchParams),
        },
        schema: debtsListDTO
        })
        return result
    }

    const query = decodeSearchParams(searchParams)
    
    const {data, isPending} = useQuery<DebtsList>({
        queryKey: ['debts', query], 
        queryFn: getData
    })
    
    interface IRow {
        customer: string,
        manager: string | null,
        debt: number
    }
    
    const defaultColDef: ColDef = {
        flex: 1,
        filter: true
    };

    const isLoading = isPending
    
    const [rowData, setRowData] = useState(data?.debts)
    const [colDefs, ] = useState<ColDef<IRow>[]>([
        { field: 'customer'},
        { field: 'manager'},
        { field: 'debt'}
    ])
    
    useEffect(() => {
        setRowData(data?.debts)
    }, [data])

    return (
        <Box sx={{width: "100%", height: "400px"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                theme={themeMaterial}
                domLayout={"normal"}
                loading={isLoading}
            />
        </Box>
    )
}