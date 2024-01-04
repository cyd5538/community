import { getSearchByPost } from '@/lib/postApi';
import { useQuery } from '@tanstack/react-query';
import Post from '../Home/Post';
import useAuth from '@/store/useAuth';
import { PostType } from '@/types/types';
import { useSearchParams } from 'react-router-dom';
import Loading from '../ui/Loading';

const SearchResult = () => {
  const { getMe } = useAuth();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")

  const postQuery = useQuery({
    queryKey: ['search', query], 
    queryFn: () => getSearchByPost(query as string)
  });
  const userQuery = useQuery({ queryKey: ['user'], queryFn: getMe })

  if(postQuery.isLoading) {
    return <Loading />
  }

  if(postQuery.data.length === 0) {
    return <div>검색 결과가 없습니다.</div>
  }

  return (
    <>
     {postQuery.data?.map((post: PostType) => (
       <Post key={post._id} data={post} user={userQuery.data}/>
     ))}
    </>
  )
}

export default SearchResult
