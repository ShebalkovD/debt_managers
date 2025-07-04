import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import type { RouteObject } from 'react-router';
import type { JSX } from 'react';
import { Layout } from '../components/Layout';
import { PageNotFound } from './PageNotFound';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <PageNotFound />,
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]

const router = createBrowserRouter(routes)

export const AppRoutes = (): JSX.Element => {
    return <RouterProvider router={router}/>
}