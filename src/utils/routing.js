import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import MouseFollowingCircle from "../pages/MouseFollowingCircle";
import Dashboard from "../pages/Dashboard";
import ScrollNotifier from "../pages/ScrollNotifier";
import InfiniteScrolling from "../pages/InfiniteScrolling";
import DOMChangeTracker from "../pages/DOMChangeTracker";
import PaginatedEmpList from "../pages/PaginatedEmpList";

export const rootRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'mouseFollowingCircle',
                element: <MouseFollowingCircle />
            },
            {
                path: 'scrollNotifier',
                element: <ScrollNotifier />
            },
            {
                path: 'infiniteScrolling',
                element: <InfiniteScrolling />
            },
            {
                path: 'domChangeTracker',
                element: <DOMChangeTracker />
            },
            {
                path: 'paginatedEmpList',
                element: <PaginatedEmpList />
            }
        ]
    }
]);