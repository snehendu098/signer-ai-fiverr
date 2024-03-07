"use client"

import NavBar from '@/components/core/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Pencil, Save } from 'lucide-react'
import ReviewCard from '@/components/core/ReviewCard'

const Profile = () => {

  const session:any = useSession()
  const [data, setData] = useState<any>()
  const [editing, setEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [reviews, setReviews] = useState({})

  const getProfileData = async () => {
    try {
      const res = await axios.get(`/api/profile?email=${session?.data?.user?.email}`)
      setData(res?.data?.doc)
      console.log(res.data.doc)
    } catch (err:any) {
      console.log(err)
    }
  }

  const getReviews = async () => {
    try {
      const res = await axios.get(`/api/profile/review?email=${session?.data?.user?.email}`)
      setReviews(res?.data?.doc)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    try {

      if (!data.name) {
        toast({title: "Enter your name"})
      } else {      
        const res = await axios.post(`/api/profile`, {email: session?.data?.user?.email, name: data?.name})
        if (res?.data?.success){
        toast({title: "Your Name has been saved"})
        }
      }

    } catch (err:any) {
      console.log(err)
    } finally {
      setEditing(false)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if (session.status === "authenticated") {
      getProfileData()
      getReviews()
    }
  }, [session])

  return (
    <div className='lg:w-1/3 md:w-[45vw] w-[90vw] grid gap-4 mb-4' >
        <Card className='w-full' >
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>{session?.data?.user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex space-x-4' >
            <Input disabled={!editing} placeholder='Your Name' value={data?.name || ""} onChange={(e:any) => setData({...data, name: e.target.value}) } />
            {editing ? <Button onClick={handleClick} variant={"ghost"} className='text-xs' disabled={loading} ><Save /></Button> : <Button className='text-xs' variant={"ghost"} onClick={() => setEditing(true)} ><Pencil /></Button>}
            </div>
          </CardContent>
          <CardFooter>
            <p className='text-xs font-bold' >Reviews: {Object.values(reviews).length || 0}</p>
          </CardFooter>
        </Card>
      {reviews && Object.keys(reviews).length > 0 && (
        <>
          <p className='font-bold text-2xl' >Reviews</p>
        {Object.values(reviews).map((e:any, i:number) => <React.Fragment key={i} ><ReviewCard data={e} /></React.Fragment>)}
        </>
      ) }

    </div>
  )
}

export default Profile
