"use client"
import CrudTable from "@/components/crud_table/crud-table"
import { Button } from "@/components/ui/button"
import { useUsers, useDeleteUsers } from "@/hooks/queries/useUser"
import { Plus } from "lucide-react"
import { userColumns } from "./user-columns"

export default function Users() {
    const handleCreate = () => {
        console.log("Create User")
    }
    return (
        <CrudTable<User>
            columns={userColumns()}
            useQuery={useUsers}
            useDelete={useDeleteUsers}
            filterPlaceholder="Filter emails..."
        >
            <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="h-8 flex ml-2"
            >
                <Plus />
                Add User
            </Button>
            <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="h-8 flex ml-2"
            >
                <Plus />
                Add User
            </Button>
        </CrudTable>
    )
}
