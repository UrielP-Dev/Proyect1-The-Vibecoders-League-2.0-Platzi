import MenuPanel from "@/components/MenuPanel";

type MenuShellProps = {
  className?: string;
  panelClassName?: string;
};

export default function MenuShell({
  className = "",
  panelClassName = "",
}: MenuShellProps) {
  return (
    <div className={`dashboard-panel h-full ${className}`}>
      <div className={`panel flex h-full flex-col ${panelClassName}`}>
        <MenuPanel />
      </div>
    </div>
  );
}
