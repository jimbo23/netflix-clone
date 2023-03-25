type NavbarItemsProps = {
  label: string;
};
export const NavbarItem: React.FC<NavbarItemsProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};
