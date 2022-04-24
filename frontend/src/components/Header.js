import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeTwoTone } from "@ant-design/icons";

const Header = () => {
  const history = useNavigate();

  return (
    <div className=" container mx-auto">
      <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-16">
        <div className="text-4xl float-left translate-x-4">
          <HomeTwoTone onClick={() => history("/dashbord")} />
        </div>
        <div className="pt-4 flex">
          <div className="mx-auto -translate-x-6 gap-4">
            <Button type="primary" onClick={() => history("/bookflight")}>
              Book a Flight
            </Button>{" "}
            <Button type="primary" onClick={() => history("/addtraveldetails")}>
              Add Travel Details
            </Button>{" "}
            <Button type="primary" onClick={() => history("/traveldetails")}>
              Travel Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
