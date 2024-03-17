export default function Page({children}: {children: JSX.Element[] | JSX.Element}) {
  return (
    <div className="page">
      {children}
    </div>
  );
}