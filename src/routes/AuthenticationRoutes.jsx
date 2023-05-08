import { lazy } from 'react';


import FullLayout from '../layouts/FullLayout';
import Loadable from "../components/Loadable";

const SignIn = Loadable(lazy(() => import('../pages/fulllayout/signin')))
const ForgetPassword = Loadable(lazy(() => import('../pages/fulllayout/forgetpassword')))
const NewPassword = Loadable(lazy(() => import('../pages/fulllayout/newpassword')))
const PageNotFound = Loadable(lazy(() => import('../pages/fulllayout/page_not_found')))
const ComingSoon = Loadable(lazy(() => import('../pages/fulllayout/coming_soon')))
const SignOut = Loadable(lazy(() => import('../pages/fulllayout/signout')))

const AuthenticationRoutes = {
    path: '/',
    element: <FullLayout />,
    children: [
        {
            path: 'signin',
            element: <SignIn />
        },
        {
            path: 'forgotpassword',
            element: <ForgetPassword />
        },
        {
            path: 'newpassword',
            element: <NewPassword />
        },
        {
            path: 'signout',
            element: <SignOut />
        },
        {
            path: 'coming-soon',
            element: <ComingSoon />
        },
        {
            path: '*',
            element: <PageNotFound />
        },
    ]
};

export default AuthenticationRoutes;
