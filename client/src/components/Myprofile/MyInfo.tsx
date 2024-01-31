import { FormEvent, useEffect, useState } from 'react';
import useAuth from '@/store/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import MyInfoImage from './MyInfoImage';
import { profieUpdate, status401Error, status402Error } from '@/lib/userApi';
import axios from 'axios';
import customToast from '../ui/customToast';
import Loading from '../ui/Loading';
import { UserType } from '@/types/types';

interface MyInfoProps {
  user: UserType | undefined
  isLoading: boolean;
}

const MyInfo:React.FC<MyInfoProps> = ({user, isLoading}) => {
  const { token } = useAuth();

  const [nickname, setNickname] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(!token) {
      status402Error()
    }

    try {
      setLoading(true);
      
      const response = await profieUpdate(nickname, file,  token);
      customToast("succes", "프로필이 성공적으로 변경되었습니다.")
      return response;
    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 401) {
          status401Error()
        }
        customToast("error", error?.response?.data.message)
      }
    } finally {
      setLoading(false);
    }
  };

  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

  if(loading || isLoading) {
    return <Loading />
  }
  
  return (
    <form onSubmit={updateProfileMutation.mutate} className='pt-4'>
      <div className='flex flex-col gap-4'>
        <div>
          <label className="text-md block text-gray-700 font-semibold mb-2">Email</label>
          <div className="text-gray-900">{user?.email}</div>
        </div>

        <div>
          <label className="text-md block text-gray-700 font-semibold mb-2">Nickname</label>
          <Input className='w-[300px]' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
          <MyInfoImage setFile={setFile} profileImage={user?.profileImage} />
        </div>
        <div>
          <Button>수정하기</Button>
        </div>
      </div>
    </form>
  );
};

export default MyInfo;
