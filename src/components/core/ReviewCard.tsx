import Image from "next/image"

const ReviewCard = ({data}:any) => {
  return (
  <div className='w-full bg-muted grid gap-4 grid-cols-1 p-4 rounded-md' >
    <p className='text-lg font-bold' >{data?.place}</p>

    <Image width={1200} height={1200} alt={data?.url} src={data?.url} />
    <p className='text-sm text-muted-foreground text-ellipsis font-bold max-w-fit' >{data?.review}</p>
  </div>
  )
}

export default ReviewCard
