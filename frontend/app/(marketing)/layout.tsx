export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      {/* Marketing header will go here */}
      <main className="flex-1">{children}</main>
      {/* Marketing footer will go here */}
    </div>
  );
}
