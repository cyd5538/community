import Allposts from '@/components/Home/Allposts';
import Searchbar from '@/components/Home/Searchbar';
import PostModal from '@/components/Modal/PostModal'
import usePostModel from '@/hook/userPostModel';

const Home = () => {
  const { onOpen } = usePostModel();

  return (
    <div className='w-full flex flex-col relative'>
      <Searchbar />
      <PostModal />
      <button onClick={onOpen}>클릭</button>
    </div>
  )
}

export default Home
