import { getMyposts } from '@/lib/postApi';
import { PostType, UserType } from '@/types/types';
import Loading from '../ui/Loading';
import { useQuery } from '@tanstack/react-query';
import Mypost from './Mypost';

interface MyPostProps {
  user: UserType | undefined
  isLoading?: boolean;
}

const Myposts: React.FC<MyPostProps> = ({ user }) => {

  const getMypost = async () => {
    try {
      const getUserId = user?.id
      const response = await getMyposts(getUserId as string)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoading, data } = useQuery({
    queryKey: ["post", "mypost"],
    queryFn: getMypost,
  });

  if (isLoading) {
    return <Loading />
  }

  if (data.length === 0) {
    return <div>글이 없습니다.</div>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4 mt-10 pr-2'>
      {data.map((post: PostType) => (
        <Mypost post={post} key={post._id} />
      ))}
    </div>
  )
}

export default Myposts
