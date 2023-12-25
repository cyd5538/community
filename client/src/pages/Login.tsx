import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import useAuth from '@/store/useAuth';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth()

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user){
       return navigate("/");
    }
  },[user, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 px-4 py-4 flex flex-col gap-8 drop-shadow-md bg-white rounded-xl"
      >
        <h1 className="font-bold text-center text-2xl">Login</h1>
        <Input
          type="email"
          name="email"
          placeholder="Email을 입력해주세요."
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
        <p className="text-sm text-center">
          비회원이신가요?
          <span
            onClick={() => {
              navigate('/register');
            }}
            className="underline pl-2 cursor-pointer"
          >
            회원가입
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
