import type { JSX } from "react"
import { useEffect, useState } from "react"
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { green } from '@mui/material/colors';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import Box from '@mui/material/Box';
import { Stack } from "@mui/material";

// Объединить типы библиотеки с кастомным типом payload, потому что
// его там почему-то нет
type CustomToolTipProps = TooltipProps<ValueType, NameType> & {
    payload?: {
        value: ValueType;
        payload: {
            customer: string
        };
        name: NameType;
    }[];
};

export const CustomToolTip = ({
    active, 
    payload
}: CustomToolTipProps): JSX.Element | null => {
    const [total, setTotal] = useState(0)
    const [currCustomer, setCurrCustomer] = useState("")

    useEffect(() => {
        if (active && payload && payload.length) {
            setCurrCustomer(payload[0].payload.customer)
            setTotal(Number(payload[0].value)) 
        }else {
            setTotal(0)
        }
    }, [active, payload])
    
    const toolTipStyle = {
        width: 320,
        height: 100, 
        border: "1px solid black",
        bgcolor: "#fff",
        borderRadius: 2,
        padding: 2
    }

    if (!active) {
        return null
    }

    return (
        <Box 
            sx={toolTipStyle}
        >
            <p><b>Клиент:</b> {currCustomer}</p>
            <Stack 
                flexDirection={"row"}
                alignContent={"center"}
            >
                <span><b>Долг:</b> {total}</span>
                <CurrencyRubleIcon sx={{ color: green[500], transform: "translateY(-4px)" , fontSize: '24px'}}/> 
            </Stack>
        </Box>
    ) 
}