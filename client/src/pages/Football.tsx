import LeagueRank from '@/components/Football/LeagueRank'
import LeagueRankSelect from '@/components/Football/LeagueRankSelect'
import LeagueScoreRank from '@/components/Football/LeagueScoreRank'
import LeagueTeamPlayerSelect from '@/components/Football/LeagueTeamPlayerSelect'
import LeagueYearSelect from '@/components/Football/LeagueYearSelect'
import { leagueData } from '@/utils/league'
import { useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Football = () => {
  const [leagueChoice, setLeagueChoice] = useState<string>(leagueData[0].league)
  const [teamPlayerSelect, setTeamPlaterSelect] = useState<string>("팀 순위")
  const [season, setSeason] = useState<string>("2023");
  const [searchParams] = useSearchParams();
  const param = searchParams.get('league');

  useLayoutEffect(() => {
    setLeagueChoice(param ? param : "PL")
    window.scrollTo(0, 0);
  }, [param]);

  const handleYearChange = (e: string) => {
    setSeason(e); 
  };

  return (
    <div className='pl-6 pt-6 pr-4 flex flex-col gap-8'>
      <LeagueTeamPlayerSelect 
        teamPlayerSelect={teamPlayerSelect}
        setTeamPlaterSelect={setTeamPlaterSelect}
      />
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
      <LeagueYearSelect 
        season={season}
        handleYearChange={handleYearChange}
      />
      {teamPlayerSelect === "팀 순위" && <LeagueRank leagueChoice={leagueChoice} teamPlayerSelect={teamPlayerSelect}/>}
      {teamPlayerSelect === "개인 순위" && <LeagueScoreRank 
        teamPlayerSelect={teamPlayerSelect}
        leagueChoice={leagueChoice}
        season={season}
      />
      }
    </div>
  )
}

export default Football
