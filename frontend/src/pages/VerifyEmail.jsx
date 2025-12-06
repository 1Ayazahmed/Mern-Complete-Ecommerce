import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("✔️ Email Verified Successfully! Redirecting...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatus("❌ Verification Failed. Try Again.");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161616]">
      <div className="bg-[#1f1f1f] border border-gray-700 shadow-xl rounded-xl p-6 max-w-md w-full text-center">
        <h2
          className={`text-lg font-semibold ${
            status.includes("✔️")
              ? "text-green-400"
              : status.includes("❌")
              ? "text-red-400"
              : "text-gray-400"
          }`}
        >
          {status}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {status.includes("✔️")
            ? "You can now sign in to your account."
            : status.includes("❌")
            ? "Please check your link or try again."
            : "Please wait while we verify your email."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
