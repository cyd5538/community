import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LeagueDatatable } from "@/types/foontballTypes"

interface LeagueRankTopfourProp {
  data: LeagueDatatable[]
}

const LeagueRankTopfour: React.FC<LeagueRankTopfourProp> = ({ data }) => {

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mt-4 w-60 sm:w-4/5 ml-16 "
    >
      <CarouselContent>
        {data.map((rankData) => (
          <CarouselItem key={rankData.position} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-1 relative">
              <div className="absolute top-0 left-[-20px] bg-green-500 text-white rounded-full w-10 h-10 text-base font-semibold flex justify-center items-center">
                {rankData.position}위
              </div>
              <img src={rankData.team.crest} alt="" className='w-24 h-24' />
              <div className="flex gap-2 justify-center items-center h-8">
                <p className="underline text-sm text-center">{rankData.team.name}</p>
              </div>
              <div className="font-semibold"> {rankData.points} points </div>
              <div>{rankData.won}승 {rankData.draw} 무 {rankData.lost} 패</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default LeagueRankTopfour
