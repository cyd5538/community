import { LeagueDatatable } from "@/types/foontballTypes"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";

interface HomeLeagueTableBodyProp {
  rankData: LeagueDatatable
}

const HomeLeagueTableBody:React.FC<HomeLeagueTableBodyProp> = ({rankData}) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleMouseOver = (teamName: string) => {
    setTooltip(teamName);
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <TableRow 
      onMouseOver={() => handleMouseOver(rankData.team.name)}       
      onMouseOut={handleMouseOut}
      className="text-xs relative cursor-pointer"
    >
      <TableCell className="text-center">{rankData.position}</TableCell>
      <TableCell className="text-center">
        <img 
          src={rankData.team.crest} 
          alt="" 
          className='w-6 h-6'
        />
      </TableCell>
      <TableCell className="text-center">{rankData.playedGames}</TableCell>
      <TableCell className="text-center">{rankData.points}</TableCell>
      <TableCell className="text-center">{rankData.won}</TableCell>
      <TableCell className="text-center">{rankData.draw}</TableCell>
      <TableCell className="text-center">{rankData.lost}</TableCell>
      {tooltip && (
        <div className="absolute top-[-30px] left-24 bg-green-400 w-20 text-center text-white p-2 rounded-md">
          {tooltip}
        </div>
      )}
    </TableRow>
  )
}

export default HomeLeagueTableBody
