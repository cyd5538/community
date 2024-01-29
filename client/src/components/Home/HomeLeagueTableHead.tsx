import { TableHead, TableHeader, TableRow } from '../ui/table'

const HomeLeagueTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-center text-xs">순위</TableHead>
        <TableHead className="text-center text-xs">팀</TableHead>
        <TableHead className="text-center text-xs">경기 수</TableHead>
        <TableHead className="text-center text-xs">승점</TableHead>
        <TableHead className="text-center text-xs">승</TableHead>
        <TableHead className="text-center text-xs">무</TableHead>
        <TableHead className="text-center text-xs">패</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default HomeLeagueTableHead
