import { getRooms } from '@/lib/roomApi';
import { useQuery } from '@tanstack/react-query'
import RoomCard from './RoomCard';
import { RoomType } from '@/types/types';
import Loading from '../ui/Loading';

interface RoomListProps {
  cardHeight: number
}

const RoomList:React.FC<RoomListProps> = ({cardHeight}) => {
  const { isLoading, data } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms
  });

  if(isLoading) {
    return <Loading />
  }

  console.log(`h-[${cardHeight}px]`)
  return (
    <div 
    className='overflow-hidden w-72 flex flex-col justify-center items-center border-gray-10 border-[1px] p-2'>
      <h2 className='text-lg mb-10 text-center'>실시간 채팅 {data?.length}</h2>
      <div className={`flex flex-col gap-2 w-full overflow-y-scroll h-${cardHeight}`}>
        {data?.map((room:RoomType) => 
          <RoomCard room={room} key={room._id} />
        )}
      </div>
    </div>
  )
}

export default RoomList
