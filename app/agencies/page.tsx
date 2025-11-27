"use client"

import { useState, useEffect } from "react"
import ExpandableDataTable from "@/components/expandable-data-table"
import { Loader2 } from "lucide-react"

interface MinimalAgency {
  id: string
  name: string | null
  state: string | null
  population: number | null
}

export default function Page() {
  const [data, setData] = useState<MinimalAgency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMinimalAgencies = async () => {
      try {
        const response = await fetch("/api/agencies")
        const agencies = await response.json()
        setData(agencies)
      } catch (error) {
        console.error("Error fetching agencies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMinimalAgencies()
  }, [])

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Agencies</h1>
          <p className="mt-2 text-muted-foreground">
            Click on a row to view detailed information about an agency.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <ExpandableDataTable data={data} />
        )}
      </div>
    </main>
  )
}
