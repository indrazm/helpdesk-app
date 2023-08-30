import { API_URL } from '@/config/apiUrl';
import { MessageBox } from '@/components/Dashboard/components/Ticket/SingleTicket/MessageBox';
import { CreateMessage } from '@/components/Dashboard/components/Ticket/SingleTicket/CreateMessage';

async function getSingleTicket(ticketId: string) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}`);
  const data = await res.json();
  return data;
}

async function getComments(ticketId: string) {
  const res = await fetch(`${API_URL}/comments?ticketId=${ticketId}`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params: { ticketId: string } }) {
  const { ticketId } = params;
  const { data: singleTicketData } = await getSingleTicket(ticketId);
  const { data: commentsData } = await getComments(ticketId);

  return (
    <>
      <MessageBox data={singleTicketData} />
      <div>
        {commentsData.map((item: any) => {
          const { userId } = item;
          const isCommentByAuthor = userId === singleTicketData.userId;
          return (
            <div key={item.id} className="p-4 border-2 rounded-xl" style={{ backgroundColor: isCommentByAuthor ? 'yellow' : 'white' }}>
              <div>{item.content}</div>
              <div>{item.userId}</div>
            </div>
          );
        })}
      </div>
      <CreateMessage data={singleTicketData} />
    </>
  );
}
