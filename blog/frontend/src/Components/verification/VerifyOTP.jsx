import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyOTP() {
    const [otp,setOtp] = useState("");
    const [error,setError] = useState("");
    const {email} = useParams();
    const navigate = useNavigate();
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/otp/verify`, {email,otp});
            console.log("verificaton :" , response.data)
            if(response.data.message == "OTP Verified successfully"){
                toast.success("OTP VERIFY SUCCESSFULLY");
                navigate(`/signup/${email}`);
            }
        } catch (error) {
            setError(error.response.data.message);
            throw Error("Error in sending otp", error);
        }
    }
    return (
        <>
            <div className='w-full min-h-screen flex  justify-center items-center mt-10 '>
                <div className='w-md border rounded-2xl p-2'>
                    <form
                        onSubmit={verifyOTP}
                        className='flex flex-col space-y-5'
                    >
                        <h2 className='text-center font-bold'>Verification of Otp</h2>
                        <input
                            type="text"
                            name='otp'
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='border rounded-sm p-2'
                            required
                        />
                        {
                            error && <p>{error}</p>
                        }
                        <button className='w-20 m-auto bg-green-400  hover:cursor-pointer rounded-md text-white text-md'>Verify OTP</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifyOTP;
