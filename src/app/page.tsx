"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import * as React from "react";
import { toast } from "@/components/ui/use-toast";
import AllEvents from "@/components/core/EventsCard";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AllPlaces from "@/components/core/PlacesCard";
import { Loader2 as ReloadIcon } from "lucide-react";
import { getAllData } from "@/helper/compileData";
import { getData } from "@/helper/crewaiData";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";

export default function Home() {
  const [city, setCity] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<any>();
  const session: any = useSession();
  const [timing, setTiming] = React.useState<string>("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await getData({
        city: city.toString(),
        timing: timing.toString(),
      });
      if (data.success) {
        setRes(data.response);
      }

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("data", data.response);
        localStorage.setItem("city", city);
        localStorage.setItem("timing", timing);
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error Occurred" });
    } finally {
      setLoading(false);
    }
  };

  const disabled = session.status !== "authenticated";

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const dat: any = localStorage.getItem("data");
      const cit: any = localStorage.getItem("city");
      const tim: any = localStorage.getItem("timing");

      if (dat) {
        setRes(dat.replace('"', ""));
        setCity(cit);
        setTiming(tim);
      }
    }
  }, []);

  console.log(res);

  return (
    <>
      <div className="lg:w-1/2 md:w-[70vw] w-[98vw] flex">
        <Input
          className="mr-4"
          placeholder="San Francisco"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          className="mr-4"
          placeholder={`10:00 AM to 9:00 PM, ${format(
            Date.now(),
            "dd LLLL yyyy"
          )}`}
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          type="text"
        />
        <Button disabled={loading || disabled} onClick={handleSearch}>
          {loading ? (
            <ReloadIcon className="h-4 w-4 animate-spin font-bold" />
          ) : (
            <Search />
          )}
        </Button>
      </div>
      <div className="lg:w-1/2 md:w-[70vw] mt-4 w-[90vw]">
        {loading && (
          <p className="text-lg font-bold mt-2">
            This might take several minutes.....
          </p>
        )}
        {!loading && res && (
          <article className="prose prose-lg">
            <Markdown>{res}</Markdown>
          </article>
        )}
      </div>
    </>
  );
}
