"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import * as React from "react"
import { toast } from "@/components/ui/use-toast";
import AllEvents from "@/components/core/EventsCard";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AllPlaces from "@/components/core/PlacesCard";
import { Loader2 as ReloadIcon } from "lucide-react";
import { getAllData } from "@/helper/compileData";

export default function Home() {

  const [city, setCity] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>(null)
  const session:any = useSession()
  const [savedCity, setSavedCity] = React.useState<string>("")
  

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await getAllData({city})
      console.log(response)
      setData(response.data)

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem('data', JSON.stringify(response.data))
        localStorage.setItem('city', city)
      }

    } catch (err) {
      console.log(err)
      toast({title: "Error Occurred"})
    } finally {
      setLoading(false)
    }
  }

  const disabled = session.status !== "authenticated"

  React.useEffect(()=>{console.log(loading)}, [loading])
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const dat:any = localStorage.getItem("data")
      const cit:any = localStorage.getItem("city")
      if (dat) {
        setData(JSON.parse(dat))
        setSavedCity(cit)
      }
    }
  }, [])

  return (
    <>
        <div className="lg:w-1/2 md:w-[70vw] w-[90vw] flex" >
          <Input className="mr-4" placeholder="San Francisco" value={city} onChange={e => setCity(e.target.value) } />
          <Button disabled={loading || disabled} onClick={handleSearch} >{loading ? <ReloadIcon className="h-4 w-4 animate-spin font-bold" />: <Search/>}</Button>
        </div>
        <div className="lg:w-1/2 md:w-[70vw] mt-4 w-[90vw]" >
          {loading && <p className="text-lg font-bold mt-2" >This might take several minutes.....</p>}
        {data && !loading && 
        <Tabs defaultValue="events" className="w-full mb-2" >
            <TabsList className="grid w-full grid-cols-2" >
              <TabsTrigger value="events" >Events</TabsTrigger>
              <TabsTrigger value="places" >Places</TabsTrigger>
            </TabsList>
            <TabsContent value="events" >

              <AllEvents events={data?.events} />
            </TabsContent>
              <TabsContent value="places">
                <AllPlaces places={data?.places} city={city || savedCity} />
              </TabsContent>

        </Tabs>
        }
      </div>
      </>
  );
}
