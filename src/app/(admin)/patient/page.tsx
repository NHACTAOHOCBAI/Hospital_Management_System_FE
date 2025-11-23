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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTable from "@/hooks/useTable";
import { toast } from "sonner";
import { Trash2, Plus, Filter } from "lucide-react";
import { usePatients, useDeletePatients } from "@/hooks/queries/usePatient";
import { patientColumns } from "./patient-columns";

export default function Patients() {
  const { mutate: deletePatients } = useDeletePatients();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedItems, setDeletedItems] = React.useState<number[]>([]);

  // Filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [insuranceStatus, setInsuranceStatus] = React.useState("all");
  const [gender, setGender] = React.useState("all");
  const [ageMin, setAgeMin] = React.useState("");
  const [ageMax, setAgeMax] = React.useState("");

  const { table, isFetching, filter, setFilter, setPagination } =
    useTable<Patient>({
      use: usePatients,
      columns: patientColumns(),
    });

  const handleCreate = () => {
    console.log("Create Patient");
  };

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
          <Button onClick={handleCreate} size="sm" className="h-9 gap-2">
            <Plus className="h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex items-end gap-4 p-4 bg-muted/50 rounded-lg">
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
        <div className="flex gap-2 ml-auto">
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
            className="h-9 gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
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
              <Trash2 className="h-4 w-4 mr-2" />
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
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
