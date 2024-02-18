import { TeamSquad } from '@/types/foontballTypes'
import { TableCell, TableRow } from '../ui/table'

interface LeagueTeamSquadBodyProp {
  squad: TeamSquad
}

const LeagueTeamSquadBody:React.FC<LeagueTeamSquadBodyProp> = ({squad}) => {
  return (
    <TableRow>
      <TableCell className="text-center">{squad.name}</TableCell>
      <TableCell className="text-center">{squad.position}</TableCell>
      <TableCell className="text-center">{squad.dateOfBirth}</TableCell>
      <TableCell className="text-center">{squad.nationality}</TableCell>
    </TableRow>
  )
}

export default LeagueTeamSquadBody
