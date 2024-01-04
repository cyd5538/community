import Searchbar from '@/components/Home/Searchbar';
import SearchResult from '@/components/search/SearchResult';

const Search = () => {

  return (
    <div>
      <Searchbar />
      <div className='mt-20'>
        <SearchResult />
      </div>
    </div>
  )
}

export default Search
