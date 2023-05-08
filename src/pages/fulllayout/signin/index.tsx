import CustomTextField from "components/fields/TextField"
import Logo from "components/Logo"
import { IconEyeOff, IconEye } from "@tabler/icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useSerialize from "hooks/useSerialize"
import { SNACKBAR_ACTIVE } from "constants/actions"
import { useDispatch } from "react-redux"
import SessionModel from "models/SessionModel"

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const serialize = useSerialize()
    const [passwordType, setPasswordType] = useState('password')
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    const handleInputEmail = (value:string) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!value.match(reg)) setEmailValid(false)
        else setEmailValid(true)
    }

    const handleInputPassword = (value:any) => {
        if (!value) setPasswordValid(false)
        else setPasswordValid(true)
    }

    const handleLogin = async () => {
        const obj = serialize('save')

        const nacl = require("tweetnacl")
        const naclUtil = require('tweetnacl-util');

        const decodeUTF8Pass = naclUtil.decodeUTF8(obj.password)
        const hashPass = nacl.hash(decodeUTF8Pass);
        const endcodedBase64Pass = naclUtil.encodeBase64(hashPass);

        const auth = {
            username: obj.email,
            password: endcodedBase64Pass
        }
        
        try {
            const res:any = await global.$baseAxios.get('/internaluser/v1/user/login', {auth: auth},)
            localStorage.setItem('session', JSON.stringify(res?.data))
            global.session = res?.data as SessionModel
            navigate('/dashboard')
        } catch (err:any) {
            console.log(err)
            if (err.error_code === "1023") return navigate('/newpassword?email=' + obj.email + '&temporary_password=' + obj.password)
            dispatch({type: SNACKBAR_ACTIVE, message: err?.message})
        }
    }


    return (
        <div className="flex justify-center h-full font-roboto">
            <div className="self-center theme-base sm:w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 w-full p-10 rounded-main flex flex-col border border-solid border-grey-200">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="pt-3"></div>
                <h3 className="text-primary-main text-center mb-2">Hi, Welcome Back</h3>
                <h4 className="text-center text-grey-300 font-light m-0">Enter your credential to continue</h4>
                <div className="py-3"></div>
                <form id="save" onSubmit={(e) => e.preventDefault()}>
                    <CustomTextField label="Email Address" type='email' name="email" onInput={handleInputEmail} />
                    <div className="py-2"></div>
                    <CustomTextField label="Password" type={passwordType} name="password" onInput={handleInputPassword}>
                        <div slot="suffix" className="flex flex-col justify-center">
                            {
                                passwordType === 'password' ?
                                    <button className="my-auto mx-3" onClick={() => setPasswordType('text')}>
                                        <IconEyeOff className="self-center" />
                                    </button> :
                                        <button className="my-auto mx-3" onClick={() => setPasswordType('password')}>
                                            <IconEye className="self-center" />
                                        </button> 
                            }
                        </div>
                    </CustomTextField>
                </form>
                <div className="py-2"></div>
                <div className="flex justify-between">
                    <label className="text-sm flex select-none">
                        <input type="checkbox" className="h-4 w-4 my-auto" />
                        <div className="px-1"></div>
                        <span className="my-auto">
                            Remember me
                        </span>
                    </label>
                    <button className="text-primary-dark text-sm" onClick={() => navigate('/forgotpassword')}>Forgot password?</button>
                </div>
                <div className="py-4"></div>
                <button className="bg-primary-dark hover:bg-primary-800 duration-200 w-full text-white py-3 rounded-[5px] text-sm disabled:bg-grey-200 disabled:text-slate-400" disabled={!emailValid || !passwordValid} onClick={handleLogin}>Sign in</button>
            </div>
        </div>
    )
}

export default SignIn