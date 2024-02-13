import { TableHead, TableHeader, TableRow } from '../ui/table'

const LeagueScoreTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30px] text-center">순위</TableHead>
        <TableHead className="w-[30px] text-center">이름</TableHead>
        <TableHead className="w-[50px] text-center">팀</TableHead>
        <TableHead className="w-[30px] text-center">국적</TableHead>
        <TableHead className="w-[70px] text-center">경기 수</TableHead>
        <TableHead className="w-[30px] text-center">골</TableHead>
        <TableHead className="w-[50px] text-center">어시스트</TableHead>
        <TableHead className="w-[30px] text-center">페널티</TableHead>
        <TableHead className="w-[30px] text-center">생년월일</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default LeagueScoreTableHead
