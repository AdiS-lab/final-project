import {Link} from 'react-router-dom'
import {useRef} from 'react'
import axios from 'axios'

export default function SignUp(){


    function realTimeInput(e: any){
        const value = e.target.value
        if (!value) {
            e.target.style.borderColor = 'black'
            return
        }

        const atIndex = value.indexOf('@')
        const hasValidAt = atIndex > 0
        const dotIndex = value.indexOf('.') // skip @ and at least one char after it
        const hasValidDot = dotIndex > atIndex + 1
        const hasAfterDot = dotIndex !== -1 && dotIndex < value.length - 1

        if (hasValidAt && hasValidDot && hasAfterDot) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }
    }
    

    async function createUser(e: any){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formValues = Object.fromEntries(formData)
        console.log(formValues)
        createNewUser(formValues)
    }


    async function createNewUser(formValues: object){
            try{
                console.log(formValues)
                const response = await axios.post('http://localhost:3000/signup', formValues, {withCredentials:true})
                const data = response.data
                sessionStorage.setItem('accessToken', data.accessToken)
               
                console.log('heres navigate')
                window.open('/canvas', '_self')              
            }

            catch(error){
                console.log(error) 
            }
        }

    return(
        <div className='min-h-screen w-full flex items-center justify-center' style={{ background: '#0a0a0a' }}>

            <div className='flex flex-col gap-6 p-10 w-full max-w-md' style={{
                background: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '8px',
            }}>
                <header className='flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold' style={{ color: '#d0d0d0' }}>Create Account</h1>
                    <h2 className='text-sm' style={{ color: '#555555' }}>Start drawing with your hands</h2>
                </header>

                <form onSubmit={(e) => { createUser(e) }} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='email' className='text-xs font-medium' style={{ color: '#888888' }}>Email</label>
                        <input onChange={(e) => { realTimeInput(e) }} autoComplete='off' type='text' name='email' id='email' placeholder='you@example.com' className='w-full px-4 py-2.5 outline-none text-sm' style={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '5px',
                            color: '#d0d0d0',
                        }} />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='password' className='text-xs font-medium' style={{ color: '#888888' }}>Password</label>
                        <input type='password' name='password' id='password' placeholder='••••••••' className='w-full px-4 py-2.5 outline-none text-sm' style={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '5px',
                            color: '#d0d0d0',
                        }} />
                    </div>
                    <button className='w-full py-2.5 font-medium cursor-pointer mt-1 text-sm' style={{
                        background: '#d0d0d0',
                        color: '#0a0a0a',
                        border: 'none',
                        borderRadius: '5px',
                    }}>
                        Sign Up
                    </button>
                </form>

                <div className='text-center text-sm' style={{ color: '#555555' }}>
                    <p>Already have an account? <Link to='/login' className='font-medium' style={{ color: '#d0d0d0' }}>Log In</Link></p>
                </div>
            </div>

        </div>
    )
}