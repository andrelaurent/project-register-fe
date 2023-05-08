import { useState, useMemo, useRef } from "react"
import useSlot from 'hooks/useSlot'
import useConfiguration from "hooks/useConfiguration"

interface CustomTextAreaProps {
    // ========================== INPUT ATTRIBUTE ====================================== //
    label?: string
    placeholder?: string
    name?: string
    onInput?: Function
    defaultValue?: string | number | readonly string[] | undefined
    disabled?: boolean

    // ======================== VALIDATION ============================ //
    title?: string
    required?: boolean

    // ======================== ADDITIONAL CLASS ====================================== //
    inputClass?: String

    // ========================= SLOT ============================= //
    children?: JSX.Element[] | JSX.Element

    // ========================== THEME CONFIGURATION =================================== //
    theme?: '1' | '2' | '3'
    themeCustomization?: 'true' | 'false'
}

const CustomTextArea = (props:CustomTextAreaProps) => {
    const { label, inputClass, name, children, onInput, defaultValue, disabled, theme, themeCustomization, placeholder, title, required } = props
    const { config: { fieldType } } = useConfiguration()
    const [defaultTheme, setDefaultTheme] = useState('1')
    const [value, setValue] = useState('')
    const ref = useRef(null)
    const Slot = useSlot(children)

    const handleInput = (e:any) => {
        setValue(e.target.value)
        if (onInput) onInput(e.target.value)
        const el:any = ref.current
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
    }

    useMemo(() => {
        if (themeCustomization === 'false') setDefaultTheme(theme ?? '1')
        else setDefaultTheme(fieldType)
    }, [fieldType]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"input-base " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            {
                defaultTheme === '1' ?
                    <Slot name="preffix"></Slot> : null
            }
            <div className="field">
                {
                    label ?
                        <label className={Slot({name: 'suffix'}) && defaultTheme === '1' ? '!px-3' : ''}>{label} {required ? <b className="text-error-main">*</b> : ''}</label> : null
                }
                <div className={"relative w-full h-full flex " + ((Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? 'input-base' : '')}>
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="preffix"></Slot> : null
                    }
                    <textarea ref={ref} rows={5} title={title} required={required} name={name} className={(Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? '!border-none' : Slot({name: 'preffix'}) ? '!px-3' : ''} value={value ?? defaultValue} disabled={disabled} onInput={handleInput} placeholder={placeholder ?? 'Input ' + label} />
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="suffix"></Slot> : null
                    }
                </div>
            </div>
            {
                defaultTheme === '1' ?
                    <Slot name="suffix"></Slot> : null
            }
        </div>
    )
}

export default CustomTextArea