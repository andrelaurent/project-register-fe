import { SET_THEME } from "constants/actions"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

const useCustomizeTheme = () => {
    const { theme } = useSelector((state:any) => state.customization)
    const dispatch = useDispatch()
    let root = document.querySelector(':root') as HTMLElement;

    const handleChangeTheme = useCallback((payload?:string) => {
        if (payload) {
            dispatch({ type: SET_THEME, payload })
            localStorage.setItem('theme', payload)
        }

        var _theme = payload || theme
        if (_theme === 'dark') {
            root.style.setProperty('--theme-bg-base', '33, 41, 70')
            root.style.setProperty('--theme-text-base', '237, 242, 242')
        } else {
            root.style.setProperty('--theme-bg-base', '255, 255, 255')
            root.style.setProperty('--theme-text-base', '33, 33, 33')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return {theme, handleChangeTheme}
}

export default useCustomizeTheme