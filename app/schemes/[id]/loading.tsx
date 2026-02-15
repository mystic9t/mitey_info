export default function SchemeDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-muted rounded w-12"></div>
        <div className="h-4 bg-muted rounded w-4"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-4"></div>
        <div className="h-4 bg-muted rounded w-32"></div>
      </div>
      <div className="bg-gradient-to-br from-muted to-muted/50 rounded-3xl p-8 mb-8">
        <div className="flex gap-3 mb-6">
          <div className="h-6 bg-muted-foreground/20 rounded-full w-24"></div>
          <div className="h-6 bg-muted-foreground/20 rounded-full w-20"></div>
        </div>
        <div className="h-10 bg-muted-foreground/20 rounded-lg w-2/3 mb-4"></div>
        <div className="h-6 bg-muted-foreground/20 rounded-lg w-full mb-6"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-muted-foreground/20 rounded-xl w-36"></div>
          <div className="h-10 bg-muted-foreground/20 rounded-xl w-32"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-muted rounded-2xl p-6 h-32"></div>
        <div className="bg-muted rounded-2xl p-6 h-32"></div>
      </div>
      <div className="space-y-8">
        <div>
          <div className="h-8 bg-muted rounded-lg w-40 mb-4"></div>
          <div className="bg-card border rounded-2xl p-6">
            <div className="h-4 bg-muted rounded w-full mb-4"></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-20 bg-muted rounded-xl"></div>
              <div className="h-20 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 bg-muted rounded-lg w-44 mb-4"></div>
          <div className="bg-card border rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
