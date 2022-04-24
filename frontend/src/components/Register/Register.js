import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";


const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Register = () => {
  const history = useNavigate();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [telephoneNumber, setTelephone] = useState("");
  const [emailAddress, setEmailaddress] = useState("");
  const [nicNumber, setNicnumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const registerHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        //use axios API
        "/api/auth/register",
        {
          firstName,
          lastName,
          nicNumber,
          emailAddress,
          password,
          telephoneNumber,
        },
        config
      );

      localStorage.setItem("authToken", data.token); //set the data to the browswer local storage
      localStorage.setItem("emailAddress", data.emailAddress);
      localStorage.setItem("firstName", data.firstName);

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Register Successfully 😘",
          placement,
        });
        history("/login");
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <div className="container mx-auto contact-bg">
        <div className="flex justify-center mt-8 gap-28 mb-10 w-full">
          <div className=" border-2 text-center border-gray-900 px-72 register-bg bg-cover mt-10 mb-10">
            <div className="mb-10">
              <div className="mt-20 flex">
                <div className=" -translate-x-44">
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={() => registerHandler("top")}
                  >
                    <div className=" mb-8 ml-28 font-semibold text-3xl  border-2 p-2 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                      Register
                    </div>
                    <div className=" absolute translate-y-14 ml-96 translate-x-72">
                      <div className=" text-3xl font-semibold ">
                        Welcome to Travel
                      </div>
                      <div className=" text-3xl font-semibold">Management</div>
                      <div className=" text-3xl font-semibold">System</div>
                      <div>
                        <NavLink to="/login">
                          <Button type="primary" danger>
                            Sign In
                          </Button>{" "}
                        </NavLink>
                      </div>
                    </div>
                    <div className=" -translate-x-52">
                      <Form.Item
                        name="first name"
                        label="Firts Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={firstName}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter First Name"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please First Enter Name">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="last name"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={lastName}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Last Name"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Last Name">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="telephone number"
                        label="Telephone Number"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone Number!",
                          },
                          {
                            min: 10,
                            message:
                              "Phone Number must be minimum 10 characters.",
                          },
                          { max: 10 },
                        ]}
                        initialValue={telephoneNumber}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Telephone Number"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter your phone number ex: 0774258796">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          maxLength={10}
                          onChange={(e) => setTelephone(e.target.value)}
                          type="number"
                        />
                      </Form.Item>
                      <Form.Item
                        name="nic number"
                        label="NIC Number"
                        rules={[
                          {
                            required: true,
                          },
                          { min: 9, message: "NIC be minimum 10 characters." },
                          { max: 12 },
                        ]}
                        initialValue={nicNumber}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter NIC Number"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={[
                            <span style={{ marginRight: "10px" }}>
                              {nicNumber.length === 9 && "V"}
                            </span>,
                            <Tooltip title="Enter employee National Identity Card ex: 991330534V">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>,
                          ]}
                          showCount
                          maxLength={12}
                          onChange={(e) => setNicnumber(e.target.value)}
                          type="number"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email address"
                        label="Email Address"
                        rules={[
                          {
                            required: true,
                          },
                          { type: "email" },
                          { max: 50 },
                        ]}
                        initialValue={emailAddress}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Email Address"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter your email ex: admin@example.com">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          maxLength={50}
                          onChange={(e) => setEmailaddress(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={password}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Password"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Password">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </Form.Item>
                    </div>
                    <Form.Item {...tailLayout}>
                      <div className="flex  px-20 mt-8">
                        <Button type="primary" htmlType="submit">
                          {loading ? (
                            <>
                              <Spin /> Registering..
                            </>
                          ) : (
                            "Register"
                          )}
                        </Button>{" "}
                        {error && (
                          <span
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            {error}
                          </span>
                        )}{" "}
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
