function Bone({ className = '' }) {
  return <div className={`animate-pulse bg-slate-200/80 rounded ${className}`} />;
}

export default function HomeListingSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Bone className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <Bone className="h-4 w-2/3 mb-2" />
          <Bone className="h-3 w-1/2" />
        </div>
      </div>

      <Bone className="h-3 w-full mb-2" />
      <Bone className="h-3 w-5/6 mb-3" />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 mb-3">
        <Bone className="h-4 w-1/3 mb-2" />
        <Bone className="h-3 w-1/2" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Bone className="h-3 w-12" />
        <Bone className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
