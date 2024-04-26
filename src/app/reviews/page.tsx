"use client"

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import React, {useEffect, useState} from 'react'
import { useEdgeStore } from '@/lib/edgestore'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import ReviewCard from '@/components/core/ReviewCard'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogHeader } from '@/components/ui/dialog'

const App = () => {

  const [file, setFile] = useState<File>()
  const {edgestore} = useEdgeStore()
  const [review, setReview] = useState("")
  const [place, setPlace] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState()

  const session:any = useSession()

  const getReviews = async () => {
    try {
      const reviews = await axios.get("/api/reviews")
      setData(reviews.data.doc)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {

    let obj:any = {}

    try {
      setLoading(true)
      if (file) {
        const res = await edgestore.myPublicImages.upload({file})
        obj["url"] = res?.url
        obj["thumbnailUrl"] = res?.thumbnailUrl
      }

      if (!review) {
        toast({title: "Please provide a Review"})
      } else if (!place) {
        toast({title: "Please provide the name of place"})
      } else {
        obj["review"] = review
        obj["place"] = place
        obj["email"] = session?.data?.user?.email

        const res = await axios.post("/api/reviews", {objData: obj})
        toast({title: "Posted successfully"})
        setFile(undefined)
        setReview("")
        setPlace("")
      }

    } catch (err:any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getReviews()
  }, [loading])

  return (
    <>
      { session?.status === "authenticated" &&
      <Dialog>
          <DialogTrigger asChild >
            <Button className='fixed bottom-4 right-4'><Plus /></Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]' >
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
              <DialogHeader>Create a review about a place</DialogHeader>
          </DialogHeader>
          <div className='grid gap-4' >
            <Input type='file' onChange={(e:any) => setFile(e.target.files?.[0])} />
            <Input value={place} onChange={(e:any) => setPlace(e.target.value)} placeholder='Place Name' />
            <Textarea value={review} onChange={(e:any) => setReview(e.target.value)} placeholder='Write A Review' />
            <div>
            <Button onClick={handleClick} disabled={loading} >{!loading ? "Publish" : <Loader2  className='animate-spin' />}</Button>
            </div>
          </div>
        </DialogContent>
        </Dialog>
      }

      <div className='lg:w-1/3 md:w-[45vw] w-[90vw] grid gap-4 mb-4' >
               {
          data && Object.values(data).reverse().map((e:any, i:number) => <React.Fragment key={i} ><ReviewCard data={e} /></React.Fragment>)
        }
      </div>
    </>
  )
}

export default App
