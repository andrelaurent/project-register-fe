import { useState, useMemo } from 'react'
import useConfiguration from 'hooks/useConfiguration'

interface InputFileProps {
    // ========================= INPUT PROPERTY ============================ //
    label: String,
    name: string,
    required?: boolean
    accept?: string
    maxSize?: number

    // ========================= CUSTOM CLASS ============================== //
    inputClass?: String

    // =========================== THEME =========================== //
    theme?: '1' | '2' | '3'
    themeCustomization?: 'true' | 'false'
}

const InputFile = (props:InputFileProps) => {
    const { label, inputClass, name, theme, themeCustomization, required, accept, maxSize } = props
    const { config: { fieldType } } = useConfiguration()
    const [value, setValue] = useState<any>(null)
    const [defaultTheme, setDefaultTheme] = useState('1')


    useMemo(() => {
        if (themeCustomization === 'false') setDefaultTheme(theme ?? '1')
        else setDefaultTheme(fieldType)
    }, [fieldType]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (e:any) => {
        const file = e.target.files[0]
        if (maxSize && file.size > maxSize) {
            var el = document.getElementById(name) as HTMLInputElement
            el.value = ''
            setValue(null)
            return
        }
        console.log(file)
        var fileReader = new FileReader()
        fileReader.onload = (e:any) => fileReaderLoad(e.target.result, file)
        fileReader.readAsDataURL(file)
    }

    const fileReaderLoad = ( content:any, file:any ) => {
        const fileObject = {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath,
            base64: content,
            objectType: "file"
        }
        setValue(fileObject)
    }

    return (
        <div className={"input-base " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            <div className="field">
                {
                    label ?
                        <label>{label} {required ? <b className="text-error-main">*</b> : ''}</label> : null
                }
                <div className={"relative w-full h-full flex " + ((defaultTheme === '3' || defaultTheme === '2') ? 'input-base' : '')}>
                    <input type="file" id={name} required={required} onChange={handleChange} accept={accept} />
                    <input type="hidden" name={name} value={JSON.stringify(value)}  />
                </div>
            </div>
        </div>
    )
}

export default InputFile