import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { getAllposts } from '@/lib/postApi';
import type { PostType } from "@/types/types";
import Post from './Post';

const Allposts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: getAllposts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div>Loading...</div>}
    >
      <div className="flex flex-col gap-16">
        {data?.pages.map((group, idx) => (
          <React.Fragment key={idx}>
            {group.map((post: PostType) => (
              <Post key={post._id} data={post} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Allposts;
