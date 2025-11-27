"use client";

import React from "react";
import { useState } from "react";
import { ChevronDown, Mail, Phone, Briefcase, Globe, Building2, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import PremiumLimitDialog from "./premium-limit-dialog";

interface MinimalContact {
	id: string;
	first_name: string;
	last_name: string;
}

interface Contact extends MinimalContact {
	title: string | null;
	email: string | null;
	phone: string | null;
	email_type: string;
	contact_form_url: string | null;
	created_at: Date;
	updated_at: Date;
	department: string;
}

interface ExpandableContactsTableProps {
	data: MinimalContact[];
}

const formatValue = (value: string | number | null | undefined): string => {
	if (value === null || value === undefined || value === "") {
		return "N/A";
	}
	return String(value);
};

const DetailField = ({ label, value, icon: Icon }: { label: string; value: string | number | null | undefined | React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) => (
	<div className="flex items-start gap-3">
		{Icon && <Icon className="h-4 w-4 text-primary mt-1 shrink-0" />}
		<div className="flex flex-col">
			<span className="text-sm font-medium text-muted-foreground">{label}</span>
			<span className="text-sm text-foreground">{typeof value === "string" || typeof value === "number" ? formatValue(value) : value}</span>
		</div>
	</div>
);

export default function ExpandableContactsTable({ data }: ExpandableContactsTableProps) {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [expandedData, setExpandedData] = useState<Record<string, Contact>>({});
	const [loading, setLoading] = useState<string | null>(null);
	const [showLimitDialog, setShowLimitDialog] = useState(false);

	const toggleExpand = async (id: string) => {
		if (expandedId === id) {
			setExpandedId(null);
			return;
		}

		try {
			setLoading(id);
			const limitResponse = await fetch("/api/daily-limit", {
				method: "POST",
			});

			const limitData = await limitResponse.json();

			if (!limitData.allowed) {
				setShowLimitDialog(true);
				setLoading(null);
				return;
			}

			const response = await fetch(`/api/contacts/${id}`);
			const contactData = await response.json();

			if (response.ok) {
				setExpandedData((prev) => ({
					...prev,
					[id]: contactData,
				}));
				setExpandedId(id);
			}
		} catch (error) {
			console.error("Error fetching contact details:", error);
		} finally {
			setLoading(null);
		}
	};

	const formatDate = (date: Date | null) => {
		if (!date) return "N/A";
		return new Date(date).toLocaleDateString();
	};

	const currentExpandedData = expandedId ? expandedData[expandedId] : null;

	return (
		<>
			<Card className="overflow-hidden border-border">
				<Table>
					<TableHeader>
						<TableRow className="border-border hover:bg-transparent">
							<TableHead className="w-12"></TableHead>
							<TableHead className="font-semibold text-foreground">Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((row) => (
							<React.Fragment key={row.id}>
								<TableRow onClick={() => toggleExpand(row.id)} className="cursor-pointer border-border transition-colors hover:bg-secondary">
									<TableCell className="p-4">
										{loading === row.id ? <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" /> : <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", expandedId === row.id && "rotate-180")} />}
									</TableCell>
									<TableCell className="font-medium text-foreground">
										<div className="flex items-center gap-2">
											<User className="h-4 w-4 text-muted-foreground shrink-0" />
											{formatValue(row.first_name)} {formatValue(row.last_name)}
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
														<Mail className="h-4 w-4 text-primary" />
														Contact Information
													</h3>
													<div className="space-y-3">
														<DetailField label="Email" value={currentExpandedData.email} icon={Mail} />
														<DetailField label="Phone" value={currentExpandedData.phone} icon={Phone} />
														<DetailField label="Email Type" value={currentExpandedData.email_type} icon={Mail} />
													</div>
												</div>

												{/* Professional Information */}
												<div className="space-y-3">
													<h3 className="font-semibold text-foreground flex items-center gap-2">
														<Briefcase className="h-4 w-4 text-primary" />
														Professional Details
													</h3>
													<div className="space-y-3">
														<DetailField label="Title" value={currentExpandedData.title} icon={Briefcase} />
														<DetailField label="Department" value={currentExpandedData.department} icon={Building2} />
													</div>
												</div>

												{/* Organization Information */}
												<div className="space-y-3">
													<h3 className="font-semibold text-foreground flex items-center gap-2">
														<Building2 className="h-4 w-4 text-primary" />
														Organization
													</h3>
													<div className="space-y-3">
														<DetailField
															label="Contact Form URL"
															value={
																currentExpandedData.contact_form_url ? (
																	<a href={currentExpandedData.contact_form_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
																		{currentExpandedData.contact_form_url}
																	</a>
																) : (
																	"N/A"
																)
															}
															icon={Globe}
														/>
													</div>
												</div>

												{/* Metadata */}
												<div className="space-y-3">
													<h3 className="font-semibold text-foreground flex items-center gap-2">
														<User className="h-4 w-4 text-primary" />
														Metadata
													</h3>
													<div className="space-y-3">
														<DetailField label="Created" value={formatDate(currentExpandedData.created_at)} icon={User} />
														<DetailField label="Last Updated" value={formatDate(currentExpandedData.updated_at)} icon={User} />
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
	);
}
