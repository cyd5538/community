import { getRooms } from '@/lib/roomApi';
import { useQuery } from '@tanstack/react-query'
import RoomCard from './RoomCard';
import { RoomType } from '@/types/types';
import Loading from '../ui/Loading';

const RoomList = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms
  });

  if(isLoading) {
    return <Loading />
  }

  return (
    <div>
      <h2>채팅방</h2>
      {data?.map((room:RoomType) => 
        <RoomCard room={room} key={room._id} />
      )}
    </div>
  )
}

export default RoomList
