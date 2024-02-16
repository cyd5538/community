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
  const searchParam = searchParams.get('season');
  const teamParam = searchParams.get('rank');

  const [leagueChoice, setLeagueChoice] = useState<string>(() => {
    return param ? param : leagueData[0].league;
  });
  const [season, setSeason] = useState<string>(() => {
    return searchParam ? searchParam : "2023";
  });
  const [teamPlayerSelect, setTeamPlaterSelect] = useState<string>("team")

  const navigate = useNavigate();

  useEffect(() => {
    // 기본값 라우팅
    if(!param) {
      navigate(`?rank=team&league=PL&season=2023`)
    }
  
    setTeamPlaterSelect(teamParam ? teamParam: "team")
    setLeagueChoice(param ? param : "PL")
    setSeason(searchParam ? searchParam : "2023")

    window.scrollTo(0, 0);
  }, [param, searchParam, teamParam, leagueChoice, season, teamPlayerSelect, navigate]);
  
  const handleTeamIndividualChange = (select: string) => {
    if(select === "team") {
      setTeamPlaterSelect("personal")
      navigate(`?rank=personal&league=${leagueChoice}&season=${season}`)
    } else {
      setTeamPlaterSelect("team")
      navigate(`?rank=team&league=${leagueChoice}&season=${season}`)
    }
    
  }

  const handleLeagueChange = (e: string) => {
    setLeagueChoice(e); 
    navigate(`?rank=${teamPlayerSelect}&league=${e}&season=${season}`)
  };
  
  const handleYearChange = (e: string) => {
    setSeason(e); 
    navigate(`?rank=${teamPlayerSelect}&league=${leagueChoice}&season=${e}`)
  };


  return (
    <div className='pl-6 pt-6 pr-4 flex flex-col gap-4'>
      <LeagueTeamPlayerSelect 
        teamPlayerSelect={teamPlayerSelect}
        handleTeamIndividualChange={handleTeamIndividualChange}
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
      {teamPlayerSelect === "team" && 
      <LeagueRank 
        season={season}
        leagueChoice={leagueChoice} 
        teamPlayerSelect={teamPlayerSelect}/>
      }
      {teamPlayerSelect === "personal" && 
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
