import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HolaStoreLogo } from '../components/Icons'
import LoginLayout from '../layout/LoginLayout'
import { FormEventHandler, useState } from 'react'
import { IUser } from '../types/user'
import { useAppDispatch } from '../hooks/redux'
import { loginUser } from '../store/slices/user'

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    setErrors([])
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData)

    const users = localStorage.getItem('users')

    if (users) {
      const usersJSON: IUser[] = JSON.parse(users)
      const userExists = usersJSON.find(
        u => u.email === user.email && u.password === user.password
      )

      if (userExists) {
        const prevLocation = location.state?.prevLocation || '/'
        const fromCart = location.state?.fromCart || false
        dispatch(loginUser(userExists))
        navigate(prevLocation, { state: { fromCart } })
        setErrors([])
        return
      }
    }

    setErrors(['Please check your email and password'])
  }
  return (
    <LoginLayout formPosition='left'>
      <form onSubmit={handleSubmit} onChange={() => setErrors([])}>
        <HolaStoreLogo className='h-6 mx-auto mb-8' />
        <h1 className='text-3xl font-bold text-center'>WELCOME BACK!</h1>
        <p className='mb-8 text-center'>Please enter yout email and password</p>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            className='w-full border border-dark py-2 px-4 rounded mt-2 mb-4'
            type='email'
            name='email'
            placeholder='Enter your email'
            required
          />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input
            className='w-full border border-dark py-2 px-4 rounded mt-2 mb-4'
            type='password'
            name='password'
            placeholder='******'
            required
          />
        </label>
        <div className='flex justify-between mb-4'>
          <label htmlFor='remember'>
            <input type='checkbox' name='remember' id='remember' />
            <span className='ml-2'>Remember me</span>
          </label>
          <a className='underline' href=''>
            Forgot password
          </a>
        </div>
        <button
          type='submit'
          className='bg-primary text-light p-2 px-3 w-full rounded'
        >
          Login
        </button>
        {errors.map(err => (
          <p
            key={err}
            className='text-sm text-primary bg-primary/10 border border-primary rounded text-center p-1 mt-4'
          >
            {err}
          </p>
        ))}
        <p className='text-center mt-8'>
          Don't have an account?
          <Link to='/sign-up' className='text-primary underline ml-2'>
            Sign up
          </Link>
        </p>
      </form>
    </LoginLayout>
  )
}

export default LoginPage
