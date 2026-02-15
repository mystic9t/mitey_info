export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="text-center space-y-4">
        <div className="h-10 bg-muted rounded-lg w-2/3 mx-auto"></div>
        <div className="h-6 bg-muted rounded-lg w-1/2 mx-auto"></div>
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
