"use client"
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const PlaceCard = ({data,city}:any) => {
  return <div className='w-full bg-muted grid gap-4 grid-cols-1 p-4 rounded-md' >
    <p className='text-lg font-bold' >{data?.name}</p>
    <p className='text-sm text-muted-foreground text-ellipsis line-clamp-2 max-w-fit' >{data?.description}</p>
    <div>
      {data?.time_for_visit && 
      <>
    <p className='text-sm font-bold' >Best Visiting Hours</p>
    <div className='text-xs font-semibold text-muted-foreground' >
            {data?.time_for_visit?.map((e:any, i:any) => 
              <React.Fragment key={i} >
                <p>{e?.from || ""} - {e?.to}</p>
              </React.Fragment>
            )}
    </div>
    </>
    }
    </div>
    <div>
      <Button asChild><Link target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${data?.name.replaceAll(" ", "+")},+${city?.replaceAll(" ", "+")}`} >Open In Maps</Link></Button>
    </div>
  </div>
}

const AllPlaces = ({places, city}:any) => {
  console.log(places)
  const keys = Object.keys((places))
  return <div className='w-full grid grid-cols-1 gap-4 my-4' >
    {keys.map((e:any) => (
    <React.Fragment key={e} >
        <p className='font-semibold text-xl capitalize' >{e.replaceAll("_", " ")}</p>
        {places[e]?.map((data:any) => <React.Fragment key={data?.latitude} >
          <PlaceCard data={data} city={city} />
        </React.Fragment>)}
      </React.Fragment>
    ))}
  </div>
}

export default AllPlaces
