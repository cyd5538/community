import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import useRoomModel from '@/store/useRoomModel';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const RoomModal = () => {
  const [title, setTitle] = useState<string>("");
  const [maxpeople, setMaxpeople] = useState<number>(3);

  const roomModel = useRoomModel();

  const bodyContent = (
    <form className='flex gap-8 flex-col'>
      <div className="flex flex-col gap-2">
        <Label className='font-semibold' htmlFor="email">제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className='font-semibold' htmlFor="email">채팅방 최대 인원</Label>
        <Input
          type="number"
          value={maxpeople}
          onChange={(e) => setMaxpeople(parseInt(e.target.value, 10))}
          min={3}
          max={20}
        />
      </div>
      <div className='flex justify-end items-center'>
        <button
          className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-28 h-12 rounded-md'
          type="submit"
        >
          채팅방 생성
        </button>
      </div>
    </form>
  );
  return (
    <Modal
      title="채팅 방 만들기"
      body={bodyContent}
      isOpen={roomModel.isOpen}
      onClose={roomModel.onClose}
    />
  )
}

export default RoomModal
