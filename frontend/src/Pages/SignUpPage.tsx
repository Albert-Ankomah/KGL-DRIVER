import { useRef, useEffect, useState, useCallback, } from 'react'
// import nissan_rl from '../assets/nissan_rl.jpg' 
// import left_lr from '../assets/left_lr.jpg'
import left from '../assets/left.png'
import gsap from 'gsap'
import SplitType from "split-type"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const SignUpPage = () => {
    const carRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const quotes = [
        "Drive fast, live free.",
        "Stay alert, stay alive.",
        "Look twice, save a life.",
        "Safety first, safety always.",
        "Safety starts with you.",
        "Safety is a full-time job.",   
    ];

    const [formData, setFormData] = useState({ firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [quote, setQuote] = useState(quotes[0]);

    const updateQuote = useCallback(() => {
            let newQuote;
            do {
                newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            } while (newQuote === quote); // Ensures a different quote is picked
            setQuote(newQuote);
        }, [])
    
// use effect hooks
useEffect(() => {
        const tl = gsap.timeline();
        gsap.set("#welcome", { perspective: 400 });

        tl.fromTo(
            carRef.current,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 1,
                duration: 2,
                ease: "power2.out",
                stagger: 0.5,
            }
        ).to("#slogan", { opacity: 1, duration: 2 });
    }, []);

    // split text
    useEffect(() => {
        setTimeout(() => {
            const split = new SplitType("#quote1", { types: "chars" });

            gsap.fromTo(
                split.chars,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        },100);
    }, [quote]);
    


    useEffect(() => {
        const interval = setInterval(updateQuote, 8000);
        return () => clearInterval(interval);
    }, [updateQuote]);
    

    useEffect(() => {
        gsap.fromTo(containerRef.current, 
        { opacity: 0, x: -50 },  // Start from right
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" } // Smooth fade-in
        );
    }, []);
    

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [message])


    // functions
    const handleLoginAnimation = () => {
        gsap.to(containerRef.current, {
        opacity: 0,
        x: 50, // Move right when leaving
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => { navigate("/"); }, // Navigate after animation
        });
    };
    

    // handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    // handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match')
            setLoading(false)
            return
        }

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
            setMessage('All fields are required')
            setLoading(false)
            return
        }

        try {
            const response = await axios.post('http://localhost:7000/signup', formData)
            console.log(response.data)
            setMessage(response.data.message)
            // setFormData({ firstName: '', lastName: '', phoneNumber: '', password: '', confirmPassword: '' })
            setTimeout(() => { navigate("/"); }, 2000)

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data?.error );
            } else {
                setMessage('Sign up failed');
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div ref={containerRef} className='w-full min-h-screen flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 h-full flex flex-col px-8 md:px-20 py-29 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-600'>
                    <h1 id = 'welcome' className='text-3xl md:text-4xl font-bold tracking-tighter italic py-10 md:py-16'>Join Our Team!</h1>
                
                    <div className='w-full flex flex-col '>
                        <div className='w-full flex flex-col mb-4'>
                            <h3 className='text-2xl md:text-3xl font-semibold mb-2'>Register</h3>
                            <p className='text-sm mb-3 font-bold'>Please enter your credentials.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-6'>
                        <input type="text" name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} className='w-full max-w-md text-black py-2 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />
                        <input type="text" name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} className='w-full max-w-md text-black py-2 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />
                        <input type="text" name='phoneNumber' placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} className='w-full max-w-md text-black py-2 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />
                        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='w-full max-w-md text-black py-2 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />
                        <input type="password" name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} className='w-full max-w-md text-black py-2 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />

                        <div className='flex flex-row gap-4 py-14 justify-center text-center'>
                            <button disabled={loading} className='flex justify-center cursor-pointer rounded-md bg-black text-white font-bold py-2 px-6 w-full max-w-xs'>
                                {loading ? (<div className='w-5 h-5 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>): ('Signup')}
                            </button>
                        </div>

                        {message && <p className='text-red-800 text-center italic font-semibold tracking-tighter'>{message}</p>} 
                    </form>

                    <div className='w-full flex gap-1 items-center align-center justify-center py-10'>
                        <p className='text-sm font-normal'>Have an account? </p>
                        <button onClick={handleLoginAnimation}  className='text-gray-900 font-bold underline transition hover:text-blue-800'>
                            Login
                        </button>
                    </div>

                </div>

                <div className='relative w-full md:w-1/2 h-full flex flex-col p-6 md:p-8 text-center bg-gradient-to-b from-gray-100 via-gray-300'>
                    <div className='flex flex-col items-center justify-center '>
                        <h1 id='quote1' key={quote} className='text-2xl md:py-3 md:text-4xl font-bold text-gray-800 mb-2'>{quote}</h1>
                        <p className='text-gray-500 text-lg py-1 '>Cops just love saying hi!</p>
                    </div>
                    <img ref={carRef} src={left} alt="nissan_1" className='w-140 h-170  mx-auto py-10 '/>

                    <p id='slogan' className='opacity-0 text-sm font-bold italic text-gray-800 py-10 md:py-20 tracking-tighter mt-[-7rem]'>Safety isn’t just a slogan, it’s a way of life!!!.</p>

                    <div id= 'values' className='grid grid-cols-3 gap-4 text-sm font-semibold text-center justify-center align-center md:mt-20'>
                        <p className="text-red-400 hover:text-red-600 transition duration-300 transform hover:scale-105">#Innovate.</p>
                        <p className="text-blue-400 hover:text-blue-600 transition duration-300 transform hover:scale-105">#Connect.</p>
                        <p className="text-green-400 hover:text-green-600 transition duration-300 transform hover:scale-105">#Inspire.</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignUpPage
