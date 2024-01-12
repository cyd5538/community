import RoomModal from '@/components/Room/RoomModal'
import RoomCreateBtn from '@/components/Room/RoomCreateBtn'

const ChatRoom = () => {
  return (
    <div className='relative w-full'>
      <RoomCreateBtn />
      <RoomModal />
    </div>
  )
}

export default ChatRoom
