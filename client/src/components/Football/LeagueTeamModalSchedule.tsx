import { ResultSet } from "@/types/foontballTypes";
import { LeagueTeamScheduleCarousel } from "./LeagueTeamScheduleCarousel";

interface shceduleProp {
  teamSchedule : ResultSet | undefined
}

const LeagueTeamModalSchedule:React.FC<shceduleProp> = ({teamSchedule}) => {
  const currentDate = new Date();

  const pastMatches = teamSchedule?.matches.filter(match => {
    const matchDate = new Date(match.utcDate);
    return matchDate < currentDate;
  }).reverse();

  const futureMatches = teamSchedule?.matches.filter(match => {
    const matchDate = new Date(match.utcDate);
    return matchDate >= currentDate;
  });


  return (
    <div className="w-full flex flex-col gap-2">
      <LeagueTeamScheduleCarousel 
        data={futureMatches}
        title="경기 일정"
      />
      <LeagueTeamScheduleCarousel 
        data={pastMatches}
        title="지난 경기 결과"
      />
    </div>
  )
}

export default LeagueTeamModalSchedule
