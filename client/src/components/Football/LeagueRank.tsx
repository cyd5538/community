import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { leagueData } from '@/utils/league'
import { LeagueDatatable } from '@/types/foontballTypes'
import LeagueRankSelect from './LeagueRankSelect'
import LeagueTableHead from './LeagueTableHead'
import LeagueTable from './LeagueTable'
import { Table } from '../ui/table'
import Loading from '../ui/Loading'
import { getLeagueRank } from '@/lib/footballApi'

const LeagueRank = () => {
  const [leagueChoice, setLeagueChoice] = useState<string>(leagueData[0].league)
  
  const getData = async () => {
    try {
      const response = await getLeagueRank(leagueChoice)
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
    <div className='pl-6 pt-6 pr-4 flex flex-col gap-8'>
      <div className='flex gap-2'>
        {leagueData.map((league) => 
          <LeagueRankSelect 
            key={league.name}
            league={league}
            leagueChoice={leagueChoice}
            setLeagueChoice={setLeagueChoice}
          />
        )}
      </div>
      {isLoading ? 
        <Loading /> 
        :
        <Table>
          <LeagueTableHead />
          {data?.map((rankData: LeagueDatatable) => 
            <LeagueTable 
              rankData={rankData}
              key={rankData.team.id}
            />
          )}
        </Table>
      }
    </div>
  )
}

export default LeagueRank
