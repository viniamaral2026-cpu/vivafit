"use client"
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users: User[] = [
  { id: "USR001", name: "John Doe", email: "john.d@example.com", role: "Admin", subscription: "Premium", joinedDate: "2023-01-15" },
  { id: "USR002", name: "Jane Smith", email: "jane.s@example.com", role: "User", subscription: "Premium", joinedDate: "2023-02-20" },
  { id: "USR003", name: "Sam Wilson", email: "sam.w@example.com", role: "User", subscription: "Free", joinedDate: "2023-03-10" },
  { id: "USR004", name: "Emily Brown", email: "emily.b@example.com", role: "User", subscription: "Premium", joinedDate: "2023-04-05" },
  { id: "USR005", name: "Michael Johnson", email: "michael.j@example.com", role: "User", subscription: "Free", joinedDate: "2023-05-12" },
];

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
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
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${row.original.id}`} />
                    <AvatarFallback>{row.original.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{row.getValue("name")}</span>
            </div>
        )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => <Badge variant={row.getValue("role") === "Admin" ? "destructive" : "secondary"}>{row.getValue("role")}</Badge>
    },
    {
        accessorKey: "subscription",
        header: "Subscription",
        cell: ({row}) => <Badge variant={row.getValue("subscription") === "Premium" ? "default" : "outline"}>{row.getValue("subscription")}</Badge>
    },
    {
        accessorKey: "joinedDate",
        header: "Joined Date",
        cell: ({row}) => <div>{new Date(row.getValue("joinedDate")).toLocaleDateString()}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit user</DropdownMenuItem>
              <DropdownMenuItem>View payments</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
    },
];

export default function UserManagementPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">User Management</h1>
                <p className="text-muted-foreground">View and manage all registered users.</p>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
