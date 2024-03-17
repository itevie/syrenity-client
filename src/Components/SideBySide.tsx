export default function SideBySide({children, type}: {children: JSX.Element[], type?: string}) {
  return (
    <div className="side-by-side" style={{justifyContent: type || "space-between"}}>
      {children}
    </div>
  );
}