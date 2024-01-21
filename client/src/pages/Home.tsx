import Posts from '@/components/Home/Posts';
import Searchbar from '@/components/Home/Searchbar';
import PostModal from '@/components/Modal/PostModal'
import RoomList from '@/components/Room/RoomList';

const Home = () => {

  return (
    <div className='w-full flex flex-col relative'>
      <Searchbar />
      <PostModal />
      <div className='pt-16 w-full flex gap-4'>
        <div className='w-full md:w-2/3 border-gray-10 border-[1px] p-4'>
          <Posts />
        </div>
        <div className='hidden md:block'>
          <div className='fixed'>
            <RoomList cardHeight={200} cardWidth={350}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
