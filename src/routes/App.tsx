import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layout/MainLayout'

const App = (): JSX.Element => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </MainLayout>
  )
}

export default App
