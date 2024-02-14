interface LeagueTeamPlayerSelectProp {
  teamPlayerSelect: string
  setTeamPlaterSelect: React.Dispatch<React.SetStateAction<string>>
}

const LeagueTeamPlayerSelect:React.FC<LeagueTeamPlayerSelectProp> = ({teamPlayerSelect, setTeamPlaterSelect}) => {

  return (
    <div className='flex gap-4'>
      <div 
      onClick={() => setTeamPlaterSelect("팀 순위")}
      className={`${teamPlayerSelect === "팀 순위" ? "bg-green-900 text-white" : "hover:bg-green-200 "} cursor-pointer px-2 py-1 rounded-md font-semibold`}
      >
        팀 순위
      </div>
      <div 
    onClick={() => setTeamPlaterSelect("개인 순위")}
      className={`${teamPlayerSelect === "개인 순위" ? "bg-green-900 text-white" :"hover:bg-green-200 "} cursor-pointer px-2 py-1 rounded-md font-semibold`}
      >
        개인 순위
      </div>
    </div>
  )
}

export default LeagueTeamPlayerSelect
