import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import customToast from '../ui/customToast';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Searchbar = () => {
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query");

  const scearchHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (search === "") {
      return customToast("error", "검색어를 입력해주세요.")
    }

    navigate(`/search?query=${search}`)
    setSearch("")
  }


  return (
    <div>
      {query ?
        <form
          onSubmit={scearchHandler}
          className='top-2 right-4 absolute'
        >
          <Input
            className='pl-4 w-64 border-black border-[1px] focus:border-none py-1 focus:bg-zinc-100 placeholder:text-gray-400'
            type="text"
            value={search}
            placeholder="검색어를 입력해주세요."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='absolute top-[8px] right-4'>
            <Search size={20} />
          </button>
        </form>
        :
        <form
          onSubmit={scearchHandler}
          className='w-full h-screen flex flex-col justify-center items-center gap-10'
        >
          <h2 className='font-sans text-3xl text-green-800  '>검색어를 입력해주세요</h2>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
              className='border-green-500 py-4 text-xl' 
              type="text"
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <Button 
              className='bg-green-500 text-white hover:bg-green-600' 
              type="submit"
            >
              검색
            </Button>
          </div>
        </form>
      }
    </div>
  )
}

export default Searchbar
