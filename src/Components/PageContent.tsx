export default function PageContent({children}: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div className="page-content">
      {children}
    </div>
  );
}