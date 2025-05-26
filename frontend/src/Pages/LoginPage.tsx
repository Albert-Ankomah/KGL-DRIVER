import { useRef, useEffect, useState, useCallback } from 'react'
// import nissan_lr from '../assets/nissan_lr.jpg' 
import Nissan_AB from '../assets/Nissan_AB.png'
import gsap from 'gsap'
import SplitType from "split-type"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LoginPage = () => {
    const carRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
        const quotes = [
        "Drive fast, live free.",
        "Stay alert, stay alive.",
        "Look twice, save a life.",
        "Safety first, safety always.",
        "Safety starts with you.",
        "Safety is a full-time job."
    ];


    const [formData, setFormData] = useState({ phoneNumber: '', password: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [quote, setQuote] = useState(quotes[0]);

    const updateQuote = useCallback(() => {
        let newQuote;
        do {
            newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === quote); 
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
        { opacity: 0, x: 50 },  // Start from right
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" } // Smooth fade-in
        );
    }, []);



    // functions
    const handleSignUpAnimation = () => {
        gsap.to(containerRef.current, {
        opacity: 0,
        x: -50, // Move left when leaving
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => { navigate("/signup"); }, // Navigate after animation
        });
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.phoneNumber || !formData.password) {
            setMessage('All fields are required')
            setLoading(false)
            return
        }

        try {
            const response = await axios.post('http://localhost:7000/login', formData)
            console.log(response.data)
            setMessage(response.data.message)

            const username = response.data.firstName
            console.log(username)


            setTimeout(() => { navigate('/homepage', {state: {username}}) }, 2000)


        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Sign up failed');
            }
        } finally {
            setLoading(false)
            setTimeout(() => {
            setMessage('') // Clear message after 3 seconds
        }, 3000)
        }
    }
    



    return (
        <>
            <div ref={containerRef} className='w-full min-h-screen flex flex-col md:flex-row'>
                <div className='relative w-full md:w-1/2 h-full flex flex-col p-6 md:p-8 text-center bg-gradient-to-b from-gray-100 via-gray-300'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 id='quote1' key={quote}  className='text-2xl md:py-3 md:text-4xl font-bold text-gray-800 mb-2'>{quote}</h1>
                        <p className='text-gray-500 text-lg py-2'>Cops just love saying hi!</p>
                    </div>
                    <img ref={carRef} src={Nissan_AB} alt="nissan_1" className='w-full mx-auto py-10'/>

                    <p  id='slogan' className='opacity-0 text-sm font-bold italic text-gray-800 py-10 md:py-34 tracking-tighter'>Safety isn’t just a slogan, it’s a way of life!!!.</p>

                    <div id= 'values' className='md:mt-20 grid grid-cols-3 gap-4 text-sm font-semibold text-center justify-center align-center'>
                        <p className="text-red-400 hover:text-red-600 transition duration-300 transform hover:scale-105">#Innovate.</p>
                        <p className="text-blue-400 hover:text-blue-600 transition duration-300 transform hover:scale-105">#Connect.</p>
                        <p className="text-green-400 hover:text-green-600 transition duration-300 transform hover:scale-105">#Inspire.</p>
                    </div>
                </div>

                <div className='w-full md:w-1/2 h-full flex flex-col px-8 md:px-20 py-29 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-600'>
                    <h1 id = 'welcome' className='text-3xl md:text-4xl font-bold tracking-tighter italic py-10 md:py-18'>Welcome!</h1>
                
                    <div className='w-full flex flex-col md:py-4 '>
                        <div className='w-full flex flex-col mb-4'>
                            <h3 className='text-2xl md:text-3xl font-semibold mb-2'>Login</h3>
                            <p className='text-sm mb-3 font-bold py-3'>Please enter your credentials.</p>
                        </div>
                    </div>

                    
                    {/* form */}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-6'>
                        <input type="text" name='phoneNumber' placeholder='Phone Number' value={formData.phoneNumber} onChange={handleChange} className='w-full  text-black py-1 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent' />
                        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='w-full text-black py-1 border-b border-gray-400 focus:border-black outline-none focus:outline-none bg-transparent'/>

                        <div className='justify-between flex flex-row items-center py-5 md:py-10'>
                            <div className='flex flex-row items-center '>
                                <input type="checkbox" className='w-4 h-4 mr-1'/>
                                <label className='text-sm'>Remember me</label>
                            </div>

                            <button className='transition-colors duration-300 rounded-md text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-blue-800'> Forgot Password? </button>
                        </div>

                        <div className='flex flex-row gap-4 py-14 md:py-16 justify-center text-center align-center'>
                            <button className='flex justify-center cursor-pointer rounded-md bg-black text-white font-bold py-2 px-6 w-full max-w-xs' disabled={loading}>
                                {loading ? (
                                    <div className='w-5 h-5 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>) : ('Login')}
                            </button>
                        </div>

                        {message && <p className= 'text-xl text-center text-red-800 mt-[-10px] italic font-semibold tracking-tighter'>{message} </p>} 

                    </form>    

                

                    <div className='w-full flex gap-1 items-center align-center justify-center py-10'>
                        <p className='text-sm font-normal'>Don't have an account? </p>
                        <button onClick={handleSignUpAnimation} className='text-gray-900 font-bold underline transition hover:text-blue-800'>Sign Up</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginPage
