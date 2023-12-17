import Posts from '@/components/Home/Posts';
import Searchbar from '@/components/Home/Searchbar';
import PostModal from '@/components/Modal/PostModal'

const Home = () => {

  return (
    <div className='w-full flex flex-col relative'>
      <Searchbar />
      <PostModal />
      <div className='pt-16 w-full flex'>
        <div className='w-full sm:w-2/3 border-gray-10 border-[1px] p-4'>
          <Posts />
        </div>
        <div className='hidden sm:block bg-gray-400'>

        </div>
      </div>
      
    </div>
  )
}

export default Home
