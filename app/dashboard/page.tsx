import React from 'react'
import { ThemeToggle } from "@/components/theme-toggle";

const DashboardPage = () => {
  return (
    <>
        <h1>
            Welcome to the Dashboard! You are successfully authenticated.
        </h1>
        <ThemeToggle />
    </>
  )
}

export default DashboardPage