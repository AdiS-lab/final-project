import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Login(){


    async function logIn(e:any){
        e.preventDefault()
        try{
            console.log('made it')
            const formData = new FormData(e.currentTarget)
            const sendData = Object.fromEntries(formData)

            const response = await axios.post('http://localhost:3000/login', sendData)
            console.log(response.data)

            window.open('/canvas', '_self')
        }
        catch(error: any){
            console.log(error.response.data)
        }
    }   

    
    return(
        <div className='min-h-screen w-full flex items-center justify-center' style={{background: '#1b1b2f', backgroundImage: 'radial-gradient(#2e2e4a 1px, transparent 1px)', backgroundSize: '24px 24px'}}>

            <div className='flex flex-col gap-6 p-10 w-full max-w-md' style={{
                background: '#f5f0e8',
                border: '2.5px solid #1b1b2f',
                borderRadius: '4px 12px 6px 10px / 10px 4px 12px 6px',
                boxShadow: '5px 5px 0px #1b1b2f',
            }}>
                <header className='flex flex-col items-center gap-1'>
                    <h1 className='text-3xl font-bold' style={{color: '#1b1b2f'}}>Welcome Back</h1>
                    <h2 className='text-sm' style={{color: '#5a5a7a'}}>Log in to continue drawing</h2>
                </header>

                <form onSubmit = {(e)=>{logIn(e)}}className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className='text-xs font-semibold' style={{color: '#1b1b2f'}}>Email</label>
                        <input name = 'email' id='email' type = 'text' placeholder='you@example.com' className='w-full px-4 py-3 outline-none text-sm' style={{
                            background: '#fff',
                            border: '2px solid #1b1b2f',
                            borderRadius: '3px 8px 4px 7px / 7px 3px 8px 4px',
                            color: '#1b1b2f',
                            boxShadow: '2px 2px 0px #1b1b2f'
                        }}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password' className='text-xs font-semibold' style={{color: '#1b1b2f'}}>Password</label>
                        <input name = 'password' id='password' type='password' placeholder='••••••••' className='w-full px-4 py-3 outline-none text-sm' style={{
                            background: '#fff',
                            border: '2px solid #1b1b2f',
                            borderRadius: '6px 3px 7px 4px / 4px 7px 3px 6px',
                            color: '#1b1b2f',
                            boxShadow: '2px 2px 0px #1b1b2f'
                        }}/>
                    </div>
                    <button type='submit' className='w-full py-3 font-bold cursor-pointer mt-2 text-sm' style={{
                        background: '#1b1b2f',
                        color: '#f5f0e8',
                        border: '2px solid #1b1b2f',
                        borderRadius: '4px 10px 5px 9px / 9px 4px 10px 5px',
                        boxShadow: '3px 3px 0px #5a5a7a'
                    }}>
                        Sign In
                    </button>
                </form>

                <div className='text-center text-sm' style={{color: '#5a5a7a'}}>
                    <p>Don't have an account? <Link to='/signup' className='font-semibold' style={{color: '#1b1b2f', textDecoration: 'underline'}}>Sign Up</Link></p>
                </div>
            </div>

        </div>
    )
}