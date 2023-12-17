import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePostModel from '@/hook/userPostModel';
import Allposts from './Allposts';
import Likeposts from './Likeposts';

const Posts = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState<string | null>(null)
  const param = searchParams.get('posts');

  const { onOpen } = usePostModel();

  const menus = [
    { name: "최신", link: "/" },
    { name: "좋아요", link: "?posts=like" },
  ];

  useEffect(() => {
    setActive(param ? "좋아요" : "최신")
  }, [param])

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-4 py-2'>
          {menus.map((menu) => (
            <Link
              key={menu.name}
              className={`${active === menu.name ? 'text-gray-500 underline' : ""} text-lg`}
              to={menu.link}
              onClick={() => setActive(menu.name)}
            >
              {menu.name}
            </Link>
          ))}
        </div>
        <button
          className='px-4 py-2 border-[1px] rounded-full bg-green-400 text-white drop-shadow-md hover:bg-green-500'
          onClick={onOpen}
        >
          글쓰기
        </button>
      </div>
      <div className='mt-8'>
        {active === "좋아요" ?
          <Likeposts /> :
          <Allposts /> 
        }
      </div>
    </div>
  )
}

export default Posts
