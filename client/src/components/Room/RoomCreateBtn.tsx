import useRoomModel from '@/store/useRoomModel';

const RoomCreateBtn = () => {
  const roomModel = useRoomModel();

  return (
    <button 
      className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-32 h-12 rounded-md'
      onClick={roomModel.onOpen}
    >
      채팅방 만들기
    </button>
  )
}

export default RoomCreateBtn
