interface StatusComponentProps {
    params: any
}
const StatusComponent = (props:StatusComponentProps) => {
    const { params } = props

    return (
        <div className="w-full flex justify-center h-full">
            <div className="bg-success-light text-success-dark rounded-full self-center p-2 px-3 leading-none">
                <span>{params.value}</span>
            </div>
        </div>
    )
}

export default StatusComponent