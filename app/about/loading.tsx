export default function AboutLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-pulse">
      <div className="text-center">
        <div className="h-6 bg-muted rounded-full w-32 mx-auto mb-4"></div>
        <div className="h-10 bg-muted rounded-lg w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-muted rounded-lg w-80 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-muted rounded-2xl p-6 h-32"></div>
        <div className="bg-muted rounded-2xl p-6 h-32"></div>
        <div className="bg-muted rounded-2xl p-6 h-32"></div>
      </div>
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded-lg w-40"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 bg-muted rounded-full shrink-0"></div>
              <div className="h-4 bg-muted rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
