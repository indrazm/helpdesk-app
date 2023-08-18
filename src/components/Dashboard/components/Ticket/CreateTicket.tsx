'use client';

import { useRecoilState } from 'recoil';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Category } from '@prisma/client';

import { API_URL } from '@/config/apiUrl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

import { ticketState } from '../../recoil/ticket';
import useUser from '../../hooks/useUser';

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border border-muted-foreground bg-muted p-4 text-xs flex justify-center items-center rounded min-h-[120px]">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files</p>}
    </div>
  );
};

export const CreateTicket = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [ticket, setTicket] = useRecoilState(ticketState);

  const categorySelects = [
    { label: 'BUG', value: Category.BUG },
    { label: 'FEATURE', value: Category.FEAT },
    { label: 'OTHER', value: Category.OTHER },
  ];

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmitCreateTicket = async () => {
    setLoading(true);
    const { title, description, category } = ticket;
    const userId = user?.id;

    const res = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify({ title, description, category, userId }),
    });
    const { data, error } = await res.json();

    if (error) {
      toast({
        title: 'Error',
        description: error,
      });
      setLoading(false);
      return;
    }

    console.log(data);
    setLoading(false);
    toast({ title: 'Success', description: 'Ticket created' });
  };

  return (
    <main className="max-w-sm m-auto space-y-6">
      <h3>Create Ticket</h3>
      <div className="space-y-4">
        <Input name="title" placeholder="Title" value={ticket.title} onChange={handleEventChange} />
        <Textarea name="description" placeholder="Description" value={ticket.description} onChange={handleEventChange} />
        <Select defaultValue={categorySelects[0].value.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categorySelects.map(({ label, value }) => {
              return (
                <SelectItem key={label} value={value.toString()}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <MyDropzone />
        <Button disabled={loading} className="w-full" onClick={handleSubmitCreateTicket}>
          Create
        </Button>
      </div>
    </main>
  );
};
