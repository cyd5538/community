import { useEffect, useState } from 'react';
import useAuth from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import MyInfoImage from './MyInfoImage';

const MyInfo = () => {
  const { getMe } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: getMe,
  });

  const [nickname, setNickname] = useState<string>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
  }, [data]);
  
  return (
    <form className='pt-4'>
      <div className='flex flex-col gap-4'>
        <div>
          <label className="text-md block text-gray-700 font-semibold mb-2">Email</label>
          <div className="text-gray-900">{data?.email}</div>
        </div>

        <div>
          <label className="text-md block text-gray-700 font-semibold mb-2">Nickname</label>
          <Input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
          <MyInfoImage setFile={setFile} profileImage={data?.profileImage} />
        </div>
        <div>
          <Button>수정하기</Button>
        </div>
      </div>
    </form>
  );
};

export default MyInfo;
