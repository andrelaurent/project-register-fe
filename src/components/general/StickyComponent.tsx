import { createRef, useEffect, useState } from "react"

interface StickyComponentProps {
    children: JSX.Element
}

const StickyComponent = (props:StickyComponentProps) => {
    const { children } = props
    const ref = createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        setHeight(ref.current?.clientHeight ?? 0)
    }, [ref])

    return (
        <div ref={ref} className="sticky z-[1] rounded-main theme-base overflow-hidden" style={{ top: Math.ceil(40 + (height / 2)) + 'px' }}>
            {children}
        </div>
    )
}

export default StickyComponent