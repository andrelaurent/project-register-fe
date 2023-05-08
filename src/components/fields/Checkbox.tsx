import { useState } from "react"

interface CustomCheckboxProps {
    name?: string
    label?: string
    value?: any
    defaultChecked?: boolean
    onChange?: Function
}

const CustomCheckbox = (props:CustomCheckboxProps) => {
    const { name, label, value, defaultChecked, onChange } = props
    const [checked, setChecked] = useState()

    const handleChange = (e:any) => {
        var checked = e.target.checked
        setChecked(checked)
        if (onChange) onChange(checked ? value : null)
    }

    return (
        <label className="flex gap-3 py-2 text-xs text-grey-500 items-center">
            <input type="checkbox" name={name} value={value} checked={checked === undefined ? defaultChecked : checked} onChange={handleChange} />
            {label}
        </label>
    )
}

export default CustomCheckbox