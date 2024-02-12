import LeagueRank from '@/components/Football/LeagueRank'
import { getLeagueRank } from '@/lib/footballApi'
import { leagueData } from '@/utils/league'
import { useQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Football = () => {
  const [leagueChoice, setLeagueChoice] = useState<string>(leagueData[0].league)
  const [searchParams] = useSearchParams();
  const param = searchParams.get('league');

  useLayoutEffect(() => {
    setLeagueChoice(param ? param : "PL")
    window.scrollTo(0, 0);
  }, [param]);

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
    <>
      <LeagueRank 
        leagueData={leagueData}
        isLoading={isLoading}
        leagueChoice={leagueChoice}
        setLeagueChoice={setLeagueChoice}
        data={data}
      />
    </>
  )
}

export default Football
