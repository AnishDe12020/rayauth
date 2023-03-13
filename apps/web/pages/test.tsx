import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useAuth from "@/hooks/useAuth"
import React from "react";

type Props = {};

const Test = (props: Props) => {
  const {jwt, user} = useAuth()
console.log(jwt, user?.address)
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
        {jwt}
        <div>{user?.address}</div>
      </div>
    </div>
  );
};
Test.PageLayout = DashboardLayout;
export default Test;
