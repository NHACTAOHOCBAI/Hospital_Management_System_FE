"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  PenLine,
  Printer,
  Save,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/libs/utils";

const TABS = [
  { id: "personal", label: "Personal Information" },
  { id: "exam-history", label: "Examination History" },
  { id: "medications", label: "Prescribed Medications" },
  { id: "tests", label: "Test/Imaging Results" },
  { id: "allergies", label: "Allergies & Warnings" },
  { id: "appointments", label: "Appointments" },
];

const mockPatient = {
  id: "PAT-12345",
  name: "Jane Doe",
  age: 34,
  gender: "Female",
  phone: "+1 555-0102",
  insurance: "Yes",
  insuranceStatus: "Verified",
  allergiesWarning: "Patient has a known allergy to Penicillin.",
  avatar: "https://i.pravatar.cc/120?img=5",
  detail: {
    firstName: "Jane",
    lastName: "Doe",
    dob: "1990-05-15",
    gender: "Female",
    phone: "+1 555-0102",
    email: "jane.doe@example.com",
    address: "123 Health St, Wellness City, Medistate, 90210",
  },
  examinations: [
    {
      title: "Annual Check-up",
      doctor: "Dr. Emily Carter (Cardiologist)",
      notes: "Diagnostic: Stable hypertension.",
      date: "Oct 25, 2023",
    },
    {
      title: "Follow-up Visit",
      doctor: "Dr. Alan Grant (General Practice)",
      notes: "Diagnostic: Seasonal allergies.",
      date: "Jun 12, 2023",
    },
    {
      title: "Initial Consultation",
      doctor: "Dr. Sarah Johnson (Dermatologist)",
      notes: "Diagnosis: Mild eczema.",
      date: "Jan 10, 2023",
    },
  ],
  medications: [
    {
      date: "Oct 25, 2023",
      medication: "Lisinopril 10mg",
      doctor: "Dr. Emily Carter",
      status: "Active",
    },
    {
      date: "Jun 12, 2023",
      medication: "Loratadine 10mg",
      doctor: "Dr. Alan Grant",
      status: "Completed",
    },
    {
      date: "Jan 20, 2023",
      medication: "Hydrocortisone Cream",
      doctor: "Dr. Sarah Johnson",
      status: "Discontinued",
    },
  ],
  tests: [
    {
      name: "Chest X-ray",
      date: "Oct 20, 2023",
      summary: "No acute findings. Mild cardiomegaly noted.",
    },
    {
      name: "Blood Panel",
      date: "Sep 02, 2023",
      summary: "Elevated LDL cholesterol; other values within normal limits.",
    },
  ],
  allergies: [
    { name: "Penicillin", severity: "High", note: "Causes anaphylaxis." },
    {
      name: "Peanuts",
      severity: "Moderate",
      note: "Causes hives and swelling.",
    },
    {
      name: "Dust Mites",
      severity: "Low",
      note: "Causes mild respiratory irritation.",
    },
  ],
  appointments: [
    {
      date: "Dec 15, 2023, 10:00 AM",
      doctor: "Dr. Michael Chen",
      department: "Orthopedics",
      status: "Upcoming",
    },
    {
      date: "Oct 25, 2023, 02:30 PM",
      doctor: "Dr. Emily Carter",
      department: "Cardiology",
      status: "Completed",
    },
  ],
};

type PatientRouteParams =
  | { id?: string }
  | Promise<{ id?: string }>
  | undefined;

export default function PatientDetail({
  params,
  searchParams: _searchParams, // included for compatibility with Next PageProps
}: {
  params?: PatientRouteParams;
  searchParams?: unknown;
}) {
  const [activeTab, setActiveTab] = React.useState<string>("personal");
  const patient = mockPatient;
  const resolvedId = React.useMemo(() => {
    if (!params) return "";
    // Handle possible Promise typing from Next type check while keeping runtime object usage
    if (typeof (params as any)?.then === "function") return "";
    return (params as { id?: string }).id ?? "";
  }, [params]);

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/20">
      {/* Sticky top bar with back + actions */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/patient">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to patients</span>
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Patient ID: {resolvedId || mockPatient.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Save &amp; Create Appointment
          </Button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6">
        {/* Patient summary card */}
        <Card className="border bg-white shadow-sm">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback>{patient.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-xl">{patient.name}</CardTitle>
                <CardDescription className="space-y-1 text-sm text-foreground">
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <span>Patient ID: {patient.id}</span>
                    <span>Age: {patient.age}</span>
                    <span>Gender: {patient.gender}</span>
                    <span>Phone: {patient.phone}</span>
                    <span className="inline-flex items-center gap-1">
                      Insurance:
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        {patient.insurance}
                      </span>
                    </span>
                  </div>
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" className="gap-2 self-start">
              <PenLine className="h-4 w-4" />
              Edit Information
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <div>
                <p className="font-semibold">Allergy Warning</p>
                <p>{patient.allergiesWarning}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-4 border-b bg-white px-2 py-2 sm:px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-2 pb-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                activeTab === tab.id && "text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#137fec]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <Card className="border bg-white shadow-sm">
          <CardContent className="space-y-4 px-4 py-5 sm:px-6">
            {activeTab === "personal" && <PersonalInfo data={patient.detail} />}
            {activeTab === "exam-history" && (
              <ExamHistory data={patient.examinations} />
            )}
            {activeTab === "medications" && (
              <Medications data={patient.medications} />
            )}
            {activeTab === "tests" && <Tests data={patient.tests} />}
            {activeTab === "allergies" && (
              <Allergies data={patient.allergies} />
            )}
            {activeTab === "appointments" && (
              <Appointments data={patient.appointments} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sticky footer actions */}
      <div className="sticky bottom-0 z-20 border-t bg-background/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/patient">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>
          <div className="flex flex-1 flex-wrap justify-end gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Summary Record
            </Button>
            <Button variant="secondary" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save &amp; Create Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalInfo({
  data,
}: {
  data: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
  };
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Personal Information</CardTitle>
        <Button size="sm" variant="ghost" className="gap-1">
          <PenLine className="h-4 w-4" />
          Edit
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <LabeledInput label="First Name" value={data.firstName} />
        <LabeledInput label="Last Name" value={data.lastName} />
        <LabeledInput label="Date of Birth" value={data.dob} />
        <LabeledInput label="Gender" value={data.gender} />
        <LabeledInput label="Phone Number" value={data.phone} />
        <LabeledInput label="Email Address" value={data.email} />
      </div>
      <LabeledInput label="Address" value={data.address} />
    </div>
  );
}

function ExamHistory({
  data,
}: {
  data: { title: string; doctor: string; notes: string; date: string }[];
}) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-lg">Examination History</CardTitle>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-1 rounded-md border border-muted bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.doctor}</p>
              <p className="text-muted-foreground">{item.notes}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{item.date}</p>
              <button className="text-[#137fec]">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Medications({
  data,
}: {
  data: { date: string; medication: string; doctor: string; status: string }[];
}) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-lg">Prescribed Medications</CardTitle>
      <div className="overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/60 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Prescription Date</th>
              <th className="px-4 py-3">Medication</th>
              <th className="px-4 py-3">Prescribing Doctor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item) => (
              <tr key={item.medication} className="bg-white">
                <td className="px-4 py-3 text-sm text-foreground">
                  {item.date}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {item.medication}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {item.doctor}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={item.status} />
                </td>
                <td className="px-4 py-3 text-sm text-[#137fec]">
                  <button>View</button>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <button>Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tests({
  data,
}: {
  data: { name: string; date: string; summary: string }[];
}) {
  return (
    <div className="space-y-4">
      <CardTitle className="text-lg">Test / Imaging Results</CardTitle>
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border bg-muted/30 px-4 py-3 text-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">{item.name}</p>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="mt-1 text-muted-foreground">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Allergies({
  data,
}: {
  data: { name: string; severity: string; note: string }[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Allergies &amp; Warnings</CardTitle>
        <Button size="sm" className="gap-1">
          <PenLine className="h-4 w-4" />
          Add new Allergies
        </Button>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.name}
            className={cn(
              "rounded-lg border px-4 py-3 text-sm shadow-sm",
              item.severity === "High" && "border-red-200 bg-red-50",
              item.severity === "Moderate" && "border-amber-200 bg-amber-50",
              item.severity === "Low" && "border-blue-200 bg-blue-50"
            )}
          >
            <p className="font-semibold text-foreground">{item.name}</p>
            <p className="text-muted-foreground">
              Severity: {item.severity}. {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Appointments({
  data,
}: {
  data: {
    date: string;
    doctor: string;
    department: string;
    status: string;
  }[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Appointments</CardTitle>
        <Button size="sm" className="gap-1">
          + Book New Appointment
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/60 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item) => (
              <tr key={item.date} className="bg-white">
                <td className="px-4 py-3 text-foreground">{item.date}</td>
                <td className="px-4 py-3 text-foreground">{item.doctor}</td>
                <td className="px-4 py-3 text-foreground">
                  {item.department}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={item.status} />
                </td>
                <td className="px-4 py-3 text-sm text-[#137fec]">
                  <button>Reschedule</button>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <button>View Notes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LabeledInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <Input value={value} readOnly className="bg-muted/50" />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Completed"
        ? "bg-slate-200 text-slate-700"
        : status === "Upcoming"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";
  return (
    <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", styles)}>
      {status}
    </span>
  );
}
