export default function PageContainer({children}: {children: JSX.Element[] | JSX.Element}) {
  return (
    <div className="page-container" style={{display: "block"}}>
      {children}
    </div>
  );
} 