import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen sm:bg-green-500 bg-white flex justify-center items-center">
      <form className="w-full sm:w-96 px-4 py-4 flex flex-col gap-8 drop-shadow-md bg-white rounded-xl">
        <h1 className="font-bold text-center text-2xl">회원가입</h1>
        <Input type="email" placeholder="Email을 입력해주세요." />
        <Input type="text" placeholder="닉네임을 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 한번 더 입력해주세요" />
        <Button>Submit</Button>
        <p className="text-sm text-center">
          이미 회원이신가요?
          <span 
            onClick={() => { navigate('/login'); }}
            className="underline pl-2 cursor-pointer"
          >
            로그인
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register
