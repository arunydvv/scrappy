"use client";

import { ThemeProvider } from "next-themes";
import  React from "react";

interface AppProvidersProps {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system" enableSystem
            >
             {children}
            </ThemeProvider>
        </>
    );
}
