import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';

export function Navigation() {
  const goHome = (e?: React.MouseEvent) => {
    e?.preventDefault();
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // dispatch event so Index can reset its internal step state
    window.dispatchEvent(new CustomEvent('go-home'));
  };

  return (
    <NavigationMenu className="p-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="#home" onClick={goHome} className="text-lg font-semibold hover:text-primary">
            Home
          </a>
        </NavigationMenuItem>
        {/* Products link removed - products are no longer part of the home experience */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}