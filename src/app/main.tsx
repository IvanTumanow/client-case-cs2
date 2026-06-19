import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter, Route, Routes} from "react-router";

import {ROUTES_CONFIG} from "@/config/routes.config.tsx";

import MainLayout from "@/app/mainLayout/layout.tsx";
import CleanLayout from "@/app/cleanLayout/layout.tsx";

import {ThemeProvider} from "@/components/app/providers/ThemeProvider.tsx";

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route
                        index
                        element={ROUTES_CONFIG.ROUTES.HOME.element}
                    />
                </Route>

                <Route
                    path={ROUTES_CONFIG.ROUTES.AUTH.url}
                    element={<CleanLayout/>}
                >
                    <Route
                        index
                        element={ROUTES_CONFIG.ROUTES.AUTH.element}
                    />
                </Route>


            </Routes>

        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
