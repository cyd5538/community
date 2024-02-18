import { TableHead, TableHeader, TableRow } from '../ui/table'

const LeagueTeamSquadHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[70px] text-center">이름</TableHead>
        <TableHead className="w-[70px] text-center">포지션</TableHead>
        <TableHead className="w-[70px] text-center">생년월일</TableHead>
        <TableHead className="w-[70px] text-center">국적</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default LeagueTeamSquadHead
