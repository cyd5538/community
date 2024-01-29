import { LeagueDatatable } from "@/types/foontballTypes"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface HomeLeagueTableBodyProp {
  rankData: LeagueDatatable
}

const HomeLeagueTableBody:React.FC<HomeLeagueTableBodyProp> = ({rankData}) => {
  return (
    <TableRow className="text-xs">
      <TableCell className="text-center">{rankData.position}</TableCell>
      <TableCell className="text-center">
        <img src={rankData.team.crest} alt="" className='w-6 h-6'/>
      </TableCell>
      <TableCell className="text-center">{rankData.playedGames}</TableCell>
      <TableCell className="text-center">{rankData.points}</TableCell>
      <TableCell className="text-center">{rankData.won}</TableCell>
      <TableCell className="text-center">{rankData.draw}</TableCell>
      <TableCell className="text-center">{rankData.lost}</TableCell>
    </TableRow>
  )
}

export default HomeLeagueTableBody
