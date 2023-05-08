import Logo from "../../../components/Logo"
import CustomTextField from "../../../components/fields/TextField"
import { Divider } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useSerialize from "../../../hooks/useSerialize"

const ForgetPassword = () => {
    const navigate = useNavigate()
    const serialize = useSerialize()
    const [emailValid, setEmailValid] = useState(false)

    
    const handleInputEmail = (value:any) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!value.match(reg)) setEmailValid(false)
        else setEmailValid(true)
    }

    const handleSendEmail = async () => {
        const obj = serialize('save')
        var res = global.$baseAxios.post('/internaluser/user/forgotpassword', {...obj})
        console.log(res)
    }

    return (
        <div className="flex justify-center h-full !font-roboto">
            <div className="self-center theme-base sm:w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 w-full p-10 rounded-main flex flex-col border border-solid border-grey-200">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="pt-3"></div>
                <h3 className="text-primary-main text-center mb-2">Forgot password?</h3>
                <h4 className="text-center text-grey-300 font-light m-0">Enter your email address below and we'll send you password reset OTP.</h4>
                <div className="py-3"></div>
                <form id="save">
                    <CustomTextField label="Email Address" type='email' name="email" inputClass='border-grey-300' onInput={handleInputEmail} />
                </form>
                <div className="py-4"></div>
                <button className="bg-primary-dark hover:bg-primary-800 duration-200 w-full text-white py-3 rounded-[5px] text-sm disabled:bg-grey-200 disabled:text-slate-400" disabled={!emailValid} onClick={handleSendEmail}>Send Mail</button>
                <Divider className="my-5" />
                <button className="mx-auto text-sm font-semibold" onClick={() => navigate('/signin')}>Already have an account?</button>
            </div>
        </div>
    )
}

export default ForgetPassword