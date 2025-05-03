const CornerElements = () => {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-0 -translate-x-8 -translate-y-8 w-8 h-8 border-t-2 border-l-2 border-[var(--border)]" />
      <div className="pointer-events-none absolute top-0 right-0 translate-x-8 -translate-y-8 w-8 h-8 border-t-2 border-r-2 border-[var(--border)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -translate-x-8 translate-y-8 w-8 h-8 border-b-2 border-l-2 border-[var(--border)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 translate-x-8 translate-y-8 w-8 h-8 border-b-2 border-r-2 border-[var(--border)]" />
    </>
  );
};

export default CornerElements;
