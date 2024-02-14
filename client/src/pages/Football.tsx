import LeagueRank from '@/components/Football/LeagueRank'
import LeagueRankSelect from '@/components/Football/LeagueRankSelect'
import LeagueScoreRank from '@/components/Football/LeagueScoreRank'
import LeagueTeamPlayerSelect from '@/components/Football/LeagueTeamPlayerSelect'
import LeagueYearSelect from '@/components/Football/LeagueYearSelect'
import { leagueData } from '@/utils/league'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Football = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get('league');

  const [leagueChoice, setLeagueChoice] = useState<string>(() => {
    return param ? param : leagueData[0].league;
  });
  const [season, setSeason] = useState<string>("2023");
  const [teamPlayerSelect, setTeamPlaterSelect] = useState<string>("팀 순위")

  const navigate = useNavigate();

  useEffect(() => {
    // 기본값 라우팅
    if(!param) {
      navigate(`?league=PL&season=2023`)
    }

    const leagueParam = param?.replace(/\?.*/, "");
    const seasonMatch = param?.match(/season=(\d+)/);
    const seasonParam = seasonMatch ? seasonMatch[1] : null;

    setLeagueChoice(leagueParam ? leagueParam : "PL")
    setSeason(seasonParam ? seasonParam : "2023")

    window.scrollTo(0, 0);
  }, [param, leagueChoice, season, navigate]);
  
  const handleLeagueChange = (e: string) => {
    setLeagueChoice(e); 
    navigate(`?league=${e}&season=${season}`)
  };
  
  const handleYearChange = (e: string) => {
    setSeason(e); 
    navigate(`?league=${leagueChoice}&season=${e}`)
  };


  return (
    <div className='pl-6 pt-6 pr-4 flex flex-col gap-4'>
      <LeagueTeamPlayerSelect 
        teamPlayerSelect={teamPlayerSelect}
        setTeamPlaterSelect={setTeamPlaterSelect}
      />
      <div className='flex gap-2'>
        <LeagueRankSelect
          leagueChoice={leagueChoice}
          handleLeagueChange={handleLeagueChange}
        />
        <LeagueYearSelect 
          season={season}
          handleYearChange={handleYearChange}
        />
      </div>
      {teamPlayerSelect === "팀 순위" && 
      <LeagueRank 
        leagueChoice={leagueChoice} 
        teamPlayerSelect={teamPlayerSelect}/>
      }
      {teamPlayerSelect === "개인 순위" && 
      <LeagueScoreRank 
        teamPlayerSelect={teamPlayerSelect}
        leagueChoice={leagueChoice}
        season={season}
      />
      }
    </div>
  )
}

export default Football
