import { lazy } from 'react';

import MainLayout from "../layouts/MainLayout";

import Loadable from "../components/Loadable";
import { RouteObject } from 'react-router-dom';

const ListUser = Loadable(lazy(() => import('../pages/mainlayout/user/list')))
const FormUser = Loadable(lazy(() => import('../pages/mainlayout/user/form')))

const ListRole = Loadable(lazy(() => import('pages/mainlayout/role/list')))
const FormRole = Loadable(lazy(() => import('../pages/mainlayout/role/form')))

const ListRequest = Loadable(lazy(() => import('../pages/mainlayout/request/list')))
const FormRequest = Loadable(lazy(() => import('../pages/mainlayout/request/form')))

const ListApproval = Loadable(lazy(() => import('../pages/mainlayout/approval/list')))
const FormApproval = Loadable(lazy(() => import('../pages/mainlayout/approval/form')))


const ListInbox = Loadable(lazy(() => import('../pages/mainlayout/inbox/list')))

const Dashboard = Loadable(lazy(() => import('../pages/mainlayout/dashboard')))

const MainRoutes:RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'list',
            children: [
                {
                    path: 'user',
                    element: <ListUser />
                },
                {
                    path: 'role',
                    element: <ListRole />
                },
                {
                    path: 'request',
                    element: <ListRequest />
                },
                {
                    path: 'approval',
                    element: <ListApproval />
                },
                {
                    path: 'inbox',
                    element: <ListInbox />
                },
            ]
        },
        {
            path: 'form',
            children: [
                {
                    path: 'user',
                    element: <FormUser />,
                    children: [
                        {
                            path: ':id',
                            element: <FormUser />,
                        }
                    ]
                },
                {
                    path: 'role',
                    element: <FormRole />,
                    children: [
                        {
                            path: ':id',
                            element: <FormRole />,
                        }
                    ]
                },
                {
                    path: 'request',
                    element: <FormRequest />,
                    children: [
                        {
                            path: ':id',
                            element: <FormRequest />
                        }
                    ]
                },
                {
                    path: 'approval',
                    element: <FormApproval />,
                    children: [
                        {
                            path: ':id',
                            element: <FormApproval />
                        }
                    ]
                },
            ]
        },
    ]
};

export default MainRoutes;
