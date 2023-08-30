'use client';

import Table from 'rc-table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { TTicket } from '@/components/Dashboard/schema/ticketSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customizedComponents } from './CustomizedComponents';

export const TableComponent = ({ data }: { data: TTicket[] }) => {
  const maxDataPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentShort, setCurrentShort] = useState<'asc' | 'desc'>('asc');
  const [selectedRow, setSelectedRow] = useState<TTicket[]>([]);
  const [tableData, setTableData] = useState<TTicket[]>(data);

  const handleAddAllToSelection = () => {
    if (selectedRow.length === tableData.length) {
      setSelectedRow([]);
    } else {
      setSelectedRow(tableData);
    }
  };

  const handleAddRowToSelection = (row: TTicket) => {
    // console.log('index', index);
    const isSelected = selectedRow.filter((item) => item.id === row.id).length === 1;
    if (isSelected) {
      const newSelection = [...selectedRow];
      newSelection.splice(1, 1);
      setSelectedRow(newSelection);
    } else {
      setSelectedRow([...selectedRow, row]);
    }
  };

  const handleShortByKey = (key: string) => {
    if (currentShort === 'desc') {
      setCurrentShort('asc');
      const newTableData = [...tableData];
      newTableData.sort((a: any, b: any) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
      setTableData(newTableData);
    } else {
      setCurrentShort('desc');
      const newTableData = [...tableData];
      newTableData.sort((a: any, b: any) => {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      });
      setTableData(newTableData);
    }
  };

  const handleSliceData = () => {
    const start = (currentPage - 1) * maxDataPerPage;
    const end = start + maxDataPerPage;
    setTableData(data.slice(start, end));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (input: string) => {
    if (input === '') {
      handleSliceData();
      return;
    }
    // Data from All Data
    const newTableData = data.filter((item) => item.id.toLowerCase().includes(input.toLowerCase()));
    setTableData(newTableData);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const columns = [
    {
      title: <Checkbox onClick={handleAddAllToSelection} />,
      render: (row: any) => {
        const isSelected = selectedRow.filter((item) => item.id === row.id).length === 1;
        return <Checkbox checked={isSelected} onClick={() => handleAddRowToSelection(row)} />;
      },
    },
    {
      title: (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent w-full flex justify-between cursor-pointer"
          onClick={() => handleShortByKey('id')}
        >
          <div>Ticket Id</div>
        </Button>
      ),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent w-full flex justify-between cursor-pointer"
          onClick={() => handleShortByKey('createdAt')}
        >
          <div>Created Date</div>
        </Button>
      ),
      render: (row: TTicket) => <span>{moment(row.createdAt).format('DD/MM/YYYY')}</span>,
    },
    {
      title: (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent w-full flex justify-between cursor-pointer"
          onClick={() => handleShortByKey('category')}
        >
          <div>Category</div>
        </Button>
      ),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent w-full flex justify-between cursor-pointer"
          onClick={() => handleShortByKey('status')}
        >
          <div>Status</div>
        </Button>
      ),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      render: (row: any) => {
        return (
          <div className="space-x-1">
            <Link href={`/dashboard/tickets/${row.id}`}>
              <Button>View</Button>
            </Link>
            <Link href={`/dashboard/tickets/edit/${row.id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    handleSliceData();
  }, [data, currentPage]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h3>All Ticket</h3>
        <Input placeholder="Search" className="w-[360px]" onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <Table columns={columns} data={tableData} components={customizedComponents} rowKey="id" />
      <div className="space-x-2">
        <Button disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </Button>
        <Button disabled={currentPage * maxDataPerPage >= data.length} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};
