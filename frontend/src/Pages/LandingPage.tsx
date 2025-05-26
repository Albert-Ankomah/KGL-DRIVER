import { useState } from 'react'
import {useLocation} from 'react-router-dom'
import lotto from '../assets/kgl_Driver.jpg'
import newDriver from '../assets/new_driver.jpg'
import axios from 'axios'
import red from '../assets/red_ball.png'
import orange from '../assets/orange_ball.png'
import purple from '../assets/purple_ball.png'

const LandingPage = () => {

    const [formData, setFormData] = useState({ firstName: '', surname: '', From: '', To: '', carBrand: '', carNumber: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const username  = location.state?.username
      
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.firstName || !formData.surname || !formData.From || !formData.To || !formData.carBrand || !formData.carNumber) {
            setMessage('All fields are required')
          setLoading(false)
          
          setTimeout(() => {
            setMessage('') // Clear message after 3 seconds
          }, 3000)
          
          return            
        }

      try {
          const response = await axios.post('http://localhost:7000/driver-request', formData)
          console.log(response.data)
          setMessage(response.data.message)
        } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Driver request failed');
        }
        } finally {
          setLoading(false)
          setFormData({ firstName: '', surname: '', From: '', To: '', carBrand: '', carNumber: '' }) // Reset form data

          setTimeout(() => {
            setMessage('') // Clear message after 3 seconds
        }, 3000)
      }
      
    }
  
    return (
    <div className='flex'>
      <div className="text-white w-1/2 flex justify-center items-center h-screen bg-cover  bg-no-repeat" style={{ backgroundImage: `url(${newDriver})` }}>
        <div className='bg-slate border border-slate-400 rounded-md shadow-lg backdrop-filter backdrop-blur-sm p-15'>
          <h1 className='text-4xl tracking-tighter font-bold text-white text-center mb-6 italic'>Welcome back <span className='text-green-300'>{username}</span>!!</h1>
          <p className='text-1xl tracking-tighter font-semibold text-white text-center mb-6'>Please fill in the form below</p>
          <h1 className='text-4xl tracking-tighter font-bold text-green-200 text-center mb-6'>Records</h1>

          <form onSubmit={handleSubmit} className='flex flex-col '>
              {/* Personal Information */}
            <label htmlFor="" className='font-bold tracking-tighter text-2xl shadow-md'>PERSONAL INFORMATION</label>
            <div className='relative my-4 shadow-md'>
              <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} placeholder='' className='block w-72 py-2.3 px-0 text-2xl text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'/>
              <label htmlFor="firstname" className='absolute text-sm text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Firstname</label>
            </div>

            <div className='relative my-4 shadow-md'>
              <input type="text" name='surname' value={formData.surname} onChange={handleChange} placeholder='' className='block w-72 py-2.3 px-0 text-2xl text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'/>
              <label htmlFor="surname" className='absolute text-sm text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>surname</label>
            </div>

              
              {/* location */}
            <label htmlFor="" className='font-bold tracking-tighter text-2xl shadow-md'>LOCATION</label>
            <div className='relative my-4 shadow-md'>
              <input type="text" name='From' value={formData.From} onChange={handleChange} className='block w-72 py-2.3 px-0 text-2xl text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'/>
              <label htmlFor="" className='absolute text-sm text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>FROM: </label>
            </div>

            <div className='relative my-4 shadow-md'>
              <input type="text" name='To' value={formData.To} onChange={handleChange} className='block w-72 py-2.3 px-0 text-2xl text-white bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'/>
              <label htmlFor="" className='absolute text-sm text-green-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>TO:</label>
            </div>

            {/* car details */}
            <label htmlFor="" className='font-bold tracking-tighter text-2xl shadow-md '>CAR DETAILS</label>
              <div className='relative my-4 flex gap-4 justify-between border-b-2 border-gray-700 shadow-md '>
                <label htmlFor="" className='text-green-300 tracking-tighter text-lg'>Car Brand:</label>
                <select name="carBrand" id="carBrand" value={formData.carBrand} onChange={handleChange} >
                  <option value="" className="bg-gray-500">SELECT CAR BRAND</option>
                  <option value="KGL FOUNDATION" className="bg-gray-500">KGL FOUNDATION</option>
                  <option value="KEED DIGITAL" className="bg-gray-500">KEED DIGITAL</option>
                  <option value="KEED" className="bg-gray-500">KEED</option>
                  <option value="FUEL AUTOMATION" className="bg-gray-500">FUEL AUTOMATION</option>
                </select>
              </div>

              <div className='relative my-4 flex gap-4 border-b-2 border-gray-700 shadow-md justify-between'>
                <label htmlFor="carNumber" className='tracking-tighter text-lg text-green-300' >Car Number:</label>
                <select name="carNumber" id="carNumber" value={formData.carNumber} onChange={handleChange} >
                  <option value="" className="bg-gray-500">SELECT CAR NUMBER</option>
                  <option value="GS 3633-19" className="bg-gray-500">GS 3633-19</option>
                  <option value="GS 3634-22" className="bg-gray-500">GS 3634-22</option>
                  <option value="GS 3665-21" className="bg-gray-500">GS 3665-21</option>
                  <option value="GS 3678-20" className="bg-gray-500">GS 3678-20</option>
                </select>
            </div>
            
              <button className='font-bold italic mt-8 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-black to-white 
                            bg-origin-border hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 rounded-full transition-all duration-500'>
                {loading ?
                  (<div className='w-5 h-5 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>) : ('Submit')}
              </button>
          </form>
          
            {message && <p className='text-red-800 text-center italic font-bold tracking-tighter'>{ message }</p>}
          
        </div>
      </div>

        
      <div className="relative group w-1/2 h-screen overflow-hidden" role="img" aria-label="Lotto image display">
          
        <div className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${lotto})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="text-center h-1/3 w-full justify-center items-center flex flex-col p-4">
              <h1 className="text-5xl font-bold italic text-white">Welcome to <span className='text-amber-300 font-extrabold border-1 rounded-3xl border-transparent bg-gradient-to-r from-black to-white'>KGL DRIVER</span></h1>
              <p className="font-semibold italic mt-8 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-white to-white 
                            bg-origin-border hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 rounded-full transition-all duration-500">
                LOG YOUR RIDE
              </p>
            </div>
            <div><img className='h-15 w-15 ml-15 animate-bounce' src={red} alt="red_ball" /></div>
            <div className='flex justify-end'><img className='h-15 w-15 mr-15 animate-pulse' src={orange} alt="red_ball" /></div>
            <div className='flex justify-center mt-50 items-center py-20'><img className='h-15 w-15 ml-15 animate-ping' src={purple} alt="red_ball" /></div>
        </div>

        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50"></div>
        <div className="absolute inset-6  opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:inset-4"></div>
        
          <div className="flex-col absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className='italic text-white font-bold text-2xl'>feel the rush!!!</p>
            <a href="https://www.590mobile.com.gh/" target='blank' className='font-semibold italic mt-8 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-white to-white 
                            bg-origin-border hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-500 rounded-full transition-all duration-500'>Play 590</a>
          </div>
        </div>
      
    </div>
    
  )
}

export default LandingPage
