import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {useCookieSetup} from "@/hooks/useCookieSetup"
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const Test = (props: Props) => {
  const handleCallback = useCookieSetup()
 useEffect(()=> {
  handleCallback();
  const getNewShare = async () => {
    const data = await axios.get(`${BACKEND_URL}/user/device-share`, {
      data: {
        key : "80277ed1949ca2c758db9b292c12809f00e26c17f18b020fc07f8127a75f6833d4892d5083bb50df68054e3016ea1c7ae41c05a51ba8f7215954a43b788f3657ee545d5c7aacd6aa90bec78f9c1c448a82a"
      },
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwb29ydmNvZGVzMzgxQGdtYWlsLmNvbSIsImlkIjoiNjQwZjQ2NmMwNWY3YjdmNWVhNDM0MzJlIiwiYWRkcmVzcyI6IkIyZ3htbUtiU1BKdjJnRE5ZTXFKUEpyemNMVEZ5OW9ObVY3RWR5UkdxQTl0IiwidGltZSI6Ik1vbiBNYXIgMTMgMjAyMyAxNjowMjowNyBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiaWF0IjoxNjc4NzIzMzI3fQ.Mw4aMA-ZgjxMREIUk6jU86sc0CZcOJ9oIM2N3uy1umU"
      }
    },
    )
    console.log(data)
  }
  getNewShare()
 },[])
  return (
    <div className="flex justify-center">
      <div className="my-6 flex flex-col justify-center text-white">
        <div>
          <h2 className="my-6">Buttons</h2>
          <Button processing>
            <div>Test</div>
          </Button>
        </div>
        <div>
          <h2 className="my-6">Buttons</h2>
          <Button>
            <div>Test</div>
          </Button>
        </div>
        <div>
          <Input
            message="sagar"
            placeholder="input here"
            error="ndn"
            label={"Test Input"}
          />
        </div>
       
      </div>
    </div>
  );
};
export default Test;
