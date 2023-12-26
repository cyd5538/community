import useUserInfo from '@/hook/getUser';
import { Input } from '../ui/input';

const MyInfo = () => {
  const user = useUserInfo()

  return (
    <form className='gap-6 flex flex-col '>
      <div className='flex flex-col gap-2 pt-8'>
        <span className='font-semibold text-md'>현재 닉네임 : {user?.nickname}</span>
        <Input placeholder='변경할 닉넴을 입력해주세요.'/>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='font-semibold text-md'>Email</span>
        <div>{user?.email}</div>
      </div>
      <div className='flex flex-col gap-2'>
        <img 
          className='rounded-full'
          src={user?.profileImage ? user.profileImage : '/public/user.png'} 
          alt={user?.email} 
          width={200} 
          height={200} 
        />
      </div>
      <button className='w-28 bg-green-600 text-white rounded-md transition-colors delay-100 px-2 py-2 text-md hover:bg-green-500'>
        수정
      </button>
    </form>
  )
}

export default MyInfo
