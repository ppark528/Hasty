import { lazy } from 'react';
const AnalyticsDashboards = lazy(() => import('../pages/dashboard/analytics'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const GoogleAnalytics = lazy(() => import('../pages/googleanalytics/GoogleAnalytics'));

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const analyticsRoute = [
    {
        path: '/gaanalytics',
        name: 'Site Analytics',
        element: GoogleAnalytics,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const allRoutes = [
    ...dashboardRoutes,
    ...analyticsRoute,
    ...errorRoutes,
];

export default allRoutes;
