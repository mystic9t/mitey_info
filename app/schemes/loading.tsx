export default function SchemesLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="text-center">
        <div className="h-10 bg-muted rounded-lg w-80 mx-auto mb-4"></div>
        <div className="h-6 bg-muted rounded-lg w-96 mx-auto"></div>
      </div>
      <div className="bg-card border rounded-2xl p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 h-12 bg-muted rounded-xl"></div>
          <div className="h-12 bg-muted rounded-xl"></div>
          <div className="h-12 bg-muted rounded-xl"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="scheme-card">
            <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-6 bg-muted rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
