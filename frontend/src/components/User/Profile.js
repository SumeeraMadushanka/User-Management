import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import UserNavbr from "./UserNavbar";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

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

const Profile = () => {
  const history = useNavigate();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [telephoneNumber, setTelephonenumber] = useState("");
  const [emailAddress, setEmailaddress] = useState("");
  const [nicNumber, setNicnumber] = useState("");

  const [loading, setLoading] = useState(false); //additional

  const { id } = useParams();

  useEffect(() => {}, []);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/auth/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            telephoneNumber: res.data.telephoneNumber,
            emailAddress: res.data.emailAddress,
            nicNumber: res.data.nicNumber,
          });
          setFirstname(res.data.firstName);
          setLastname(res.data.lastName);
          setTelephonenumber(res.data.telephoneNumber);
          setEmailaddress(res.data.emailAddress);
          setNicnumber(res.data.nicNumber);
        })
        .catch((err) => alert(err));
    };
    getData();
  }, []);

  const updateHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/api/auth/update/${id}`,
        {
          firstName,
          lastName,
          nicNumber,
          emailAddress,
          telephoneNumber,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Update details 😘",
          placement,
        });
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`/api/auth/delete/${id}`);
      alert("Deleted Successfully");
      setTimeout(() => {
        history("/home");
      }, 5000); //5s
    } catch (error) {
      alert(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      <UserNavbr />
      <div className="container mx-auto contact-bg">
        <div className="flex justify-center mt-8 gap-28 mb-10 w-full">
          <div className=" border-2 text-center border-gray-900 px-56 admin-bg mt-10 mb-10">
            <div className="mb-10">
              <div className="mt-20 flex">
                <div className=" -translate-x-48">
                  <div className="p-2 text-5xl translate-x-52 mb-8 mx-auto mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md ">
                    Welcome to your profile
                  </div>
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={() => updateHandler("top")}
                  >
                    <div>
                      <Form.Item
                        name="firstName"
                        label="Firts Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter First Name"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={[
                            <Tooltip title="Please First Enter Name">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>,
                          ]}
                          onChange={(e) => setFirstname(e.target.value)}
                          value={firstName}
                        />
                      </Form.Item>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
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
                          value={lastName}
                        />
                      </Form.Item>
                      <Form.Item
                        name="nicNumber"
                        label="NIC Number"
                        rules={[
                          {
                            required: true,
                          },
                          { min: 9, message: "NIC be minimum 10 characters." },
                          { max: 12 },
                        ]}
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
                          onChange={(e) => setNicnumber(e.target.value)}
                          value={nicNumber}
                        />
                      </Form.Item>
                      <Form.Item
                        name="telephoneNumber"
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
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter telephone Number"
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
                          onChange={(e) => setTelephonenumber(e.target.value)}
                          value={telephoneNumber}
                        />
                      </Form.Item>
                      <Form.Item
                        name="emailAddress"
                        label="Emal Address"
                        rules={[
                          {
                            required: true,
                          },
                          { type: "email" },
                          { max: 50 },
                        ]}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Email Address"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Email Address">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setEmailaddress(e.target.value)}
                          value={emailAddress}
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="flex justify-center items-center gap-4 translate-x-48">
                      <div>
                        <Form.Item {...tailLayout}>
                          <div className="  mt-8">
                            <Button type="primary" htmlType="submit">
                              {loading ? (
                                <>
                                  <Spin /> Update...
                                </>
                              ) : (
                                "Update"
                              )}
                            </Button>{" "}
                          </div>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item {...tailLayout}>
                          <div className="  mt-8">
                            <Button type="primary" onClick={deleteData}>
                              Delete
                            </Button>{" "}
                          </div>
                        </Form.Item>
                      </div>
                    </div>
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

export default Profile;
