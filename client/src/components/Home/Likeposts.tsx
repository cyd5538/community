import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { getLikeposts } from '@/lib/postApi';

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


  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div>Loading...</div>}
    >
      <div className="">
        {data?.pages.map((group, idx) => (
          <React.Fragment key={idx}>
            {group.map((project) => (
                <div key={project._id} className="h-32 ">
                  <h3 className="title">{project.title}</h3>
                  <img src={project.image} width={200} height={200} alt={project.title}/>
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Likeposts;
