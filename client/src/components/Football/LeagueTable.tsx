import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { LeagueDatatable } from '@/types/foontballTypes'

interface LeagueTableProps {
  rankData: LeagueDatatable
}

const LeagueTable: React.FC<LeagueTableProps> = ({ rankData }) => {

  const getRecentResultsStyle = (result: string) => {
    switch (result) {
      case 'W':
        return { color: 'blue' }; 
      case 'D':
        return { color: 'gray' };
      case 'L':
        return { color: 'red' }; 
      default:
        return {}; 
    }
  };

  return (
    <TableRow>
      <TableCell className="text-center">{rankData.position}</TableCell>
      <TableCell className="flex items-center gap-2">
        <img src={rankData.team.crest} alt="" className='w-4 h-4 md:w-8 md:h-8'/>
        <p>{rankData.team.name}</p>
      </TableCell>
      <TableCell className="text-center">{rankData.playedGames}</TableCell>
      <TableCell className="text-center">{rankData.points}</TableCell>
      <TableCell className="text-center">{rankData.won}</TableCell>
      <TableCell className="text-center">{rankData.draw}</TableCell>
      <TableCell className="text-center">{rankData.lost}</TableCell>
      <TableCell className="text-center">{rankData.goalsFor}</TableCell>
      <TableCell className="text-center">{rankData.goalsAgainst}</TableCell>
      <TableCell className="text-center">{rankData.goalDifference}</TableCell>
      <TableCell className="text-center font-semibold">
      {rankData.form?.split("").map((result, index) => (
        <span key={index} style={getRecentResultsStyle(result)}>
          {result}
        </span>
      ))}
      </TableCell>
    </TableRow>
  )
}

export default LeagueTable
