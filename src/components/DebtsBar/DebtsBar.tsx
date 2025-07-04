import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { CustomToolTip } from './CustomToolTip'
import type { JSX } from 'react'
import type { Debts } from '../../types/debts'
import Box from '@mui/material/Box';
import { LoadingOverlay } from '../LoadingOverlay';
import { OverlayAlert } from '../OverlayAlert';
import { createRequest } from '../../api/createRequest';
import { decodeSearchParams } from '../utils/decodeSearchParams';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

export const DebtsBar = (): JSX.Element => {

    const [searchParams] = useSearchParams();

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

    return(
    <Box sx={{height:600, width: '100%', position: "relative", marginTop: "1rem", fontFamily: "sans-serif"}}>
        <LoadingOverlay isLoading={isLoading}/>
        
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data?.debts}
                margin={{ top: 40, right: 0, left: 30, bottom: 120 }}
            >
                <Tooltip
                    content={ <CustomToolTip /> }
                />
                <XAxis
                    dataKey={"customer"}
                    angle={-45}
                    orientation={"bottom"}
                    textAnchor="end"
                    tick={{fontSize: 12}}
                />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5"/>
                <Bar dataKey={"debt"} fill='blue'/>
            </BarChart>
        </ResponsiveContainer>

        <OverlayAlert 
            enabled={!isLoading && !data?.debts && !isError}
            severity='info'
            text="Нет данных для отображения"
        />
        <OverlayAlert 
            enabled={isError}
            severity='error'
            text={'Ошибка: ' + error?.message}
        />
    </Box>
    )
}