import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SendOTP() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/otp/send`, { email });
            if(response.status == 200){
                toast.success("Otp sent sucessfully");
                navigate(`/verifyOTP/${email}`)

            }
        } catch (error) {
            throw Error("Error in sending otp", error);
        }
    }
    return (
        <>
            <div className='w-full min-h-screen flex  justify-center items-center mt-10 '>
                <div className='w-full m-3 md:w-md border rounded-2xl p-2'>
                    <form
                        onSubmit={sendOTP}
                        className='flex flex-col space-y-5'
                    >
                        <h2 className='text-center font-bold'>Email Verification</h2>
                        <input
                            type="text"
                            name='email'
                            placeholder='Enter Email for signup'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border rounded-sm p-2'
                            required
                        />
                        <button className='w-20 m-auto bg-green-400  hover:cursor-pointer rounded-md text-white text-md'>Send OTP</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SendOTP;
