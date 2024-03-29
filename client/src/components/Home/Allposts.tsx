import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import type { PostType } from "@/types/types";
import Post from './Post';
import useAuth from '@/store/useAuth';

interface allPostsProps {
  handleGet: ({ pageParam }: {
      pageParam?: number | undefined;
  }) => Promise<PostType[]>
  active: string
}

const Allposts:React.FC<allPostsProps> = ({handleGet, active}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["post", "mypost", active],
    queryFn: handleGet,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  const { getMe } = useAuth();
  const userQuery = useQuery({ queryKey: ['users'], queryFn: getMe })

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div key={0}>Loading...</div>}
    >
      <div className="flex flex-col gap-16">
        {data?.pages.map((group, idx) => (
          <React.Fragment key={idx}>
            {group.map((post: PostType) => (
              <Post key={post._id} data={post} user={userQuery.data}/>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Allposts;
