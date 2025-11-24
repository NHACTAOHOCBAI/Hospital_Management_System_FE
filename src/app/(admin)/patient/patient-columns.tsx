import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const patientColumns = (
  onNavigate: (id: number) => void
): ColumnDef<Patient>[] => {

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Full Name" />
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateOfBirth"));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "healthInsurance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Health Insurance" />
      ),
      cell: ({ row }) => {
        // Mock health insurance status based on patient data
        const hasInsurance = row.original.id % 2 === 0;
        return (
          <span className={hasInsurance ? "text-green-600" : "text-gray-400"}>
            {hasInsurance ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <span className="text-blue-600">👁️</span>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <span className="text-yellow-600">✏️</span>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Schedule", item)}
                className="gap-2"
              >
                <span className="text-green-600">📅</span>
                Schedule
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Check-in", item)}
                className="gap-2"
              >
                <span className="text-red-600">✓</span>
                Check in
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
