import { getSearchByPost } from '@/lib/postApi';
import { useQuery } from '@tanstack/react-query';
import Post from '../Home/Post';
import useAuth from '@/store/useAuth';
import { PostType } from '@/types/types';
import { useSearchParams } from 'react-router-dom';
import Loading from '../ui/Loading';
import SearchPage from './SearchPage';
import { useEffect, useState } from 'react';

const SearchResult = () => {
  const { getMe } = useAuth();
  const [searchParams] = useSearchParams();
  const SearchQuery = searchParams.get("query")
  const query = SearchQuery?.match(/([^?]+)/) || "";
  const page = SearchQuery?.match(/page=(\d+)/);

  const postQuery = useQuery({
    queryKey: ['search', query], 
    queryFn: () => getSearchByPost(query[0] as string)
  });
  const userQuery = useQuery({ queryKey: ['user'], queryFn: getMe })

  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SLICE = 5
  const startIndex = (currentPage - 1) * PAGE_SLICE;
  const endIndex = startIndex + PAGE_SLICE;

  const paginatedData = postQuery.data?.slice(startIndex, endIndex);

  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const pageQuery = Number(page?.[1]) || 1
    setCurrentPage(pageQuery)
  },[page])

  if(postQuery.isLoading) {
    return <Loading />
  }

  if(postQuery.data.length === 0) {
    return <div>검색 결과가 없습니다.</div>
  }

  return (
    <>
    <div className='pb-4'>{postQuery.data?.length}개의 검색결과가 나왔습니다.</div>
      {paginatedData?.map((post: PostType) => (
        <Post key={post._id} data={post} user={userQuery.data} />
      ))}
      <SearchPage 
        onPageChange={handlePageChange} 
        totalPages={Math.ceil(postQuery.data?.length / PAGE_SLICE)} 
        currentPage={currentPage} 
      />
    </>
  )
}

export default SearchResult
