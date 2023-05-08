import PrettoSlider from 'components/fields/PrettoSlider';
const BorderRadiusCustomization = () => {
    let root = document.querySelector(':root') as HTMLElement;

    const handleChange = (value:number | number[]) => {
        root.style.setProperty('--rounded-main', value + 'px')
        localStorage.setItem('borderRadius', value.toString())
    }

    return (
        <div className="p-5 flex z-1 flex flex-col relative">
            <span className='text-[14px] font-bold'>Customize Border Radius</span>
            <small className="text-grey-700">slide input dibawah ini</small>
            <div className="py-2"></div>
            <PrettoSlider step={5} min={5} max={25} onChange={handleChange} defaultValue={parseInt(root.style.getPropertyValue('--rounded-main').replaceAll('px', ''))} />
        </div>
    )
}

export default BorderRadiusCustomization