import { HTMLInputTypeAttribute, useState, useMemo } from "react"
import useSlot from 'hooks/useSlot'
import useConfiguration from "hooks/useConfiguration"
interface TextFieldProps {
    // ========================== INPUT ATTRIBUTE ====================================== //
    label?: string
    placeholder?: string
    type: HTMLInputTypeAttribute
    name?: string
    onInput?: Function
    onPaste?: Function
    defaultValue?: string | number | readonly string[] | undefined
    disabled?: boolean

    // ======================== VALIDATION ============================ //
    pattern?: string
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

const CustomTextField = (props:TextFieldProps) => {
    const { label, type, inputClass, name, children, onInput, defaultValue, disabled, theme, themeCustomization, placeholder, pattern, title, required, onPaste } = props
    const { config: { fieldType } } = useConfiguration()
    const [defaultTheme, setDefaultTheme] = useState('1')
    const [value, setValue] = useState(null)
    const [error, setError] = useState(false)
    const Slot = useSlot(children)

    const handleInput = (e:any) => {
        setValue(e.target.value)
        if (onInput) onInput(e.target.value)
    }

    const handlePaste = (e:any) => {
        if (onPaste) onPaste(e)
    }

    useMemo(() => {
        if (themeCustomization === 'false') setDefaultTheme(theme ?? '1')
        else setDefaultTheme(fieldType)
    }, [fieldType]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleBlur = (e:any) => {
        console.log(e.target.validationMessage)
        if (e.target.validationMessage) setError(true)
        else setError(false)
        console.log(error)
    }

    return (
        <div className={"input-base " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            {
                defaultTheme === '1' ?
                    <Slot name="preffix"></Slot> : null
            }
            <div className="field">
                {
                    label ?
                        <label className={Slot({name: 'suffix'}) && defaultTheme === '1' ? '' : ''}>{label} {required ? <b className="text-error-main">*</b> : ''}</label> : null
                }
                <div className={"relative w-full h-full flex " + ((Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? 'input-base' : '')}>
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="preffix"></Slot> : null
                    }
                    <input autoComplete="false" onBlur={handleBlur} title={title} pattern={pattern} required={required} type={type} name={name} className={(Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? '!border-none' : Slot({name: 'preffix'}) ? '!px-3' : ''} value={value ?? defaultValue} disabled={disabled} onInput={handleInput} onPaste={handlePaste} placeholder={placeholder ?? 'Input ' + label} />
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

export default CustomTextField