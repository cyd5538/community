import Modal from '../ui/Modal'
import useTeamModel from '@/store/useTeamModel'


const bodyContent = (
  <div>
    gd
  </div>
)

const LeagueTeamModal = () => {
  const teamlModal = useTeamModel();

  const t = "하이"
  
  return (
    <>
      <Modal 
        title={t === "하이" ? "Team Info" : "글 수정하기"}
        body={bodyContent}
        isOpen={teamlModal.isOpen}
        onClose={teamlModal.onClose}
      />
    </>
  )
}

export default LeagueTeamModal
