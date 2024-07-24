/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/_protected/route'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as ProtectedTodosIndexImport } from './routes/_protected/todos/index'
import { Route as ProtectedTodosIdImport } from './routes/_protected/todos/$id'

// Create/Update Routes

const ProtectedRouteRoute = ProtectedRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedTodosIndexRoute = ProtectedTodosIndexImport.update({
  path: '/todos/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedTodosIdRoute = ProtectedTodosIdImport.update({
  path: '/todos/$id',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/_protected/todos/$id': {
      id: '/_protected/todos/$id'
      path: '/todos/$id'
      fullPath: '/todos/$id'
      preLoaderRoute: typeof ProtectedTodosIdImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/todos/': {
      id: '/_protected/todos/'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof ProtectedTodosIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  ProtectedRouteRoute: ProtectedRouteRoute.addChildren({
    ProtectedTodosIdRoute,
    ProtectedTodosIndexRoute,
  }),
  authLoginRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected",
        "/login"
      ]
    },
    "/_protected": {
      "filePath": "_protected/route.tsx",
      "children": [
        "/_protected/todos/$id",
        "/_protected/todos/"
      ]
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/_protected/todos/$id": {
      "filePath": "_protected/todos/$id.tsx",
      "parent": "/_protected"
    },
    "/_protected/todos/": {
      "filePath": "_protected/todos/index.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
