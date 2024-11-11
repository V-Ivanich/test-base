import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { StartPage } from '../pages/startPage/StartPage'
// import { BaseGeneral } from '../pages/general/General'
import { Error404 } from '../pages/error404/error404'
import { WorksData } from '../pages/works/WorksData'
import { Users } from '../pages/users/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'works',
        element: <WorksData />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
])

export const Root = () => {
  return <RouterProvider router={router} />
}
