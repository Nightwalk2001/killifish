import {Illustration} from "@/widgets"
import LoginAnimation from "@/assets/login.json"
import {useNavigate}  from "react-router-dom"

const inputClassNames = "pl-4 pr-3 py-1.5 rounded-md bg-gray-100 ring-inset duration-100 " +
  "focus:outline-none focus:border-0 focus:ring-1.5 focus:ring-indigo-300 " +
  "focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:caret-gray-600"

const SignIn = () => {
  const navigate = useNavigate()

  const handleLogin  = () => {
          navigate("/workspace")
        },
        handleForget = () => {

        }

  return <div className={"flex-center justify-center mt-10"}>
    <Illustration animation={LoginAnimation} className={"w-80 h-80"}/>
    <div className={"flex-col-center space-y-3"}>
      <input
        type="text"
        placeholder={"输入用户名"}
        className={inputClassNames}
      />
      <input
        type="password"
        placeholder={"输入密码"}
        className={inputClassNames}
      />
      <button
        className={"w-full py-1.25 rounded-md tracking-widest text-white bg-cyan-400 " +
          "transition-transform transition-color hover:bg-cyan-300 active:scale-95"}
        onClick={handleLogin}
      >
        确认登录
      </button>
      <div className={"flex justify-between w-full"}>
        <button
          className={"self-start text-sm text-gray-500 transition-transform active:scale-95"}
          onClick={handleForget}
        >
          忘记密码?
        </button>
        <button
          className={"self-start text-sm text-gray-500 transition-transform active:scale-95"}>
          注册新账号
        </button>
      </div>
    </div>
  </div>
}

export default SignIn
