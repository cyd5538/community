import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { getLikeposts } from '@/lib/postApi';
import type { PostType } from "@/types/types";
import Post from './Post';
import useUserInfo from '@/hook/getUser';

const Likeposts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: getLikeposts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const user = useUserInfo()

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
            {group.map((post:PostType) => (
                <Post key={post._id} data={post} user={user}/>
              ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Likeposts;
