export default function VerticalCenter({children}: {children: JSX.Element[] | JSX.Element | string}) {
  return (
    <div style={{marginTop: "auto", marginBottom: "auto"}}>
      {children}
    </div>
  );
}