import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HolaStoreLogo } from '../components/Icons'
import LoginLayout from '../layout/LoginLayout'
import { FormEventHandler, useState } from 'react'
import { IUser } from '../types/user'
import { useAppDispatch } from '../hooks/redux'
import { loginUser } from '../store/slices/user'

const SignupPage = () => {
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setErrors([])
    const formData = new FormData(e.currentTarget)
    const newUser = Object.fromEntries(formData)

    const users = localStorage.getItem('users')

    const prevLocation = location.state?.prevLocation || '/'
    const fromCart = location.state?.fromCart || false


    if (users) {
      const usersJSON: IUser[] = JSON.parse(users)
      const usernameTaken = usersJSON.find(
        user => user.username === newUser.username
      )
      const emailTaken = usersJSON.find(user => user.email === newUser.email)
      if (usernameTaken) {
        setErrors(prev => [...prev, 'Username already taken'])
        return
      }
      if (emailTaken) {
        setErrors(prev => [...prev, 'Email already taken'])
        return
      }
      localStorage.setItem('users', JSON.stringify([...usersJSON, newUser]))
      dispatch(loginUser(newUser as unknown as IUser))
      setErrors([])
      navigate(prevLocation, { state: { fromCart } })
      return
    }
    
    dispatch(loginUser(newUser as unknown as IUser))
    localStorage.setItem('users', JSON.stringify([newUser]))
    setErrors([])
    navigate(prevLocation, { state: { fromCart } })
  }

  return (
    <LoginLayout formPosition='right'>
      <form onSubmit={handleSubmit} onChange={() => setErrors([])}>
        <HolaStoreLogo className='h-6 mx-auto mb-8' />
        <h1 className='text-3xl font-bold text-center'>LET'S GET STARTED!</h1>
        <p className='mb-8 text-center'>Please sign up to continue</p>
        <label htmlFor='username'>
          <span>Username</span>
          <input
            className='w-full border border-dark py-2 px-4 rounded mt-2 mb-4'
            type='text'
            placeholder='Enter your username'
            name='username'
            required
          />
        </label>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            className='w-full border border-dark py-2 px-4 rounded mt-2 mb-4'
            type='email'
            placeholder='Enter your email'
            name='email'
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
        <button
          type='submit'
          className='bg-primary text-light p-2 px-3 w-full rounded'
        >
          Sign up
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
          Already have an account?
          <Link to='/login' state={{...location.state}} className='text-primary underline ml-2'>
            Login
          </Link>
        </p>
      </form>
    </LoginLayout>
  )
}

export default SignupPage
