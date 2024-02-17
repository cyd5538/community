import { useEffect, useState } from 'react';
import Modal from '../ui/Modal'
import useTeamModel from '@/store/useTeamModel'
import { getLeagueTeamInfo, getLeagueTeamSchedule } from '@/lib/footballApi';
import Loading from '../ui/Loading';
import { TeamData, ResultSet } from '@/types/foontballTypes';
import LeagueTeamModalSchedule from './LeagueTeamModalSchedule';

const LeagueTeamModal = () => {
  const teamModal = useTeamModel();
  const [teamInfo, setTeamInfo] = useState<TeamData>();
  const [teamSchedule, setTeamSchedule] = useState<ResultSet>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (teamModal.id) {
          setLoading(true);

          const [info, schedule] = await Promise.all([
            getLeagueTeamInfo(teamModal.id),
            getLeagueTeamSchedule(teamModal.id)
          ]);

          setTeamInfo(info.data);
          setTeamSchedule(schedule.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [teamModal.id]);

  const titleConent = (
    <div className='flex gap-2 justify-center items-center'>
      <span>{teamInfo?.name}</span>
      <img src={teamInfo?.crest} alt={teamInfo?.name} className='w-12 h-12'/>
    </div>
  )

  const bodyContent = (
    <div className="w-full">
      {loading ?
        <Loading /> :
        <LeagueTeamModalSchedule 
          teamSchedule={teamSchedule}
        />
      }
    </div>
  )

  return (
    <>
      <Modal
        title={loading ? "" : titleConent}
        body={bodyContent}
        isOpen={teamModal.isOpen}
        onClose={teamModal.onClose}
      />
    </>
  )
}

export default LeagueTeamModal
