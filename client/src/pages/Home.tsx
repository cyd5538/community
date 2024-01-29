import HomeLeagueTable from '@/components/Home/HomeLeagueTable';
import Posts from '@/components/Home/Posts';
import Searchbar from '@/components/Home/Searchbar';
import PostModal from '@/components/Modal/PostModal'
import RoomList from '@/components/Room/RoomList';

const Home = () => {

  return (
    <div className='w-full flex flex-col relative'>
      <Searchbar />
      <PostModal />
      <div className='pt-16 w-full flex gap-8'>
        <div className='w-full md:w-3/5 border-gray-10 border-[1px] p-4'>
          <Posts />
        </div>
        <div className='hidden md:w-1/3 md:flex flex-col gap-4'>
          <div>
            <RoomList cardHeight={500} cardWidth={390}/>
          </div>
          <div className='w-[390px]'>
            <HomeLeagueTable />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
