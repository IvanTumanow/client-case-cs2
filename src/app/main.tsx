import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter, Navigate, Route, Routes} from "react-router";

import './index.css'
import MainLayout from "./mainLayout/layout.tsx";
import {ROUTES_CONFIG} from "../config/routes.config.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route
                    index
                    element={ROUTES_CONFIG.ROUTES.HOME.element()}
                />

                <Route
                    path={ROUTES_CONFIG.ROUTES.SECOND.url}
                    element={ROUTES_CONFIG.ROUTES.SECOND.element()}
                />
            </Route>

            <Route path={ROUTES_CONFIG.ROUTES.AUTH.url}>
                <Route
                    index
                    element={<Navigate to={'/'} replace />}
                />

                <Route
                    path={ROUTES_CONFIG.ROUTES.SIGN_IN.url.replaceAll('/', '')}
                    element={ROUTES_CONFIG.ROUTES.SIGN_IN.element()}
                />

                <Route
                    path={ROUTES_CONFIG.ROUTES.SIGN_UP.url.replaceAll('/', '')}
                    element={ROUTES_CONFIG.ROUTES.SIGN_UP.element()}
                />
            </Route>
        </Routes>

    </BrowserRouter>
  </StrictMode>,
)
