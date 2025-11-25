-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "state" TEXT,
    "state_code" TEXT,
    "type" TEXT,
    "population" INTEGER,
    "website" TEXT,
    "total_schools" INTEGER,
    "total_students" INTEGER,
    "mailing_address" TEXT,
    "grade_span" TEXT,
    "locale" TEXT,
    "csa_cbsa" TEXT,
    "domain_name" TEXT,
    "physical_address" TEXT,
    "phone" TEXT,
    "status" TEXT,
    "student_teacher_ratio" DOUBLE PRECISION,
    "supervisory_union" TEXT,
    "county" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "agency_id" TEXT,
    "firm_id" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "title" TEXT,
    "email_type" TEXT,
    "contact_form_url" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "department" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
