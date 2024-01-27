import { TableHead, TableHeader, TableRow } from '../ui/table'

const LeagueTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30px] text-center">순위</TableHead>
        <TableHead className="w-[100px] text-center">팀</TableHead>
        <TableHead className="w-[70px] text-center">경기 수</TableHead>
        <TableHead className="w-[30px] text-center">승점</TableHead>
        <TableHead className="w-[30px] text-center">승</TableHead>
        <TableHead className="w-[30px] text-center">무</TableHead>
        <TableHead className="w-[30px] text-center">패</TableHead>
        <TableHead className="w-[40px] text-center">득점</TableHead>
        <TableHead className="w-[40px] text-center">실점</TableHead>
        <TableHead className="w-[40px] text-center">득실차</TableHead>
        <TableHead className="w-[100px] text-center">최근 5경기</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default LeagueTableHead
