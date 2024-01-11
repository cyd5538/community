import useRoomModel from '@/store/useRoomModel';
import { Button } from '../ui/button'

const RoomCreateBtn = () => {
  const roomModel = useRoomModel();

  return (
    <Button onClick={roomModel.onOpen}>
      채팅방 생성
    </Button>
  )
}

export default RoomCreateBtn
