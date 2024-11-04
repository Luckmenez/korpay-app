import { Box, Flex, chakra, useDisclosure } from '@chakra-ui/react';
import { Container } from '../../components/Container';
import { useGetUsers } from '../../http/useGetUsers';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    RowData,
    ColumnFiltersState,
    ColumnDef,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { StandardModal } from '../../components/Modal';
import { StandardInput } from '../../components/input';
import { StandardButton } from '../../components/Button';
import { useUpdateSpreadMutation } from '../../http/useUpdateSpreadMutation';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StandardSelectInput } from '../../components/StandardSelectInput';

type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    spread: number;
    isActive: boolean;
    role: 'USER' | 'ADMIN';
};

const schema = z.object({
    spread: z.string().min(3, 'Esse campo é obrigatório'),
    isActive: z.string().min(3, 'Esse campo é obrigatório'),
});

type FormData = z.infer<typeof schema>;

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select';
    }
}

export function Admin() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const { data } = useGetUsers();
    const updateSpreadMutation = useUpdateSpreadMutation();
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleRowClick = (row: User) => {
        setSelectedRow(row);
        setValue('spread', row.spread.toString());
        setValue('isActive', row.isActive.toString());
        onOpen();
    };

    const handleUpdateSpread = (data: FormData) => {
        updateSpreadMutation.mutate({
            spread: data.spread,
            email: selectedRow?.email as string,
            isActive: data.isActive,
        });
    };

    const columns = useMemo<ColumnDef<User, any>[]>(
        () => [
            {
                accessorKey: 'email',
                cell: (cell) => cell.getValue(),
                header: 'Email',
            },
            {
                accessorKey: 'name',
                cell: (cell) => cell.getValue(),
                header: 'Name',
            },
            {
                accessorKey: 'spread',
                cell: (cell) => cell.getValue(),
                header: 'Spread',
                filterFn: 'weakEquals',
            },
            {
                accessorKey: 'isActive',
                cell: (cell) => cell.getValue()?.toString(),
                header: 'Ativo',
            },
        ],
        [],
    );

    const table = useReactTable<User>({
        columns,
        data: data || [],
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        enableColumnFilters: true,
    });

    return (
        <Container>
            <Flex h={'100vh'} flexDir={'column'} maxW={'1024px'}>
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
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                        <br />
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
                                        onClick={() =>
                                            handleRowClick(row.original)
                                        }
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
            </Flex>
            <StandardModal isOpen={isOpen} onClose={onClose}>
                <Flex flexDir={'column'} gap={'0.5rem'}>
                    <Box>
                        <strong>Email:</strong> <br />
                        {selectedRow?.email}
                    </Box>
                    <Box>
                        <strong>Nome:</strong> <br />
                        {selectedRow?.name}
                    </Box>
                    <Box>
                        <strong>Spread:</strong> <br />
                        {selectedRow?.spread}
                    </Box>
                    <form onSubmit={handleSubmit(handleUpdateSpread)}>
                        <StandardSelectInput
                            label="Usuário ativo"
                            options={[
                                { id: '1', option: 'Não', value: 'false' },
                                { id: '2', option: 'Sim', value: 'true' },
                            ]}
                        />

                        <StandardInput
                            error={errors.spread?.message}
                            {...register('spread')}
                            label="Novo Spread"
                            onChange={(e) => {
                                setValue('spread', e.target.value);
                            }}
                        />
                        <br />
                        <StandardButton type="submit" label="Salvar" />
                    </form>
                </Flex>
            </StandardModal>
        </Container>
    );
}
