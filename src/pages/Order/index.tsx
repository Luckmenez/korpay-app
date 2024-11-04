import { useMemo, useState } from 'react';
import { OrderStatus, useGetOrders } from '../../http/useGetOrders';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Order } from '../../http/useGetOrders';
import { Box, Flex, chakra, Input, useDisclosure } from '@chakra-ui/react';
import { StandardButton } from '../../components/Button';
import { UpdateQuotationInfoModal } from './UpdateQuotationInfoModal';
function translateStatus(status: OrderStatus) {
    const statusMap = {
        PENDING: 'Pendente',
        COMPLETED: 'Concluído',
        CANCELLED: 'Cancelado',
    };
    return statusMap[status];
}

export function OrderTable() {
    const { data, refetch } = useGetOrders();
    const [globalFilter, setGlobalFilter] = useState('');
    const { onClose, onOpen, isOpen } = useDisclosure();

    const columns = useMemo<ColumnDef<Order, any>[]>(
        () => [
            {
                accessorKey: 'user.name',
                cell: (cell) => cell.getValue(),
                header: 'Nome',
            },
            {
                accessorKey: 'user.email',
                cell: (cell) => cell.getValue(),
                header: 'Email',
            },
            {
                accessorKey: 'actual_spread',
                cell: (cell) => cell.getValue(),
                header: 'Spread',
            },
            {
                accessorKey: 'amount',
                cell: (cell) => cell.getValue(),
                header: 'Quantidade',
            },
            {
                accessorKey: 'price',
                cell: (cell) => cell.getValue(),
                header: 'Preço',
            },
            {
                accessorKey: 'userId',
                cell: (cell) => cell.getValue(),
                header: 'User ID',
            },
        ],
        [],
    );

    const table = useReactTable<Order>({
        columns,
        data: data || [],
        filterFns: {
            globalFilterFn: (row, columnId, filterValue) => {
                console.log(columnId);
                return Object.values(row.original).some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
                );
            },
        },
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        enableColumnFilters: true,
    });

    function handleRowClick(row: Order) {
        console.log(row);
    function submitUpdateForm(data: { status: string }) {
        if (selectedOrder !== null) {
            updateStatusMutation.mutate(
                {
                    id: selectedOrder.id,
                    status: data.status as OrderStatus,
                },
                {
                    onSuccess: () => {
                        refetch();
                        onClose();
                    },
                },
            );
            console.log('Order ID:', selectedOrder.id);
            console.log('Form Data:', data);
        }
    }

    return (
        <Flex h={'100vh'} flexDir={'column'} maxW={'1024px'} px={'2rem'}>
            <Input
                placeholder="Filtrar todos os campos"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                mb="4"
            />
            <chakra.table>
                <chakra.thead
                    borderBottom={'2px solid #CCCCCC'}
                    textColor={'#CCCCCC'}
                    p={'1rem'}
                    w={'100%'}
                    textAlign={'initial'}
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <chakra.tr
                            key={headerGroup.id}
                            p={'1rem'}
                            textAlign={'initial'}
                        >
                            {headerGroup.headers.map((header) => (
                                <chakra.th
                                    key={header.id}
                                    p={'1rem'}
                                    textAlign={'initial'}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </chakra.th>
                            ))}
                        </chakra.tr>
                    ))}
                </chakra.thead>
                <chakra.tbody>
                    {table.getRowModel().rows.map((row) => (
                        <chakra.tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <chakra.td
                                    textAlign={'initial'}
                                    p={'1rem'}
                                    key={cell.id}
                                    cursor={'pointer'}
                                    onClick={() => handleRowClick(row.original)}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </chakra.td>
                            ))}
                        </chakra.tr>
                    ))}
                </chakra.tbody>
            </chakra.table>
            <Flex justifyContent="space-between" mt="4">
                <StandardButton
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    label="Anterior"
                />
                <Box>
                    Página{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </strong>
                </Box>
                <StandardButton
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    label="Próxima"
                />
            </Flex>
            <Flex mt="4" alignItems="center">
                <Box>Linhas por página:</Box>
                <chakra.select
                    ml="2"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </chakra.select>
            </Flex>
            <UpdateQuotationInfoModal
                isOpen={isOpen}
                onClose={onClose}
                submitUpdateForm={submitUpdateForm}
            />
        </Flex>
    );
}
