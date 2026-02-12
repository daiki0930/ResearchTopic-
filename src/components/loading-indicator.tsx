export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex gap-1">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-success [animation-delay:300ms]" />
      </div>
      <p className="text-lg font-medium text-muted">
        テーマを考え中...
      </p>
    </div>
  );
}
