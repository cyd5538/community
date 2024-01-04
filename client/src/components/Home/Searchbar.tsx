import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import customToast from '../ui/customToast';

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
    <div className='fixed top-0 left-[-4px] w-full h-14 bg-gray-100 z-20'>
      <form
       onSubmit={scearchHandler} 
       className='top-2 right-12 absolute'
      >
        <input 
          className='pl-10 border-green-600 border-[1px] focus:border-none py-2 rounded-full focus:bg-green-100' 
          type="text" 
          placeholder=""
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        <span className='absolute top-[12px] left-4'>
          <Search size={20}/>
        </span>
      </form>
    </div>
  )
}

export default Searchbar
