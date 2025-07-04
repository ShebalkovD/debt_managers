import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { CustomToolTip } from './CustomToolTip'
import type { JSX } from 'react'
import type { Debts } from '../../types/debts'
import Box from '@mui/material/Box';
import { LoadingOverlay } from '../LoadingOverlay';
import { OverlayAlert } from '../OverlayAlert';

type Props = {
    data: Debts | undefined,
    isLoading: boolean
}

export const DebtsBar = ({data, isLoading}: Props): JSX.Element => {
    return(
    <Box sx={{height:600, width: '100%', position: "relative", marginTop: "1rem", fontFamily: "sans-serif"}}>
        <LoadingOverlay isLoading={isLoading}/>
        <OverlayAlert 
            enabled={!isLoading && !data?.debts ? true : false}
            severity='error'
            text="Нет данных для отображения"
        />
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
    </Box>
    )
}