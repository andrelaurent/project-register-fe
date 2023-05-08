import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react'

const PrettoSliderComponent = styled(Slider)<{max?: number; value?: number | number[]}>(({ max, value }) => ({
    color: 'rgb(var(--primary-main))',
    height: 8,
    padding: 0,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        transform: value === max ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
        '&:focus, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
        '&:hover': {
            boxShadow: '0 0 0 8px rgb(var(--primary-dark), 0.16)',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: 'rgb(var(--primary-dark))',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}))
interface PrettoSliderProps {
    step?: number
    min?: number
    max?: number
    defaultValue?: number
    name?: string
    onChange?: Function
}

const PrettoSlider = (props:PrettoSliderProps) => {
    const { step, min, max, defaultValue, name, onChange } = props
    const [value, setValue] = useState<number | number[]>()

    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        setValue(newValue)
        if (onChange) onChange(newValue)
    }

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])


    return (
        <div className=''>
            <PrettoSliderComponent valueLabelDisplay="auto" name={name} step={step} min={min} max={max} value={value} defaultValue={defaultValue} onChange={handleChangeSlider} />
        </div>
    )
}

export default PrettoSlider