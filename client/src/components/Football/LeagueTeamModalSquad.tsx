import { TeamSquad } from "@/types/foontballTypes"
import { LeagueTeamModalSquadSelect } from "./LeagueTeamModalSquadSelect"
import { useState } from "react"
import { Table } from "../ui/table"
import LeagueTeamSquadHead from "./LeagueTeamSquadHead"
import LeagueTeamSquadBody from "./LeagueTeamSquadBody"

interface LeagueTeamModalSquadsProp {
  squads? : TeamSquad[] 
} 

const LeagueTeamModalSquads:React.FC<LeagueTeamModalSquadsProp> = ({squads}) => {
  const [position, setPosition] = useState<string>("Goalkeeper")
  // Goalkeeper Defence Midfield Offence

  const handlePositionChange = (e: string) => {
    setPosition(e); 
  };


  return (
    <div className="mt-4 pb-12">
      <h2 className="font-semibold mb-4">스쿼드</h2>
      <LeagueTeamModalSquadSelect 
        position={position}
        handlePositionChange={handlePositionChange}
      />
      <Table>
        <LeagueTeamSquadHead />
        {squads
          ?.filter((squad) => squad.position === position)
          .map((filteredSquad) => (
            <LeagueTeamSquadBody key={filteredSquad.id} squad={filteredSquad}/>
        ))}
      </Table>
    </div>
  )
}

export default LeagueTeamModalSquads
