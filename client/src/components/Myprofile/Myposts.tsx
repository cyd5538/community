import { getMyposts } from '@/lib/postApi';
import { PostType, UserType } from '@/types/types';
import Loading from '../ui/Loading';
import { useQuery } from '@tanstack/react-query';
import Mypost from './Mypost';
import { useEffect, useState } from 'react';
import MypostsPage from './MypostsPage';
import { useSearchParams } from 'react-router-dom';

interface MyPostProps {
  user: UserType | undefined
  isLoading?: boolean;
}

const Myposts: React.FC<MyPostProps> = ({ user }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const SearchQuery = searchParams.get("profile")
  const page = SearchQuery?.match(/page=(\d+)/);

  const getMypost = async () => {
    const response = await getMyposts(user?.id);
    return response;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["post", "mypost", user],
    queryFn: getMypost,
  });

  const PAGE_SLICE = 12
  const startIndex = (currentPage - 1) * PAGE_SLICE;
  const endIndex = startIndex + PAGE_SLICE;

  const paginatedData = data?.slice(startIndex, endIndex);

  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const pageQuery = Number(page?.[1]) || 1
    setCurrentPage(pageQuery)
  },[page])

  if (isLoading) {
    return <Loading />
  }

  if (data?.length === 0) {
    return <div>글이 없습니다.</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='mt-6 text-lg font-semibold'> 총 {data?.length}개의 글이 있습니다.</h2>
    <div className='grid grid-cols-1 gap-4 gap-y-4 mt-4 pr-2'>
      {paginatedData?.map((post: PostType) => (
        <Mypost post={post} key={post._id} />
      ))}
    </div>  
      <MypostsPage 
        onPageChange={handlePageChange} 
        totalPages={Math.ceil(data?.length / PAGE_SLICE)} 
        currentPage={currentPage} 
      />
    </div>
  )
}

export default Myposts
