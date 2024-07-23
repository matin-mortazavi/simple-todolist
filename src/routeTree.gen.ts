/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TodosIndexImport } from './routes/todos.index'
import { Route as TodosIdImport } from './routes/todos.$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TodosIndexRoute = TodosIndexImport.update({
  path: '/todos/',
  getParentRoute: () => rootRoute,
} as any)

const TodosIdRoute = TodosIdImport.update({
  path: '/todos/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/todos/$id': {
      id: '/todos/$id'
      path: '/todos/$id'
      fullPath: '/todos/$id'
      preLoaderRoute: typeof TodosIdImport
      parentRoute: typeof rootRoute
    }
    '/todos/': {
      id: '/todos/'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof TodosIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  TodosIdRoute,
  TodosIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/todos/$id",
        "/todos/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/todos/$id": {
      "filePath": "todos.$id.tsx"
    },
    "/todos/": {
      "filePath": "todos.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
