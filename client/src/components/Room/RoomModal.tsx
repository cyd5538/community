import { FormEvent, useState } from 'react';
import Modal from '@/components/ui/Modal';
import useRoomModel from '@/store/useRoomModel';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { status401Error, status402Error } from '@/lib/userApi';
import { postRoom } from '@/lib/roomApi';
import axios from 'axios';
import Loading from '../ui/Loading';
import useAuth from '@/store/useAuth';
import { useNavigate } from 'react-router-dom';
import customToast from '../ui/customToast';

const RoomModal = () => {
  const [title, setTitle] = useState<string>("");
  const [maxpeople, setMaxpeople] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const roomModel = useRoomModel();
  const queryClient = useQueryClient()

  const { getMe } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      return status402Error()
    }

    if (!title) {
      return alert("제목을 입력해주세요")
    }

    const user = await getMe();
    try {
      setLoading(true);
      if(user) {
        const response = await postRoom(title, user.id as string, maxpeople, token);
        setTitle("")
        setMaxpeople(3)
        navigate(`/room/${response.room._id}`)
        customToast("succes", "채팅방이 생성되었습니다.")
        roomModel.onClose()
        return response.data
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          status401Error()
        }
      }
      customToast("error", "방 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const RoomMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
    onError: (err) => {
      console.log(err)
    }
  })

  if (loading) {
    return <Loading />
  }

  const bodyContent = (
    <form onSubmit={RoomMutation.mutate} className='flex gap-8 flex-col'>
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
          className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-20 h-12 rounded-md'
          type="submit"
        >
          Create
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
