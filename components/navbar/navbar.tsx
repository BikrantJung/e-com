import AppLogo from '../ui/logo';
import ProfileIcon from './profile-icon';

function Navbar() {
  return (
    <div className="py-4 flex items-center">
      <AppLogo />
      <div className="flex gap-4 text-sm ml-24 items-center">
        <p>Men</p>
        <p>Women</p>
        <p>Children</p>
      </div>
      <div className="flex ml-auto gap-4 items-center">
        <ProfileIcon />
      </div>
    </div>
  );
}

export default Navbar;
