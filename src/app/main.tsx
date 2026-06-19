import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter, Route, Routes} from "react-router";

import {ROUTES_CONFIG} from "@/config/routes.config.tsx";

import MainLayout from "@/app/mainLayout/layout.tsx";
import CleanLayout from "@/app/cleanLayout/layout.tsx";

import {ThemeProvider} from "@/components/app/providers/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner"

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

        <Toaster
            position={'bottom-left'}
            swipeDirections={['right', 'left']}
            visibleToasts={5}
            duration={3000}
            toastOptions={{
                classNames: {
                    success: '[--toast-color:var(--color-success)]',
                    warning: '[--toast-color:var(--color-warning)]',
                    error: '[--toast-color:var(--color-destructive)]',

                    toast: '!border-[var(--toast-color)]',
                    icon: '!text-[var(--toast-color)]',
                    title: '!text-[var(--toast-color)]',

                    description: '!text-[var(--color-foreground)]/70'
                }
            }}
        />

    </ThemeProvider>
  </StrictMode>,
)
