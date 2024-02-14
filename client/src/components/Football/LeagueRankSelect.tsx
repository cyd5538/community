import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { leagueData } from "@/utils/league"

interface LeagueRankSelectProps {
  leagueChoice: string
  handleLeagueChange:  (e: string) => void
}

const LeagueRankSelect:React.FC<LeagueRankSelectProps> = ({leagueChoice, handleLeagueChange}) => {

  return (  
    <Select onValueChange={handleLeagueChange} defaultValue={leagueChoice}>
      <SelectTrigger  className="w-32">
        <SelectValue placeholder="Select seasons" />
      </SelectTrigger>
      <SelectContent>
        {leagueData.map((league) => (
          <SelectItem value={league.league}>
              {league.name}
          </SelectItem> 
        ))}
      </SelectContent>
    </Select>
  )
}

export default LeagueRankSelect
