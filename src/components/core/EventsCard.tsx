"use client"
import Image from 'next/image'
import React from 'react'
import { format, getUnixTime } from 'date-fns'
import { Button } from '../ui/button'
import Link from 'next/link'

const imageStyles = {
  maxHeight: '40vw'
}

const dateFormatter = (date:any) => {
  if (date!=="Invalid Date") {
    const f = format(date, "yyyyMMdd")
    const l = format(date, "HHmmss")
    return `${f}T${l}Z`
  } else return "not provided"
 }

const EventsCard = ({data}:any) => {

  const startTime = new Date(data?.start_time)
  const endTime = new Date(data?.end_time)

  const handleClick = () => {
    console.log(data)
  }



  const url = `https://calendar.google.com/calendar/r/eventedit?text=${data?.name?.replaceAll(" ", "+")}&dates=${dateFormatter(startTime)}/${dateFormatter(endTime)}`;

  return <div onClick={handleClick} className='bg-muted border gap-1 grid grid-cols-1 p-4 rounded-md' >
    {/*<div className='w-full max-h-90' >
    <Image width={600} objectFit='cover' height={400} src={data?.thumbnail} alt={data?.name} style={imageStyles} />
    </div>
    */}
    <p className='text-lg font-bold' >{data?.name}</p>
    <p className='text-sm text-muted-foreground text-ellipsis line-clamp-2 max-w-fit' >{data?.description}</p>
    <div className='text-xs mt-4 font-bold' >{format(new Date(data?.start_time), 'h:mm a')} to {format(new Date(data?.end_time), "h:mm a")}</div>
    <p className='text-xs font-semibold text-muted-foreground'>Venue: {data?.venue?.full_address || "Not Provided"}</p>
    <div className='mt-4'>
    <Button asChild><Link href={url} target='_blank' >Add to Calendar</Link></Button>
    </div>
  </div>
}

const AllEvents = ({events}: any) => {
  const keys = Object.keys(events)
  console.log(keys)
  return (
    <>
      <div className='w-full grid grid-cols-1 gap-4 my-4' >
      {keys.map((e:any) =>  (
      <React.Fragment key={e} >
          {events[e]?.data?.length > 0 && 
            <>
      <p className='font-semibold text-xl' >{e}</p>
      {events[e]?.data?.map((data:any) => <React.Fragment key={data?.event_id} ><EventsCard data={data} /></React.Fragment>)}
      </>
        }
      </React.Fragment>
      ))}
    
      </div>
  </>
  )
}

export default AllEvents
