import React from "react";
import ClerkProfile from "@/components/clerk-profile";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExpandableDataTable from "@/components/expandable-data-table";


interface Agency {
	id: string;
	name: string | null;
	state: string | null;
	state_code: string | null;
	type: string | null;
	population: number | null;
	website: string | null;
	total_schools: number | null;
	total_students: number | null;
	mailing_address: string | null;
	grade_span: string | null;
	locale: string | null;
	csa_cbsa: string | null;
	domain_name: string | null;
	physical_address: string | null;
	phone: string | null;
	status: string | null;
	student_teacher_ratio: number | null;
	supervisory_union: string | null;
	county: string | null;
	created_at: Date | null;
	updated_at: Date | null;
  }
  

const AgenciesPage = async () => {
	const agencies: Agency[] = await prisma.agency.findMany({
		take: 20,
	});

	return (
<main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Agency Page</h1>
          <p className="mt-2 text-muted-foreground">
            Click on a row to view detailed information about each agency.
          </p>
        </div>
        <ExpandableDataTable data={agencies} />
      </div>
    </main>
	);

	
};

export default AgenciesPage;