export default function SideBySide({children}: {children: JSX.Element[]}) {
  return (
    <div className="side-by-side">
      {children}
    </div>
  );
}