import React, { useState } from "react";
import { Form, Input, Button, Spin, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";

import { Link } from "react-router-dom";

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

const Login = () => {
  const [emailAddress, setEmailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const history = useNavigate();

  const loginHandler = async (placement) => {
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
        "/api/auth/login",
        { emailAddress, password },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("nicNumber", data.nicNumber);
      localStorage.setItem("telephoneNumber", data.telephoneNumber);
      localStorage.setItem("emailAddress", data.emailAddress);
      localStorage.setItem("id", data.id);
      

      setTimeout(() => {
        // set a 5seconds timeout for authentication

        if (data.emailAddress === "admin@gmail.com") {
          history("/admin");
        } else {
          history(`/user-dashboard/${data.firstName}`);
        }

        setLoading(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      {" "}
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
                    onFinish={() => loginHandler("top")}
                  >
                    <div className=" mb-8 ml-28 font-semibold text-3xl  border-2 p-2 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                      Sign In
                    </div>
                    <div className=" absolute -translate-y-8 ml-96 translate-x-72">
                      <div className=" text-3xl font-semibold ">NEW HERE?</div>
                      <div className=" text-lg font-semibold">
                        Sign up and discover a great amount of new opportunities
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          onClick={() => history("/register")}
                        >
                          Register
                        </Button>{" "}
                      </div>
                    </div>
                    <div className=" -translate-x-52">
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
                    <Link to={"/forgotpassword"}>
                      <div className=" text-gray-50 ml-10">
                        Forgot password?
                      </div>
                    </Link>
                    <Form.Item {...tailLayout}>
                      <div className="flex  px-20 mt-8">
                        <Button type="primary" htmlType="submit">
                          {loading ? (
                            <>
                              <Spin /> Authenticating..
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>{" "}
                        <p>
                          {error && (
                            <span
                              className="badge bg-warning"
                              style={{ color: "white" }}
                            >
                              {error}
                            </span>
                          )}
                          {available && (
                            <span
                              className="badge bg-danger"
                              style={{ color: "white" }}
                            >
                              {available}
                            </span>
                          )}
                        </p>
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

export default Login;
