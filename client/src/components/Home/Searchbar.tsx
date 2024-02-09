import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import customToast from '../ui/customToast';
import { IoIosFootball } from 'react-icons/io';

const Searchbar = () => {
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate();
  
  const scearchHandler = async (e: FormEvent) => {
    e.preventDefault()

    if(search === "") {
      return customToast("error", "검색어를 입력해주세요.")
    }

    navigate(`/search?query=${search}`)
    setSearch("")
  }

  return (
    <div className='fixed top-0 left-[-4px] w-full h-14 bg-green-500 z-20'>
      <div className='absolute left-20 top-[10px] text-xl font-bold flex justify-center items-center gap-2'>
        <h1 className='hidden md:block'>
          Football Community
        </h1>
        <IoIosFootball size={30}/>
      </div>
      <form
       onSubmit={scearchHandler} 
       className='top-2 right-4 absolute'
      >
        <input 
          className='pl-4 w-48 border-black border-[1px] focus:border-none py-1 rounded-full focus:bg-zinc-100' 
          type="text" 
          placeholder=""
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className='absolute top-[5px] right-4'>
          <Search size={20}/>
        </button>
      </form>
    </div>
  )
}

export default Searchbar
