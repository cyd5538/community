import { Search } from 'lucide-react'

const Searchbar = () => {

  return (
    <div className='fixed top-0 left-[-4px] w-full h-14 bg-gray-100 z-20'>
      <form className='top-2 right-12 absolute'>
        <input className='pl-10 border-green-600 border-[1px] focus:border-none py-2 rounded-full focus:bg-green-100' type="text" placeholder="" />
        <span className='absolute top-[12px] left-4'>
          <Search size={20}/>
        </span>
      </form>
    </div>
  )
}

export default Searchbar
