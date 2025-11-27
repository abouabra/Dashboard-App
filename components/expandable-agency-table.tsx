"use client"

import React from "react"

import { useState } from "react"
import {
  ChevronDown,
  MapPin,
  Users,
  Building2,
  Phone,
  Globe,
  Mail,
  MapIcon,
  BookOpen,
  TrendingUp,
  School,
  Shield,
  Map,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import PremiumLimitDialog from "@/components/premium-limit-dialog"

interface MinimalAgency {
  id: string
  name: string | null
  state: string | null
  population: number | null
}

interface Agency extends MinimalAgency {
  state_code: string | null
  type: string | null
  website: string | null
  total_schools: number | null
  total_students: number | null
  mailing_address: string | null
  grade_span: string | null
  locale: string | null
  csa_cbsa: string | null
  domain_name: string | null
  physical_address: string | null
  phone: string | null
  status: string | null
  student_teacher_ratio: number | null
  supervisory_union: string | null
  county: string | null
  created_at: Date | null
  updated_at: Date | null
}

interface ExpandableAgencyTableProps {
  data: MinimalAgency[]
}

const formatValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "N/A"
  }
  return String(value)
}

const DetailField = ({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number | null | undefined | React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon className="h-4 w-4 text-primary mt-1 shrink-0" />}
    <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">
        {typeof value === "string" || typeof value === "number" ? formatValue(value) : value}
      </span>
    </div>
  </div>
)

export default function ExpandableAgencyTable({ data }: ExpandableAgencyTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [expandedData, setExpandedData] = useState<Record<string, Agency>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [showLimitDialog, setShowLimitDialog] = useState(false)

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
      return
    }

    try {
      setLoading(id)
      const response = await fetch(`/api/agencies/${id}`)
      const agencyData = await response.json()

      if (response.ok) {
        setExpandedData((prev) => ({
          ...prev,
          [id]: agencyData,
        }))
        setExpandedId(id)
      }
    } catch (error) {
      console.error("Error fetching agency details:", error)
    } finally {
      setLoading(null)
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString()
  }

  const currentExpandedData = expandedId ? expandedData[expandedId] : null

  return (
    <>
      <Card className="overflow-hidden border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold text-foreground">Name</TableHead>
              <TableHead className="font-semibold text-foreground">State</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Population</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={() => toggleExpand(row.id)}
                  className="cursor-pointer border-border transition-colors hover:bg-secondary"
                >
                  <TableCell className="p-4">
                    {loading === row.id ? (
                      <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                    ) : (
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform duration-200",
                          expandedId === row.id && "rotate-180",
                        )}
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{formatValue(row.name)}</TableCell>
                  <TableCell className="text-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{formatValue(row.state)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-foreground">
                        {formatValue(row.population)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedId === row.id && currentExpandedData && (
                  <TableRow className="border-border bg-card/50 hover:bg-card/50">
                    <TableCell colSpan={4} className="p-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Contact Information */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            Contact Information
                          </h3>
                          <div className="space-y-3">
                            <DetailField label="Phone" value={currentExpandedData.phone} icon={Phone} />
                            <DetailField
                              label="Website"
                              value={
                                currentExpandedData.website ? (
                                  <a
                                    href={currentExpandedData.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {currentExpandedData.website}
                                  </a>
                                ) : (
                                  "N/A"
                                )
                              }
                              icon={Globe}
                            />
                            <DetailField label="Email Domain" value={currentExpandedData.domain_name} icon={Mail} />
                          </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <MapIcon className="h-4 w-4 text-primary" />
                            Addresses
                          </h3>
                          <div className="space-y-3">
                            <DetailField
                              label="Mailing Address"
                              value={currentExpandedData.mailing_address}
                              icon={MapPin}
                            />
                            <DetailField
                              label="Physical Address"
                              value={currentExpandedData.physical_address}
                              icon={MapIcon}
                            />
                          </div>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            Academic Details
                          </h3>
                          <div className="space-y-3">
                            <DetailField label="Grade Span" value={currentExpandedData.grade_span} icon={BookOpen} />
                            <DetailField label="Type" value={currentExpandedData.type} icon={Building2} />
                            <DetailField label="Locale" value={currentExpandedData.locale} icon={MapPin} />
                          </div>
                        </div>

                        {/* Statistics */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Statistics
                          </h3>
                          <div className="space-y-3">
                            <DetailField
                              label="Total Schools"
                              value={formatValue(currentExpandedData.total_schools)}
                              icon={School}
                            />
                            <DetailField
                              label="Total Students"
                              value={formatValue(currentExpandedData.total_students)}
                              icon={Users}
                            />
                            <DetailField
                              label="Student-Teacher Ratio"
                              value={formatValue(currentExpandedData.student_teacher_ratio)}
                              icon={TrendingUp}
                            />
                          </div>
                        </div>

                        {/* Administrative Information */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            Administrative
                          </h3>
                          <div className="space-y-3">
                            <DetailField label="County" value={currentExpandedData.county} icon={Map} />
                            <DetailField
                              label="Supervisory Union"
                              value={currentExpandedData.supervisory_union}
                              icon={Shield}
                            />
                            <DetailField label="Status" value={currentExpandedData.status} icon={Shield} />
                          </div>
                        </div>

                        {/* Regional Information */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <Map className="h-4 w-4 text-primary" />
                            Region
                          </h3>
                          <div className="space-y-3">
                            <DetailField label="State Code" value={currentExpandedData.state_code} icon={Map} />
                            <DetailField label="CSA/CBSA" value={currentExpandedData.csa_cbsa} icon={Map} />
                            <DetailField
                              label="Last Updated"
                              value={formatDate(currentExpandedData.updated_at)}
                              icon={Map}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>

      <PremiumLimitDialog open={showLimitDialog} onOpenChange={setShowLimitDialog} />
    </>
  )
}
