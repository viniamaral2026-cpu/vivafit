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
import { Skeleton } from "@/components/ui/skeleton";

// Mock data since Firestore is disabled
const mockUsers: User[] = [
    { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com', role: 'User', subscription: 'Premium', createdAt: new Date() },
    { id: 'user2', name: 'Bob Williams', email: 'bob@example.com', role: 'User', subscription: 'Free', createdAt: new Date() },
    { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', subscription: 'Premium', createdAt: new Date() },
    { id: 'user4', name: 'Diana Miller', email: 'diana@example.com', role: 'User', subscription: 'Free', createdAt: new Date() },
];


export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
    },
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({row}) => (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${row.original.id}`} />
                    <AvatarFallback>{row.original.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
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
        header: "Função",
        cell: ({row}) => <Badge variant={row.getValue("role") === "Admin" ? "destructive" : "secondary"}>{row.getValue("role")}</Badge>
    },
    {
        accessorKey: "subscription",
        header: "Assinatura",
        cell: ({row}) => <Badge variant={row.getValue("subscription") === "Premium" ? "default" : "outline"}>{row.getValue("subscription")}</Badge>
    },
    {
        accessorKey: "createdAt",
        header: "Data de Inscrição",
        cell: ({row}) => {
            const date = new Date(row.getValue("createdAt"));
            return <div>{date ? date.toLocaleDateString() : 'N/D'}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>Editar usuário</DropdownMenuItem>
              <DropdownMenuItem>Ver pagamentos</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Deletar usuário</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
    },
];

export default function UserManagementPage() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([])

    React.useEffect(() => {
        setLoading(true);
        // Simulate fetching users from a local source
        setTimeout(() => {
            setUsers(mockUsers);
            setLoading(false);
        }, 500);
    }, []);

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
                <h1 className="text-2xl font-bold font-headline">Gerenciamento de Usuários</h1>
                <p className="text-muted-foreground">Veja e gerencie todos os usuários registrados.</p>
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
                        {loading ? (
                             Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell><div className="flex items-center gap-2"><Skeleton className="h-8 w-8 rounded-full" /><Skeleton className="h-4 w-32" /></div></TableCell>
                                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">Nenhum usuário encontrado.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
