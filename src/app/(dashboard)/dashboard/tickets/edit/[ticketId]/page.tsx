import { API_URL } from '@/config/apiUrl';
import { EditTicket } from '@/components/Dashboard/components/Ticket/EditTicket';

async function getSingleTicket(ticketId: string) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}`);
  const data = await res.json();
  return data;
}

async function getAdminUser() {
  const res = await fetch(`${API_URL}/users`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params: { ticketId: string } }) {
  const { ticketId } = params;
  const { data: singleTicketData } = await getSingleTicket(ticketId);
  const { data: adminUserData } = await getAdminUser();
  console.log(adminUserData);

  return <EditTicket data={singleTicketData} adminUsersData={adminUserData} />;
}
