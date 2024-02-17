import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TeamMatch } from "@/types/foontballTypes"
import { format } from 'date-fns';

interface TeamScheduleCarouselProp {
  title: string
  data: TeamMatch[] | undefined
}

export function LeagueTeamScheduleCarousel({ title, data }: TeamScheduleCarouselProp) {

  return (
    <>
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-sm" opts={{
          align: "start",
        }}>
          <CarouselContent className="-ml-1"> 
            {data?.map((item, index) => {
              const date = new Date(item.utcDate);
              return (
                <CarouselItem key={index} className="pl-1 md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col w-full max-h-[180px] gap-2 aspect-square items-center justify-center">
                        <div className="flex items-center justify-center h-[120px] w-full gap-2">
                          <div className="flex w-1/2 flex-col gap-2 justify-center items-center">
                            <img src={item.homeTeam.crest} alt={item.homeTeam.name} className="w-16 h-16 md:w-10 md:h-10" />
                            <span className="text-xs h-4 text-center">
                              {item.homeTeam.shortName}
                            </span>
                            <span className="font-bold text-xl">{item.score.fullTime.home}</span>
                          </div>
                          <div className="flex w-1/2 flex-col gap-2 justify-center items-center">
                            <img src={item.awayTeam.crest} alt={item.awayTeam.name} className="w-16 h-16 md:w-10 md:h-10" />
                            <span className="text-xs h-4 text-center">
                              {item.awayTeam.shortName}
                            </span>
                            <span className="font-bold text-xl">{item.score.fullTime.away}</span>
                          </div>
                        </div>
                        <span>
                          {format(date, 'yyyy-MM-dd')}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
