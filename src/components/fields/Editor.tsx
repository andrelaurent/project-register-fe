import ReactQuill from 'react-quill'

import { useState, useMemo } from 'react'
import useConfiguration from 'hooks/useConfiguration';

var icons = ReactQuill.Quill.import('ui/icons');
icons['bold'] = '<i class="ti ti-bold"></i>'
icons['italic'] = '<i class="ti ti-italic"></i>'
icons['underline'] = '<i class="ti ti-underline"></i>'
icons['link'] = '<i class="ti ti-link"></i>'
icons['list']['bullet'] = '<i class="ti ti-list"></i>'
icons['list']['ordered'] = '<i class="ti ti-list-numbers"></i>'
icons['clean'] = '<i class="ti ti-clear-formatting"></i>'
icons['header']['1'] = '<i class="ti ti-h-1"></i>'
icons['header']['2'] = '<i class="ti ti-h-2"></i>'
icons['color'] = '<i class="ti ti-color-picker"></i>'
icons['background'] = '<i class="ti ti-paint"></i>'
icons['strike'] = '<i class="ti ti-strikethrough"></i>'
icons['blockquote'] = '<i class="ti ti-blockquote"></i>'
icons['indent']['+1'] = '<i class="ti ti-indent-increase"></i>'
icons['indent']['-1'] = '<i class="ti ti-indent-decrease"></i>'
icons['image'] = '<i class="ti ti-photo"></i>'

const modules = {
    toolbar: [      
        [{ 'header': 1 }, { 'header': 2 }],    
        [{ 'color': [] }, { 'background': [] }],  
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

interface EditorProps {
    name: string
    label?: string
    defaultValue?: string

    inputClass?: String
    
    theme?: '1' | '2' | '3'
    themeCustomization?: 'true' | 'false'
}

const Editor = (props:EditorProps) => {
    const { name, defaultValue, label, theme, themeCustomization, inputClass } = props
    const [value, setValue] = useState<string>('')
    const [defaultTheme, setDefaultTheme] = useState('1')
    const { config: { fieldType } } = useConfiguration()

    
    useMemo(() => {
        if (themeCustomization === 'false') setDefaultTheme(theme ?? '1')
        else setDefaultTheme(fieldType)
    }, [fieldType]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"input-base !h-full " + inputClass} data-theme={theme ?? defaultTheme} theme-customization={themeCustomization ?? 'true'}>
            <div className="field">
                {
                    label ?
                        <label>{label}</label> : null
                }
                <ReactQuill className='rounded-main w-full overflow-hidden' theme="snow" modules={modules} value={value || defaultValue} onChange={setValue} defaultValue={defaultValue} />
            </div>
            <input type="hidden" name={name} value={value} defaultValue={defaultValue} />
        </div>
    )
}

export default Editor