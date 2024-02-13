import { Player } from "@/types/foontballTypes"
import { TableCell, TableRow } from "../ui/table"

interface LeagueScoreTableProp {
  data: Player
  index: number
}

const LeagueScoreTable: React.FC<LeagueScoreTableProp> = ({ data, index }) => {

  return (
    <TableRow>
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center font-semibold">{data.player?.name}</TableCell>
      <TableCell className="flex items-center gap-2">
        <img src={data.team?.crest} alt="" className='w-4 h-4 md:w-8 md:h-8' />
        <p>{data.team?.shortName}</p>
      </TableCell>
      <TableCell className="text-center">{data.player?.nationality}</TableCell>
      <TableCell className="text-center">{data.playedMatches}</TableCell>
      <TableCell className="text-center">{data.goals}</TableCell>
      <TableCell className="text-center">{data.assists}</TableCell>
      <TableCell className="text-center">{data.penalties}</TableCell>
      <TableCell className="text-center">{data.player?.dateOfBirth}</TableCell>
    </TableRow>
  )
}

export default LeagueScoreTable
