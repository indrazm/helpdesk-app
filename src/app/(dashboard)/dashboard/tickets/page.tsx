import { API_URL } from '@/config/apiUrl';
import { TableComponent } from '@/components/Dashboard/components/Ticket/Table/Table';

async function getAllTicket() {
  const res = await fetch(`${API_URL}/tickets`);
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { data } = await getAllTicket();

  return <TableComponent data={data} />;
}
