'use client';

import Table from 'rc-table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { TTicket } from '@/components/Dashboard/schema/ticketSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { customizedComponents } from './CustomizedComponents';

export const TableComponent = ({ data }: { data: TTicket[] }) => {
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

  const columns = [
    {
      title: <Checkbox onClick={handleAddAllToSelection} />,
      render: (row: any) => {
        const isSelected = selectedRow.filter((item) => item.id === row.id).length === 1;
        return <Checkbox checked={isSelected} onClick={() => handleAddRowToSelection(row)} />;
      },
    },
    {
      title: 'Ticket number',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Creted at',
      render: (row: TTicket) => <span>{moment(row.createdAt).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  useEffect(() => {
    const newDataFormat = data.map((item) => {
      return {
        ...item,
        isSelected: false,
      };
    });
    setTableData(newDataFormat);
  }, [data]);

  return <Table columns={columns} data={tableData} components={customizedComponents} rowKey="id" />;
};
