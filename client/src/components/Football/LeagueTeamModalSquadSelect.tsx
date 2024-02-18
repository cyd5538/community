import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LeagueTeamModalSquadSelectProp {
  position: string;
  handlePositionChange: (e: string) => void;
}

export function LeagueTeamModalSquadSelect({position, handlePositionChange} : LeagueTeamModalSquadSelectProp) {
  return (
    <Select onValueChange={handlePositionChange} defaultValue={position}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select position" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Goalkeeper">골키퍼</SelectItem>
          <SelectItem value="Defence">수비수</SelectItem>
          <SelectItem value="Midfield">미드필더</SelectItem>
          <SelectItem value="Offence">공격수</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
