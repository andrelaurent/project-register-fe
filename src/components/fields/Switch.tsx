import { useState } from 'react'

interface SwitchProps {
    label?: string
    name?: string
    defaultChecked?: boolean
    values?: string[]
}

const Switch = (props:SwitchProps) => {
    const { label, name, defaultChecked, values = ['true', 'false'] } = props
    const [checked, setChecked] = useState(() => defaultChecked)

    return (
        <div className="switch-container">
            <label>{label}</label>
            <div className="switch">
                <input type="checkbox" className="switch-checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <div className="knobs"></div>
                <div className="layer"></div>
                <input type="hidden" name={name} value={values?.[checked ? 0 : 1]} />
            </div>
        </div>
    )
}

export default Switch