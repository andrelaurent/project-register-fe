import useConfiguration from 'hooks/useConfiguration';

const FieldCustomization = () => {
    const { config: { fieldType }, handleConfiguration } = useConfiguration()

    const handleFormChange = (e:any) => {
        var _value:string = e.target.value
        handleConfiguration({ fieldType: _value })
    }

    return (
        <div className="p-5 flex z-1 flex flex-col relative">
            <span className='text-[14px] font-bold'>Customize Field</span>
            <small className="text-grey-700">Select your favorite field type</small>
            <div className="py-2"></div>
            <form className="flex gap-4" onChange={handleFormChange}>
                <label className='flex gap-2 select-none items-center'>
                    <input type="radio" name="theme" value="1" checked={fieldType === '1'} className="my-auto" />
                    Type 1
                </label>
                <label className='flex gap-2 select-none items-center'>
                    <input type="radio" name="theme" value="2" checked={fieldType === '2'} className="my-auto" />
                    Type 2
                </label>
                <label className='flex gap-2 select-none items-center'>
                    <input type="radio" name="theme" value="3" checked={fieldType === '3'} className="my-auto" />
                    Type 3
                </label>
            </form>
        </div>
    )
}

export default FieldCustomization