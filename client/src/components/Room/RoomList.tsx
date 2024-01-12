import { getRooms } from '@/lib/roomApi';
import { useQuery } from '@tanstack/react-query'
import RoomCard from './RoomCard';
import { RoomType } from '@/types/types';
import Loading from '../ui/Loading';

interface RoomListProps {
  cardWidth: number
  cardHeight: number
}

const RoomList:React.FC<RoomListProps> = ({cardHeight, cardWidth}) => {
  const { isLoading, data } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms
  });

  if(isLoading) {
    return <Loading />
  }

  return (
    <div 
    style={{ maxWidth: `${cardWidth}px`, width: "100%"}}
    className='overflow-hidden flex flex-col justify-center items-center border-gray-10 border-[1px] p-2'>
      <h2 className='text-lg mb-10 text-center'>실시간 채팅 {data?.length}</h2>
      <div style={{height: `${cardHeight}px`}} className={`flex flex-col gap-2 overflow-y-scroll`}>
        {data?.map((room:RoomType) => 
          <RoomCard room={room} key={room._id} />
        )}
      </div>
    </div>
  )
}

export default RoomList
