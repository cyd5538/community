import Searchbar from '@/components/Home/Searchbar';
import SearchResult from '@/components/search/SearchResult';

const Search = () => {

  return (
    <div>
      <Searchbar />
      <div className='my-20 mx-8'>
        <SearchResult />
      </div>
    </div>
  )
}

export default Search
