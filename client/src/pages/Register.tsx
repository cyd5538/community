import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { IscheckNickname, registerFun } from '../lib/userApi';
import axios from 'axios';
import customToast from '@/components/ui/customToast';
import useAuth from '@/store/useAuth';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterType } from '@/utils/register';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterType>({resolver: zodResolver(RegisterSchema)})
  const [nickname, setNickname] = useState<string>("")
  const [checkNickname, setCheckNickname] = useState<boolean>(false);

  useEffect(() => {
    setCheckNickname(false)
  },[nickname])

  const duplicateCheckNickname = async () => {
    if(!nickname) {
      return customToast("error", "닉네임을 입력해주세요")
    }
    if(nickname.length < 2 || nickname.length > 10) {
      return customToast("error", "닉네임은 최소 2글자 이상 10글자 이하입니다")
    }

    try {
      const response = await IscheckNickname(nickname)
      customToast("succes", response.message)
      setCheckNickname(true)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        customToast("succes", error.response?.data.error)
      }
    } 
  }

  const handleRegister = async (data:RegisterType) => {
    if(!checkNickname) {
      return customToast("error", "닉네임 중복을 체크해주세요.")
    }

    try {
      const userData = { 
        email : data.email, 
        nickname: nickname,
        password: data.password 
      };

      const response = await registerFun(userData);
      customToast('success', '회원가입 완료');
      navigate('/login');
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        customToast('error', error.response?.data.error);
      }
      else customToast('error', '회원가입 중에 에러가 발생했습니다.');
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
        onSubmit={handleSubmit(handleRegister)}
        className="w-full sm:w-96 px-4 py-4 flex flex-col gap-4 drop-shadow-md bg-white rounded-xl"
      >
        <h1 className="font-bold text-center text-2xl">회원가입</h1>
        <Input
          type="email"
          placeholder="Email을 입력해주세요."
          {...register("email")}
        />
        {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}
        <div className='flex gap-2'>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button type="button" disabled={checkNickname} onClick={duplicateCheckNickname}>
            {!checkNickname ? '중복 체크' : '체크 완료'}
          </Button>
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
        />
        {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}
        <Input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          {...register("confirmPassword")}
        />
        {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}
        {errors.confirmPassword && <span className='font-semibold text-red-800'>{errors.confirmPassword.message}❌</span>}
        <Button type="submit">Submit</Button>
        <p className="text-sm text-center">
          이미 회원이신가요?
          <span
            onClick={() => {
              navigate('/login');
            }}
            className="underline pl-2 cursor-pointer"
          >
            로그인
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
