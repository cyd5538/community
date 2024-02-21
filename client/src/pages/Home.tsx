import HomeLeagueTable from '@/components/Home/HomeLeagueTable';
import Posts from '@/components/Home/Posts';
import PostModal from '@/components/Modal/PostModal'
import RoomList from '@/components/Room/RoomList';

const Home = () => {

  return (
    <div className='w-full flex flex-col relative'>
      <PostModal />
      <div className='pt-8 p-6 w-full flex gap-8'>
        <div className='w-full min-[1250px]:w-3/5 border-gray-10 border-[1px] p-4'>
          <Posts />
        </div>
        <div className='hidden min-[1250px]:w-2/5 min-[1250px]:flex flex-col gap-4'>
          <div>
            <RoomList cardHeight={500} cardWidth={430}/>
          </div>
          <div className='w-[430px]'>
            <HomeLeagueTable />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
