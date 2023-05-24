export interface HeaderProps {
  text: string;
}

export default function Header(props: HeaderProps) {
  const headerStyles = {
    backgroundColor: "rgba(0,0,0,.4)",
    color: "#ff6a95",
  };
  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{props.text}</h2>
      </div>
    </header>
  );
}
