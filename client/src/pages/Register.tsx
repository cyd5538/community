import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { IscheckNickname, register } from '../lib/userApi';
import axios from 'axios';
import customToast from '@/components/ui/customToast';
import useAuth from '@/store/useAuth';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    setCheckNickname(false);
  },[nickname])

  const duplicateCheckNickname = async () => {
    if(!nickname) {
      return customToast("error", "닉네임을 입력해주세요")
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(!checkNickname) {
      return;
    }

    if (!email || !nickname || !password) {
      return alert("빈 칸을 입력해주세요.")
    }

    if(password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인을 확인해주세요.")
    }

    try {
      const userData = { email, nickname, password };
      const response = await register(userData);
      customToast('success', '회원가입 완료');
      navigate('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert();
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
        onSubmit={handleSubmit}
        className="w-full sm:w-96 px-4 py-4 flex flex-col gap-8 drop-shadow-md bg-white rounded-xl"
      >
        <h1 className="font-bold text-center text-2xl">회원가입</h1>
        <Input
          type="email"
          placeholder="Email을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='flex gap-2'>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button disabled={checkNickname} onClick={duplicateCheckNickname}>
            {!checkNickname ? '중복 체크' : '체크 완료'}
          </Button>
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
