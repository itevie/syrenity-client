export function LinedText({ children }: { children: JSX.Element | JSX.Element[] | string }) {
  return (
    <label className="lined-text">{children}</label>
  );
}

export function DangerLinedText({ children }: { children: JSX.Element | JSX.Element[] | string }) {
  return (
    <label className="lined-text danger">{children}</label>
  );
}