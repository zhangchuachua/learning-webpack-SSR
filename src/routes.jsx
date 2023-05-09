import App from "./client/components/App";

const routes = [
  {
    path: '/ssr',
    loader: () => {
      return { message: 'this is App loader message' }
    },
    Component: App,
    children: []
  }
]

export default routes;