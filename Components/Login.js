import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

export const Login = () => {
  const [name, setName] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    let data = new FormData(e.target);

    if (!data.get("name") || !data.get("email")) {
      return toast("", {
        type: "error",
        closeOnClick: true,
        isLoading: true,
      });
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;

    if (!emailRegex.test(data.get("email"))) {
      alert("Please enter a valid email address.");
      return "Please enter a valid email address.";
    }
  };

  return (
    <section className="rounded-xl bg-gray-50  dark:bg-gray-900">
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 ">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="************@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none   focus:ring-4 "
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <p className="space-x-5 text-sm font-light text-gray-900 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="#"
                  className=" text-primary-600 dark:text-primary-500 space-x-6 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    console.log(event.target.file);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);

      return toast("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export const CameraComponent = () => {
  const webcamRef = useRef(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    webcamRef.current.getScreenshot();
    try {
      const response = await axios.post("/api/upload", { image: imageSrc });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};
