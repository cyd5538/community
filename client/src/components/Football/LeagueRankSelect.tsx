interface LeagueRankSelectProps {
  league: {
    name: string;
    league: string;
  }
  leagueChoice: string
  setLeagueChoice: React.Dispatch<React.SetStateAction<string>>
}

const LeagueRankSelect:React.FC<LeagueRankSelectProps> = ({league, leagueChoice, setLeagueChoice}) => {

  return (
    <div 
      className={`${league.league === leagueChoice ? "bg-green-400 rounded-md text-white" : ""} font-semibold px-2 py-1 cursor-pointer`}
      onClick={() => setLeagueChoice(league.league)}
    >
      {league.name}
    </div>
  )
}

export default LeagueRankSelect
