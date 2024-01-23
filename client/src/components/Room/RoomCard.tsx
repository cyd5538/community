import { RoomType } from '@/types/types'
import React from 'react'
import { format, parseISO } from "date-fns";
import { Link } from 'react-router-dom';
import useAuth from '@/store/useAuth';
import customToast from '../ui/customToast';

interface RoomCardType {
  room: RoomType
}

const RoomCard:React.FC<RoomCardType> = ({room}) => {
  const { user } = useAuth()

  const redirect = () => {
    if(!user) {
      customToast("error", "로그인 유저만 채팅이 가능합니다. ")
    }
  }
 
  return room.members.length === room.maxMembers ? (
    <div
      onClick={redirect}
      className={`w-full flex justify-between bg-gray-100 p-2 gap-4 items-center rounded-lg disabled`}
    >
      <div className='w-24  flex flex-col justify-center items-center'>
        <span className='text-xs'>{room.owner.nickname}</span>
        <img className='rounded-full' src={room.owner.profileImage ? room.owner.profileImage : "/public/user.png"} alt={room.owner.nickname} width={45} height={45} />
      </div>
      <div className='w-3/5 flex flex-col gap-2'>
        <h3 className='text-sm'>{room.room}</h3>
        <span className='text-xs'>{room.members.length} / {room.maxMembers}</span>
      </div>
      <div className='text-xs w-20 flex flex-col gap-2 items-center'>
        <p>{format(parseISO(room.createdAt), 'MM월dd일')}</p>
        <p>{format(parseISO(room.createdAt), 'h시mm분')}</p>
      </div>
    </div>
  ) : (
    <Link
      onClick={redirect}
      to={`/room/${room._id}`}
      className={`w-full flex justify-between hover:bg-green-300 p-2 cursor-pointer gap-4 items-center rounded-lg`}
    >
      <div className='w-24 flex flex-col justify-center items-centeer'>
        <span className='text-xs'>{room.owner.nickname}</span>
        <img className='rounded-full' src={room.owner.profileImage ? room.owner.profileImage : "/public/user.png"} alt={room.owner.nickname} width={45} height={45} />
      </div>
      <div className='w-3/5 flex flex-col gap-2'>
        <h3 className='text-sm'>{room.room}</h3>
        <span className='text-xs'>{room.members.length}  / {room.maxMembers}</span>
      </div>
      <div className='text-xs w-20 flex flex-col gap-2 items-center'>
        <p>{format(parseISO(room.createdAt), 'MM월dd일')}</p>
        <p>{format(parseISO(room.createdAt), 'h시mm분')}</p>
      </div>
    </Link>
  );
};
export default RoomCard
