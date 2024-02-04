import { Link } from "react-router-dom";

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
    <Link
      to={`?league=${league.league}`} 
      className={`${league.league === leagueChoice ? "bg-green-400 rounded-md text-white" : ""} font-semibold px-2 py-1 cursor-pointer`}
      onClick={() => setLeagueChoice(league.league)}
    >
      {league.name}
    </Link>
  )
}

export default LeagueRankSelect
