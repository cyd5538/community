import { LeagueDatatable } from '@/types/foontballTypes'
import LeagueTableHead from './LeagueTableHead'
import LeagueTable from './LeagueTable'
import { Table } from '../ui/table'
import Loading from '../ui/Loading'
import { getLeagueRank } from '@/lib/footballApi'
import { useQuery } from '@tanstack/react-query'
import LeagueTeamModal from './LeagueTeamModal'

interface LeagueRankProp {
  leagueChoice: string;
  teamPlayerSelect: string
  season: string;
}

const LeagueRank: React.FC<LeagueRankProp> = ({ 
  leagueChoice,
  teamPlayerSelect,
  season
}) => {
  const getData = async () => {
    try {
      const response = await getLeagueRank(leagueChoice, season)
      return response.data.table
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoading, data } = useQuery({
    queryKey: ['football', leagueChoice, teamPlayerSelect, season],
    queryFn: getData
  });

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <>
          <Table>
            <LeagueTableHead />
            {data?.map((rankData: LeagueDatatable) =>
              <LeagueTable
                rankData={rankData}
                key={rankData.team.id}
              />
            )}
          </Table>
          <LeagueTeamModal />
        </>
      }
    </>
  )
}

export default LeagueRank
