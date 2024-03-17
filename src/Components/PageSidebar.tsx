export default function PageSidebar({children}: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div className="page-sidebar">
      {children}
    </div>
  );
}