"use client"

import { Fragment, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"

interface Agency {
  id: string
  name: string | null
  state: string | null
  state_code: string | null
  type: string | null
  population: number | null
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

interface ExpandableDataTableProps {
  data: Agency[]
}

const formatValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "N/A"
  }
  return String(value)
}

export default function ExpandableDataTable({ data }: ExpandableDataTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString()
  }

  const DetailField = ({
    label,
    value,
  }: {
    label: string
    value: string | number | null | undefined
  }) => (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{formatValue(value)}</span>
    </div>
  )

  return (
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
            <Fragment key={row.id}>
              <TableRow
                key={row.id}
                onClick={() => toggleExpand(row.id)}
                className="cursor-pointer border-border transition-colors hover:bg-secondary"
              >
                <TableCell className="p-4">
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-200",
                      expandedId === row.id && "rotate-180",
                    )}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">{formatValue(row.name)}</TableCell>
                <TableCell className="text-foreground">{formatValue(row.state)}</TableCell>
                <TableCell className="text-right text-foreground">
                  {row.population ? row.population.toLocaleString() : "N/A"}
                </TableCell>
              </TableRow>

              {expandedId === row.id && (
                <TableRow className="border-border bg-card/50 hover:bg-card/50">
                  <TableCell colSpan={4} className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Contact Information</h3>
                        <div className="space-y-3">
                          <DetailField label="Phone" value={row.phone} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground">Website</span>
                            {row.website ? (
                              <a
                                href={row.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {row.website}
                              </a>
                            ) : (
                              <span className="text-sm text-foreground">N/A</span>
                            )}
                          </div>
                          <DetailField label="Email Domain" value={row.domain_name} />
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Addresses</h3>
                        <div className="space-y-3">
                          <DetailField label="Mailing Address" value={row.mailing_address} />
                          <DetailField label="Physical Address" value={row.physical_address} />
                        </div>
                      </div>

                      {/* Academic Information */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Academic Details</h3>
                        <div className="space-y-3">
                          <DetailField label="Grade Span" value={row.grade_span} />
                          <DetailField label="Type" value={row.type} />
                          <DetailField label="Locale" value={row.locale} />
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Statistics</h3>
                        <div className="space-y-3">
                          <DetailField label="Total Schools" value={row.total_schools} />
                          <DetailField
                            label="Total Students"
                            value={row.total_students ? row.total_students.toLocaleString() : undefined}
                          />
                          <DetailField
                            label="Student-Teacher Ratio"
                            value={row.student_teacher_ratio ? row.student_teacher_ratio.toFixed(1) : undefined}
                          />
                        </div>
                      </div>

                      {/* Administrative Information */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Administrative</h3>
                        <div className="space-y-3">
                          <DetailField label="County" value={row.county} />
                          <DetailField label="Supervisory Union" value={row.supervisory_union} />
                          <DetailField label="Status" value={row.status} />
                        </div>
                      </div>

                      {/* Regional Information */}
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Region</h3>
                        <div className="space-y-3">
                          <DetailField label="State Code" value={row.state_code} />
                          <DetailField label="CSA/CBSA" value={row.csa_cbsa} />
                          <DetailField label="Last Updated" value={formatDate(row.updated_at)} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
