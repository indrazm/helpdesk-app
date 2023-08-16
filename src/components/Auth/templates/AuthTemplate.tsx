export const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="bg-primary" />
      <div className="flex justify-center items-center">
        <div className="w-[400px]">{children}</div>
      </div>
    </main>
  );
};
