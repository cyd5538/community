import { getMyposts } from '@/lib/postApi';
import { PostType, UserType } from '@/types/types';
import Loading from '../ui/Loading';
import { useQuery } from '@tanstack/react-query';
import Mypost from './Mypost';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useWindowWidth from '@/hook/useWindowWidth';

interface MyPostProps {
  user: UserType | undefined
  isLoading?: boolean;
}

const Myposts:React.FC<MyPostProps> = ({user}) => {
  const width = useWindowWidth()

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

  if(isLoading) {
    return <Loading />
  }

  if(data.length === 0) {
    return <div>글이 없습니다.</div>
  }

  return (
    <Table className='max-w-[1100px] w-full'>
      <TableHeader>
        <TableRow>
          {width > 650 ? <TableHead className='text-center w-[50px] sm:w-[90px] text-xs sm:text-sm'>썸네일</TableHead> : <></>}
          <TableHead className="text-center text-xs sm:text-sm">제목 + 내용</TableHead> 
          <TableHead className="text-center text-xs sm:text-sm w-[90px] sm:w-[90px]">댓글수</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">작성일</TableHead>
        </TableRow>
      </TableHeader>
     {data.map((post: PostType) => (
      <Mypost post={post} key={post._id} />
     ))} 
    </Table>
  )
}

export default Myposts
