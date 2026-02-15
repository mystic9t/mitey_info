export default function CheckerLoading() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      <div className="text-center mb-8">
        <div className="h-6 bg-muted rounded-full w-32 mx-auto mb-4"></div>
        <div className="h-10 bg-muted rounded-lg w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-muted rounded-lg w-80 mx-auto"></div>
      </div>
      <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 bg-muted rounded w-20 mb-2"></div>
              <div className="h-12 bg-muted rounded-xl"></div>
            </div>
            <div>
              <div className="h-4 bg-muted rounded w-20 mb-2"></div>
              <div className="h-12 bg-muted rounded-xl"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
            <div className="h-12 bg-muted rounded-xl"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 bg-muted rounded w-28 mb-2"></div>
              <div className="h-12 bg-muted rounded-xl"></div>
            </div>
            <div>
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-12 bg-muted rounded-xl"></div>
            </div>
          </div>
          <div className="h-14 bg-muted rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
