import React from 'react';

interface NotificationProps {
  firstName: string;
  ticketId: string;
  url: string;
}

export const NotificationEmailTemplate = ({ url, firstName, ticketId }: NotificationProps) => {
  return (
    <div>
      <h3>Notification</h3>
      <p>
        Hey {firstName}, you have new message on your ticket with ticket-id {ticketId}
      </p>
      <a href={url}>Lihat Tiket</a>
    </div>
  );
};
