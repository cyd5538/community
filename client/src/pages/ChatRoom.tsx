import RoomModal from '@/components/Room/RoomModal'
import RoomCreateBtn from '@/components/Room/RoomCreateBtn'
import RoomList from '@/components/Room/RoomList'

const ChatRoom = () => {
  return (
    <div className='relative w-full'>
      <RoomCreateBtn />
      <RoomModal />
      <div className='pt-24 w-full flex justify-center'>
        <RoomList cardHeight={96}/>
      </div>
    </div>
  )
}

export default ChatRoom
