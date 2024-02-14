import { getLeagueScoreRank } from "@/lib/footballApi";
import { useQuery } from "@tanstack/react-query";
import LeagueScoreTableHead from "./LeagueScoreTableHead";
import Loading from "../ui/Loading";
import LeagueScoreTable from "./LeagueScoreTable";
import { Player } from "@/types/foontballTypes";
import { Table } from "../ui/table";

interface LeagueScoreRankProp {
  leagueChoice: string;
  teamPlayerSelect: string;
  season: string;
}

const LeagueScoreRank: React.FC<LeagueScoreRankProp> = ({ leagueChoice, teamPlayerSelect, season }) => {
  const getData = async () => {
    try {
      const response = await getLeagueScoreRank(leagueChoice, season)
      return response.data
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
            <LeagueScoreTableHead />
            {data?.map((scoreData: Player, index: number) =>
              <LeagueScoreTable
                index={index}
                data={scoreData}
                key={index}
              />  
            )}
          </Table>
        </>
      }
    </>
  )
}

export default LeagueScoreRank
