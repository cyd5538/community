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
  return (
    <Select onValueChange={handleYearChange} defaultValue={season}>
      <SelectTrigger  className="w-48">
        <SelectValue placeholder="Select seasons" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
        <SelectItem value="2021">2021</SelectItem>
        <SelectItem value="2020">2020</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default LeagueYearSelect
