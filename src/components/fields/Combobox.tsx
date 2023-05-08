import { useState, useMemo, useEffect } from 'react'
import useSlot from 'hooks/useSlot'
import { IconSelector } from '@tabler/icons'
import useConfiguration from 'hooks/useConfiguration'
interface ComboboxProps {
    // ========================= SELECT PROPERTY ============================ //
    label: String,
    name?: string,
    defaultValue?: any
    onChange?: Function

    // ========================= OPTION PROPERTY ========================== //
    options: any[]
    optionDisplay?: string
    optionValue?: string

    hiddenField?: string

    // ======================== VALIDATION ============================ //
    required?: boolean

    // ========================= CUSTOM CLASS ============================== //
    inputClass?: String

    // ========================= SLOT ================================== //
    children?: JSX.Element | JSX.Element[]


    // =========================== THEME =========================== //
    theme?: '1' | '2' | '3'
    themeCustomization?: 'true' | 'false'
}

const ComboboxDefaultSuffix = () => {
    return (
        <div className="flex flex-col justify-center px-2 absolute top-0 right-0 h-full z-0">
            <IconSelector />
        </div>
    )
}

const Combobox = (props:ComboboxProps) => {
    const { label, inputClass, name, children, options, optionDisplay, optionValue, theme, themeCustomization, onChange, defaultValue, hiddenField, required } = props
    const { config: { fieldType } } = useConfiguration()
    const [value, setValue] = useState(null)
    const [result, setResult] = useState<any>({})
    const [defaultTheme, setDefaultTheme] = useState('1')
    const Slot = useSlot(children)

    const handleChange = (e:any) => {
        if (onChange) onChange(e.target.value)
        setValue(e.target.value)
    }

    useMemo(() => {
        if (themeCustomization === 'false') setDefaultTheme(theme ?? '1')
        else setDefaultTheme(fieldType)
    }, [fieldType]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        var temp = options.find((x:any) => x[optionValue ?? ''] === (value ?? defaultValue))
        console.log(value, temp, defaultValue, 'set result')
        setResult(temp)
    }, [value, defaultValue, options, optionValue]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"input-base " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            {
                defaultTheme === '1' ?
                    <Slot name="preffix"></Slot> : null
            }
            <div className="field">
                {
                    label ?
                        <label>{label} {required ? <b className="text-error-main">*</b> : ''}</label> : null
                }
                <div className={"relative w-full h-full flex " + ((defaultTheme === '3' || defaultTheme === '2') ? 'input-base' : '')}>
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="preffix"></Slot> : null
                    }
                    <select name={name} onChange={handleChange} required={required} value={value || defaultValue} className={(defaultTheme === '3' || defaultTheme === '2') ? '!border-none' : Slot({name: 'preffix'}) ? '!px-3' : ''}>
                        <option value="" className='text-grey-500'>Please select ...</option>
                        {
                            options.map((e:any, n:number) => 
                                <option value={optionValue ? e?.[optionValue] : e} key={n}>
                                    {optionDisplay ? e?.[optionDisplay] : e}
                                </option>
                            )
                        }
                    </select>
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="suffix">
                                <ComboboxDefaultSuffix />
                            </Slot> : null
                    }
                </div>
            </div>
            {
                defaultTheme === '1' ?
                    <Slot name="suffix">
                        <ComboboxDefaultSuffix />
                    </Slot> : null
            }
            <input type="hidden" name={hiddenField} value={JSON.stringify(result)} />
        </div>
    )
}

export default Combobox