import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useCookieSetup } from "@/hooks/useCookieSetup";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const Test = (props: Props) => {
  const handleCallback = useCookieSetup();
  useEffect(() => {
    handleCallback();

    const getNewShare = async () => {
      const data = await axios.get(
        `http://localhost:8080/private-key?key=${"801de7fbfd97a808117a0e2269286aa21ba73d06ec24aa7b6e556aa0e611ed4df83fc1b096dfe89c607a915a54e09731e529ebb0ce0b62ce04e8cf0b8074546f24b6caaa6ed3e91e15415acf91c4719c123"}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwb29ydmNvZGVzMzgxQGdtYWlsLmNvbSIsImlkIjoiNjQwZjQ2NmMwNWY3YjdmNWVhNDM0MzJlIiwiYWRkcmVzcyI6IkIyZ3htbUtiU1BKdjJnRE5ZTXFKUEpyemNMVEZ5OW9ObVY3RWR5UkdxQTl0IiwidGltZSI6Ik1vbiBNYXIgMTMgMjAyMyAxNjowMjowNyBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiaWF0IjoxNjc4NzIzMzI3fQ.Mw4aMA-ZgjxMREIUk6jU86sc0CZcOJ9oIM2N3uy1umU",
              "AuthorizationBasic": "Basic 801de7fbfd97a808117a0e2269286aa21ba73d06ec24aa7b6e556aa0e611ed4df83fc1b096dfe89c607a915a54e09731e529ebb0ce0b62ce04e8cf0b8074546f24b6caaa6ed3e91e15415acf91c4719c123"
          },

        }
      );
      console.log(data);
    };
    getNewShare();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center my-6 text-white">
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
