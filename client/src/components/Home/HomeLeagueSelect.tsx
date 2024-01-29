interface HomeLeagueSelectProps {
  data: {
    league: string;
    name: string
  }
}

const HomeLeagueSelect:React.FC<HomeLeagueSelectProps> = ({data}) => {
  return (
    <option className='bg-white text-black' value={data.league}>
      {data.name}
    </option>
  )
}

export default HomeLeagueSelect
