import { getLeagueRank } from '@/lib/footballApi'
import { useQuery } from '@tanstack/react-query'
import { Table } from '../ui/table'
import { useState } from 'react'
import { leagueData } from '@/utils/league'
import { LeagueDatatable } from '@/types/foontballTypes'
import HomeLeagueSelect from './HomeLeagueSelect'
import HomeLeagueTableHead from './HomeLeagueTableHead'
import HomeLeagueTableBody from './HomeLeagueTableBody'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomeLeagueTable = () => {
  const [leagueChoice, setLeagueChoice] = useState<string>(leagueData[0].league);

  const handleLeagueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLeagueChoice(event.target.value);
  }

  const getData = async () => {
    try {
      const response = await getLeagueRank(leagueChoice, "2023")
      return response.data.table
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoading ,data } = useQuery({
    queryKey: ['football', leagueChoice],
    queryFn: getData
  });

  return (
    <div className='overflow-hidden flex flex-col justify-center items-start border-gray-10 border-[1px] p-2'>
      <h2 className='text-center mb-4 w-full text-md'>현재 리그 순위</h2>
      <select
        className="bg-green-400 text-white rounded-md block w-26 p-2 mb-4 outline-none"
        value={leagueChoice}
        onChange={handleLeagueChange}
      >
        {leagueData.map((data) => (
          <HomeLeagueSelect 
            data={data}
            key={data.name}
          />
        ))}
      </select>
      {isLoading ? 
      <div className="animate-spin w-full h-60 flex justify-center items-center">
        <Loader />
      </div>
      :
        <Table>
          <HomeLeagueTableHead />
          {data?.slice(0,10).map((rankData: LeagueDatatable) => 
            <HomeLeagueTableBody 
              rankData={rankData}
              key={rankData.team.id}
            />
          )}
        </Table>
      }
      <div className='w-full flex justify-center py-2'>
        <button
          className='px-2 py-1 bg-green-400 text-white cursor-pointer rounded-md'
        >
          <Link 
            to={{
              pathname: '/football',
              search: `?league=${leagueChoice}`,
            }}
          >
            순위 더 보러가기
          </Link>
        </button>
      </div>  
    </div>
  )
}

export default HomeLeagueTable;
