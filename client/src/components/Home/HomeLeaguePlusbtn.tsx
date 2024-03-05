import { Link } from 'react-router-dom'

interface HomeLeaguePlusbtnProp {
  leagueChoice: string
}

const HomeLeaguePlusbtn:React.FC<HomeLeaguePlusbtnProp> = ({leagueChoice}) => {
  return (
    <div className='w-full flex justify-center py-2'>
      <button
        className='px-2 py-1 bg-green-400 text-white cursor-pointer rounded-md'
      >
        <Link
          to={{
            pathname: '/football',
            search: `?league=${leagueChoice}`,
          }}
        >
          순위 더 보러가기
        </Link>
      </button>
    </div>
  )
}

export default HomeLeaguePlusbtn
