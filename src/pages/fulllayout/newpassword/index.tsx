import CustomTextField from "components/fields/TextField"
import Logo from "components/Logo"
import { IconEyeOff, IconEye } from "@tabler/icons"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import useSerialize from "hooks/useSerialize"

const NewPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const serialize = useSerialize()
    const query = new URLSearchParams(location.search)

    const [passwordType, setPasswordType] = useState('password')
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(false)
    

    const handleInputEmail = (value:string) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!value.match(reg)) setEmailValid(false)
        else setEmailValid(true)
    }

    const handleInputPassword = (value:string) => {
        if (!value) setPasswordValid(false)
        else setPasswordValid(true)
    }

    const handleSubmit = async () => {
        const obj = serialize('save')

        const nacl = require("tweetnacl")
        const naclUtil = require('tweetnacl-util');
        const decodeUTF8Pass = naclUtil.decodeUTF8(query.get('temporary_password'))
        const hashPass = nacl.hash(decodeUTF8Pass);
        const endcodedBase64Pass = naclUtil.encodeBase64(hashPass);

        const auth = {
            username: obj.email,
            password: endcodedBase64Pass
        }

        const decodeUTF8NewPass = naclUtil.decodeUTF8(obj.password)
        const hashNewPass = nacl.hash(decodeUTF8NewPass);
        const endcodedBase64NewPass = naclUtil.encodeBase64(hashNewPass);

        try {
            await global.$baseAxios.put('/internaluser/v1/user/password/new', { password: endcodedBase64NewPass }, {auth: auth})
            navigate('/signin')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="flex justify-center h-full font-roboto">
            <div className="self-center theme-base sm:w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 w-full p-10 rounded-main flex flex-col border border-solid border-grey-200">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="pt-3"></div>
                <h3 className="text-primary-main text-center mb-2">New Password</h3>
                <h4 className="text-center text-grey-300 font-light m-0">Enter your credential to continue</h4>
                <div className="py-3"></div>
                <form id="save" onSubmit={(e) => e.preventDefault()}>
                    <CustomTextField label="Email Address" type='email' name="email" defaultValue={query.get('email') ?? ''} disabled onInput={handleInputEmail} />
                    <div className="py-2"></div>
                    <CustomTextField label="Password" type={passwordType} name="password" onInput={handleInputPassword}>
                        {
                            passwordType === 'password' ?
                                <button className="my-auto mx-3" onClick={() => setPasswordType('text')}>
                                    <IconEyeOff className="self-center" />
                                </button> :
                                    <button className="my-auto mx-3" onClick={() => setPasswordType('password')}>
                                        <IconEye className="self-center" />
                                    </button> 
                        }
                    </CustomTextField>
                </form>
                <div className="py-4"></div>
                <button className="bg-primary-dark hover:bg-primary-800 duration-200 w-full text-white py-3 rounded-[5px] text-sm disabled:bg-grey-200 disabled:text-slate-400" disabled={!emailValid || !passwordValid} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default NewPassword