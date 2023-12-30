import { getMyposts } from '@/lib/postApi';
import { UserType } from '@/types/types';
import Loading from '../ui/Loading';
import { useQuery } from '@tanstack/react-query';

interface MyPostProps {
  user: UserType | undefined
  isLoading?: boolean;
}

const Myposts:React.FC<MyPostProps> = ({user}) => {
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
    queryKey: ['posts', 'mypost'],
    queryFn: getMypost,
  });

  if(isLoading) {
    return <Loading />
  }

  console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default Myposts
