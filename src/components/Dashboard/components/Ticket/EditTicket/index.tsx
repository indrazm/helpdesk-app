'use client';

import { useState } from 'react';
import { Priority, Status } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface EditTicketProps {
  data: any;
  adminUsersData: any;
}

export const EditTicket = ({ data, adminUsersData }: EditTicketProps) => {
  const [ticketData, setTicketData] = useState(data);

  const handleUpdateTicket = async () => {
    console.log(ticketData);
  };

  return (
    <div>
      <h3>Edit Ticket</h3>
      <div>Id Ticket</div>
      <div>Priority</div>
      <Select value={ticketData.priority} onValueChange={(value) => setTicketData({ ...ticketData, priority: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Priority.LOW}>Low</SelectItem>
          <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
          <SelectItem value={Priority.HIGH}>High</SelectItem>
        </SelectContent>
      </Select>
      <div>Status</div>
      <Select value={ticketData.status} onValueChange={(value) => setTicketData({ ...ticketData, status: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Status.OPEN}>OPEN</SelectItem>
          <SelectItem value={Status.IN_PROGRESS}>IN_PROGRESS</SelectItem>
          <SelectItem value={Status.CLOSED}>CLOSED</SelectItem>
        </SelectContent>
      </Select>
      <div>Assignee</div>
      <Select onValueChange={(value) => setTicketData({ ...ticketData, assigneeId: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select assignee" />
        </SelectTrigger>
        <SelectContent>
          {adminUsersData.map((user: any) => {
            return (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button onClick={handleUpdateTicket}>Update</Button>
    </div>
  );
};
