import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LeagueYearSelect {
  season: string;
  handleYearChange: (e: string) => void;
}

const LeagueYearSelect: React.FC<LeagueYearSelect> = ({ season, handleYearChange }) => {
  const data = ["2023","2022","2021","2020"];

  return (
    <Select onValueChange={handleYearChange} defaultValue={season}>
      <SelectTrigger  className="w-48">
        <SelectValue placeholder="Select seasons" />
      </SelectTrigger>
      <SelectContent>
        {data.map((league) => (
          <SelectItem value={league}>
              {league}
          </SelectItem> 
        ))}
      </SelectContent>
    </Select>
  )
}

export default LeagueYearSelect
