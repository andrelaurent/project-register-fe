import useConfiguration from "hooks/useConfiguration"
import useSlot from "hooks/useSlot"
import { useMemo, useState } from "react"

interface AutocompleteProps {
    // ========================== INPUT ATTRIBUTE ====================================== //
    label?: string
    placeholder?: string
    name?: string
    onInput?: Function
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

    // ======================== AUTOCOMPLETE ============================= //
    query: string
}

const Autocomplete = (props:AutocompleteProps) => {
    const { label, inputClass, name, children, onInput, defaultValue, disabled, theme, themeCustomization, placeholder, pattern, title, required, query } = props
    const { config: { fieldType } } = useConfiguration()
    const [defaultTheme, setDefaultTheme] = useState('1')
    const [value, setValue] = useState<any>({})
    const [search, setSearch] = useState('')
    const [error, setError] = useState(false)
    const [options, setOptions] = useState([])
    const Slot = useSlot(children)

    const handleInput = async (e:any) => {
        var value = e.target.value
        setValue({})
        setSearch(value)
        if (onInput) onInput(value)

        if (value.length <= 3) return
        const res:any = await global.$baseAxios.get('/internaluser/v1/role?' + query + '=' + value)
        setOptions(res?.data || [])
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
        <div className={"input-base overflow-visible " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            {
                defaultTheme === '1' ?
                    <Slot name="preffix"></Slot> : null
            }
            <div className="field overflow-visible">
                {
                    label ?
                        <label className={Slot({name: 'suffix'}) && defaultTheme === '1' ? '' : ''}>{label} {required ? <b className="text-error-main">*</b> : ''}</label> : null
                }
                <div className={"relative w-full h-full flex " + ((Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? 'input-base' : '')}>
                    {
                        defaultTheme === '2' || defaultTheme === '3' ?
                            <Slot name="preffix"></Slot> : null
                    }
                    <input autoComplete="false" onBlur={handleBlur} title={title} pattern={pattern} required={required} type="text" className={(Slot({name: 'suffix'}) || Slot({name: 'preffix'})) && (defaultTheme === '3' || defaultTheme === '2') ? '!border-none' : Slot({name: 'preffix'}) ? '!px-3' : ''} value={search ?? defaultValue} disabled={disabled} onInput={handleInput} placeholder={placeholder ?? 'Input ' + label} />
                    {
                        options.length > 0 && search !== value[query] ?
                            <div className="flex flex-col shadow-md max-h-[300px] overflow-auto absolute left-0 top-[110%] w-full bg-theme-bg-base border border-solid border-grey-300 rounded-md">
                                {
                                    options.map((option:any) => <div className="text-sm cursor-pointer py-2 px-5 hover:bg-primary-light" onClick={() => setValue(option)}>{option[query]}</div>)
                                }
                            </div> : null
                    }
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
            <input type="hidden" name={name} value={JSON.stringify(value)} />
        </div>
    )
}

export default Autocomplete