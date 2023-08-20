'use client';

import { Table, TableCell, TableHead, TableRow } from '@/components/ui/table';

export const customizedComponents = {
  table: (props: any) => <Table {...props} />,
  header: {
    row: (props: any) => <TableRow {...props} />,
    cell: (props: any) => <TableHead {...props} />,
  },
  body: {
    row: (props: any) => <TableRow {...props} />,
    cell: (props: any) => <TableCell {...props} />,
  },
};
