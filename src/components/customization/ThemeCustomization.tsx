import useCustomizeTheme from 'hooks/useCustomizeTheme';

const ThemeCustomization = () => {
    const { theme, handleChangeTheme } = useCustomizeTheme()

    const handleFormChange = (e:any) => {
        var _value:string = e.target.value
        handleChangeTheme(_value)
    }

    return (
        <div className="p-5 flex z-1 flex flex-col relative">
            <span className='text-[14px] font-bold'>Customize Theme</span>
            <small className="text-grey-700">Select your favorite theme</small>
            <div className="py-2"></div>
            <form className="flex gap-4" onChange={handleFormChange}>
                <label className='flex gap-2 select-none'>
                    <input type="radio" name="theme" value="white" checked={theme === 'white'} />
                    White
                </label>
                <label className='flex gap-2 select-none'>
                    <input type="radio" name="theme" value="dark" checked={theme === 'dark'} />
                    dark
                </label>
            </form>
        </div>
    )
}

export default ThemeCustomization