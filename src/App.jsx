import { Toaster } from 'react-hot-toast'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import CreateTask from './pages/CreateTask'
import SingleTask from './pages/SingleTask'
import Tasks from './pages/Tasks'
import UpdateTask from './pages/UpdateTask'

export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <Toaster position='bottom-right' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />

            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/create-task' element={<CreateTask />} />
              <Route path='/update-task/:taskId' element={<UpdateTask />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/tasks/:taskId' element={<SingleTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  )
}