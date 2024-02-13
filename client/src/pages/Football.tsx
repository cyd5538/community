import LeagueRank from '@/components/Football/LeagueRank'
import LeagueRankSelect from '@/components/Football/LeagueRankSelect'
import LeagueScoreRank from '@/components/Football/LeagueScoreRank'
import LeagueTeamPlayerSelect from '@/components/Football/LeagueTeamPlayerSelect'
import { leagueData } from '@/utils/league'
import { useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Football = () => {
  const [leagueChoice, setLeagueChoice] = useState<string>(leagueData[0].league)
  const [teamPlayerSelect, setTeamPlaterSelect] = useState<string>("팀 순위")
  const [season, setSeason] = useState<number>(2023);
  const [searchParams] = useSearchParams();
  const param = searchParams.get('league');

  useLayoutEffect(() => {
    setLeagueChoice(param ? param : "PL")
    window.scrollTo(0, 0);
  }, [param]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(Number(event.target.value)); 
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
      <div>
        <select value={season} onChange={handleYearChange}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
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
