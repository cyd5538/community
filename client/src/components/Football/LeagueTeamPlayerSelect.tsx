interface LeagueTeamPlayerSelectProp {
  teamPlayerSelect: string
  setTeamPlaterSelect: React.Dispatch<React.SetStateAction<string>>
}

const LeagueTeamPlayerSelect:React.FC<LeagueTeamPlayerSelectProp> = ({teamPlayerSelect, setTeamPlaterSelect}) => {
  console.log(teamPlayerSelect);
  return (
    <div className='flex gap-4'>
      <div 
      onClick={() => setTeamPlaterSelect("팀 순위")}
      className='text-xl cursor-pointer bg-green-500 px-2 py-1 text-white rounded-md font-semibold'>
        팀 순위
      </div>
      <div 
    onClick={() => setTeamPlaterSelect("개인 순위")}
      className='text-xl cursor-pointer bg-green-500 px-2 py-1 text-white rounded-md font-semibold'>
        개인 순위
      </div>
    </div>
  )
}

export default LeagueTeamPlayerSelect
