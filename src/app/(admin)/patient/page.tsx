"use client";
import React from "react";
import CustomTable from "@/components/table/custom-table";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import useTable from "@/hooks/useTable";
import { toast } from "sonner";
import { Trash2, Plus, Filter, ArrowLeft, ChevronDown } from "lucide-react";
import { usePatients, useDeletePatients } from "@/hooks/queries/usePatient";
import { patientColumns } from "./patient-columns";

export default function Patients() {
  const { mutate: deletePatients } = useDeletePatients();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedItems, setDeletedItems] = React.useState<number[]>([]);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [patientGender, setPatientGender] = React.useState("Male");

  // Filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [insuranceStatus, setInsuranceStatus] = React.useState("all");
  const [gender, setGender] = React.useState("all");
  const [ageMin, setAgeMin] = React.useState("");
  const [ageMax, setAgeMax] = React.useState("");

  const { table, isFetching, setFilter, setPagination } = useTable<Patient>({
    use: usePatients,
    columns: patientColumns(),
  });

  const openDeleteDialog = () => {
    const items = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
    setDeletedItems(items);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    deletePatients(deletedItems, {
      onSuccess: () => {
        table.resetRowSelection();
        setOpenDelete(false);
        toast.success("Patients have been deleted");
      },
      onError: (error) => toast.error(`Error: ${error.message}`),
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setFilter(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setInsuranceStatus("all");
    setGender("all");
    setAgeMin("");
    setAgeMax("");
    setFilter("");
  };

  const handleApplyFilters = () => {
    // Combine all filters into search query
    let combinedFilter = searchQuery;
    // Note: In a real implementation, these filters would be sent to backend
    // For now, we'll just use the search query
    setFilter(combinedFilter);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    toast.success("Filters applied");
  };

  return (
    <Sheet open={openCreate} onOpenChange={setOpenCreate}>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by ID, phone, name, ..."
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="ml-auto">
            <SheetTrigger asChild>
              <Button size="sm" className="h-9 gap-2">
                <Plus className="h-4 w-4" />
                New Patient
              </Button>
            </SheetTrigger>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex items-end gap-4 rounded-lg bg-muted/50 p-4">
          {/* Insurance Status Filter */}
          <div className="w-[200px] space-y-2">
            <label className="text-sm font-medium">Insurance Status</label>
            <Select value={insuranceStatus} onValueChange={setInsuranceStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender Filter */}
          <div className="w-[200px] space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Age Range</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
                className="w-[120px]"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
                className="w-[120px]"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              size="sm"
              className="h-9"
            >
              Reset Filters
            </Button>
            <Button
              onClick={handleApplyFilters}
              size="sm"
              className="h-9 gap-2 bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
            >
              <Filter className="h-4 w-4" />
              Apply Filter
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="h-8"
                onClick={openDeleteDialog}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            )}
            <DataTableViewOptions table={table} />
          </div>
        </div>

        {/* Patient Table */}
        <div>
          <div className="overflow-hidden rounded-md border">
            <CustomTable
              onLoading={isFetching}
              columns={patientColumns()}
              table={table}
            />
          </div>
          <div className="py-4">
            <DataTablePagination table={table} />
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                {deletedItems.length} patient(s) and remove their data from the
                system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* New Patient Sheet */}
      <SheetContent
        side="right"
        className="w-full max-w-full overflow-hidden border-l bg-muted/40 p-0 sm:max-w-xl md:max-w-2xl"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="flex flex-row items-center gap-3 border-b bg-background px-6 py-4">
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </SheetClose>
            <div className="space-y-1 text-left">
              <SheetTitle className="text-lg">
                New Patient Registration
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                Capture administrative, insurance, and emergency details.
              </p>
            </div>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
            <Collapsible defaultOpen className="rounded-xl border bg-background shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Administrative Information</p>
                  <p className="text-xs text-muted-foreground">
                    Basic patient details
                  </p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 data-[state=open]:rotate-180"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="border-t px-4 pb-4 pt-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Full Name</Label>
                    <Input
                      id="patient-name"
                      placeholder="Enter patient's full name"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-dob">Date of Birth</Label>
                      <Input id="patient-dob" type="date" placeholder="Select date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <div className="flex h-11 items-center rounded-lg bg-muted/60 p-1">
                        {["Male", "Female", "Other"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setPatientGender(option)}
                            className={cn(
                              "flex-1 rounded-md px-2 text-xs font-medium text-muted-foreground transition hover:text-foreground",
                              patientGender === option &&
                                "bg-background text-primary shadow-sm"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">Phone Number</Label>
                      <Input
                        id="patient-phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email Address</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="patient@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-address">Home Address</Label>
                    <Input
                      id="patient-address"
                      placeholder="123 Main St, Anytown, USA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-id">Government ID</Label>
                    <Input id="patient-id" placeholder="Enter ID number" />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="rounded-xl border bg-background shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">
                    Health Insurance Information
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Coverage and verification
                  </p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 data-[state=open]:rotate-180"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="border-t px-4 pb-4 pt-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance-id">Health Insurance ID</Label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        id="insurance-id"
                        placeholder="Enter insurance ID"
                        className="flex-1"
                      />
                      <Button className="sm:w-auto bg-[#137fec]/15 text-[#137fec] hover:bg-[#137fec]/25">
                        Check Card
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </div>
                    <div className="mt-3 space-y-2 border-t pt-3 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Coverage</span>
                        <span className="font-medium text-foreground">
                          Full (90%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration Place</span>
                        <span className="font-medium text-foreground">
                          General Hospital
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="rounded-xl border bg-background shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">
                    Emergency Contact Information
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Who should we call?
                  </p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 data-[state=open]:rotate-180"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="border-t px-4 pb-4 pt-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Full Name</Label>
                    <Input
                      id="emergency-name"
                      placeholder="Enter contact's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-relationship">
                      Relationship to Patient
                    </Label>
                    <Input
                      id="emergency-relationship"
                      placeholder="e.g., Spouse, Parent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Phone Number</Label>
                    <Input
                      id="emergency-phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="rounded-xl border bg-background shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Medical Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Allergies and history
                  </p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 data-[state=open]:rotate-180"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="border-t px-4 pb-4 pt-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">
                      Known Drug/Food Allergies
                    </Label>
                    <textarea
                      id="allergies"
                      placeholder="e.g., Penicillin, Peanuts"
                      className="min-h-[96px] w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medical-history">
                      Important Medical History
                    </Label>
                    <textarea
                      id="medical-history"
                      placeholder="e.g., Chronic conditions, past surgeries"
                      className="min-h-[96px] w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <SheetFooter className="border-t bg-background px-6 py-4">
            <Button className="w-full bg-[#137fec] text-white hover:bg-[#0f6ac7]">
              Save &amp; Create Appointment
            </Button>
            <div className="grid w-full grid-cols-2 gap-3">
              <Button className="bg-[#137fec]/15 text-[#137fec] hover:bg-[#137fec]/25">
                Save
              </Button>
              <SheetClose asChild>
                <Button variant="ghost">Cancel</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
