'use client';

export const MessageBox = ({ data }: { data: any }) => {
  return (
    <div className="border-2 p-4 rounded-xl">
      <h3>{data.id}</h3>
      <div>{data.createdAt}</div>
      <div>
        <div>
          {data.user.firstName} {data.user.lastName}
        </div>
        <div>{data.userId}</div>
        <h3>{data.title}</h3>
        <div>{data.description}</div>
      </div>
    </div>
  );
};
