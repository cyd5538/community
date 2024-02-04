import { LeagueDatatable } from '@/types/foontballTypes'
import LeagueRankSelect from './LeagueRankSelect'
import LeagueTableHead from './LeagueTableHead'
import LeagueTable from './LeagueTable'
import { Table } from '../ui/table'
import Loading from '../ui/Loading'
import LeagueRankTopfour from './LeagueRankTopfour'

interface LeagueRankProp {
  leagueData: {
    name: string;
    league: string;
  }[]
  isLoading: boolean
  leagueChoice: string
  setLeagueChoice: React.Dispatch<React.SetStateAction<string>>
  data: LeagueDatatable[]
}

const LeagueRank: React.FC<LeagueRankProp> = ({ 
  leagueData, 
  isLoading, 
  leagueChoice, 
  setLeagueChoice, 
  data 
}) => {
  return (
    <div className='pl-6 pt-6 pr-4 flex flex-col gap-8'>
      <div className='flex gap-2'>
        {leagueData?.map((league) =>
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
        <>
          <LeagueRankTopfour 
            data={data}
          />
          <Table>
            <LeagueTableHead />
            {data?.map((rankData: LeagueDatatable) =>
              <LeagueTable
                rankData={rankData}
                key={rankData.team.id}
              />
            )}
          </Table>
        </>
      }
    </div>
  )
}

export default LeagueRank
