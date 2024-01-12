import RoomModal from '@/components/Room/RoomModal'
import RoomCreateBtn from '@/components/Room/RoomCreateBtn'
import RoomList from '@/components/Room/RoomList'

const ChatRoom = () => {
  return (
    <div className='relative w-full'>
      <RoomCreateBtn />
      <RoomModal />
      <RoomList />
    </div>
  )
}

export default ChatRoom
