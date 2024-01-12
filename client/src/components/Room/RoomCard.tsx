import { RoomType } from '@/types/types'
import React from 'react'

interface RoomCardType {
  room: RoomType
}

const RoomCard:React.FC<RoomCardType> = ({room}) => {
  console.log(room)
  return (
    <div>
      
    </div>
  )
}

export default RoomCard
