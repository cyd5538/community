interface LeagueTeamPlayerSelectProp {
  teamPlayerSelect: string
  handleTeamIndividualChange: (select: string) => void
}

const LeagueTeamPlayerSelect:React.FC<LeagueTeamPlayerSelectProp> = ({teamPlayerSelect, handleTeamIndividualChange}) => {

  return (
    <div className='flex gap-4'>
      <div 
      onClick={() => handleTeamIndividualChange("personal")}
      className={`${teamPlayerSelect === "team" ? "bg-green-900 text-white" : "hover:bg-green-200 "} cursor-pointer px-2 py-1 rounded-md font-semibold`}
      >
        팀 순위
      </div>
      <div 
    onClick={() => handleTeamIndividualChange("team")}
      className={`${teamPlayerSelect === "personal" ? "bg-green-900 text-white" :"hover:bg-green-200 "} cursor-pointer px-2 py-1 rounded-md font-semibold`}
      >
        개인 순위
      </div>
    </div>
  )
}

export default LeagueTeamPlayerSelect
