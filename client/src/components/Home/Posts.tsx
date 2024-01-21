import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePostModel from '@/store/userPostModel';
import Allposts from './Allposts';
import { getAllposts, getCommentposts, getLikeposts } from '@/lib/postApi';

const Posts = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<string>("")
  const param = searchParams.get('posts');

  const postModal = usePostModel();

  const menus = [
    { name: "최신순", link: "/" },
    { name: "좋아요순", link: "?posts=like" },
    { name: "댓글순", link: "?posts=comments"}
  ];

  useEffect(() => {
    const paramMapping: { [key: string]: string } = {
      'null': "최신순",
      'like': "좋아요순",
      'comments': "댓글순",
    };

    setActive(paramMapping[String(param)] || "최신순");
  }, [param]);  

  const handlePostClick = () => {
    postModal.onOpen();
    usePostModel.setState({
      titleStore: "", 
      descriptionStore: "",
      imageStore: "",
      videoStore: "",
      postIdStore: ""
    });
  }

  const getPosts = (tab: string) => {
    switch (tab) {
      case '좋아요순':
        return async ({ pageParam = 1 }: { pageParam?: number }) => {
          const result = await getLikeposts({ pageParam });
          return result;
        };
      case '최신순':
        return async ({ pageParam = 1 }: { pageParam?: number }) => {
          const result = await getAllposts({ pageParam });
          return result;
        };    
      case '댓글순':
        return async ({ pageParam = 1 }: { pageParam?: number }) => {
          const result = await getCommentposts({ pageParam });
          return result;
        };    
      default:
        return async ({ pageParam = 1 }: { pageParam?: number }) => {
          const result = await getAllposts({ pageParam });
          return result;
        };
    }
  };
  
  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-4 py-2'>
          {menus.map((menu) => (
            <Link
              key={menu.name}
              className={`${active === menu.name ? 'bg-green-400 text-white rounded-md' : ""} text-lg p-1`}
              to={menu.link}
              onClick={() => setActive(menu.name)}
            >
              {menu.name}
            </Link>
          ))}
        </div>
        <button
          className='px-2 py-1 border-[1px] rounded-full bg-green-400 text-white drop-shadow-md hover:bg-green-500'
          onClick={handlePostClick}
        >
          글쓰기
        </button>
      </div>
      <div className='mt-8'>
        <Allposts active={active} handleGet={getPosts(active)} /> 
      </div>
    </div>
  )
}

export default Posts
