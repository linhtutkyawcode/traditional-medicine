import { useState, useEffect, forwardRef } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MenuItemProps,
} from '@material-tailwind/react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useStore } from '@nanostores/react';
import { userStore } from '../stores';

// ? Login
const LoginButton = () => {
  const { loginWithRedirect, error, isLoading, isAuthenticated, user } =
    useAuth0();

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const userData =
      userDataString &&
      userDataString != 'undefined' &&
      userDataString != 'null' &&
      userDataString != 'false' &&
      JSON.parse(userDataString);
    if (userData?.expTime <= Date.now()) localStorage.removeItem('userData');
    else if (userData?.isAuthenticated) userStore.set(userData);
  }, []);

  useEffect(() => {
    if (!userStore.get()?.isAuthenticated)
      userStore.set({ error, isLoading, isAuthenticated, user });

    if (isAuthenticated) {
      const expTime = Date.now() + 1000 * 60 * 60 * 24 * 3;
      localStorage.setItem(
        'userData',
        JSON.stringify({ error, isLoading, isAuthenticated, user, expTime })
      );
    }
  }, [error, isLoading, isAuthenticated, user]);

  return (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="font-normal"
      key="login"
    >
      <div className="flex items-center">
        <Button
          onClick={() => loginWithRedirect()}
          variant="gradient"
          color="teal"
          size="sm"
          className="w-full lg:w-min font-semibold capitalize ml-2"
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
              />
            </svg>
            Login
          </span>
        </Button>
      </div>
    </Typography>
  );
};

// ? Logout
const LogoutButton = forwardRef<MenuItemProps>(() => {
  const { logout } = useAuth0();

  return (
    <MenuItem
      onClick={() => {
        localStorage.removeItem('userData');
        logout({ returnTo: window.location.origin });
      }}
    >
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        Logout
      </span>
    </MenuItem>
  );
});

// ? Header
export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const $userData = useStore(userStore);

  const logo = (
    <Typography
      as="a"
      href="/"
      variant="small"
      color="teal"
      className="mr-4 cursor-pointer py-1.5 font-semibold  flex items-center just"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="flex-shrink-0 w-4 h-4 mr-1 rounded-full text-teal-500 -rotate-[135deg]"
      >
        <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
      </svg>
      <span>Traditional Medicines</span>
    </Typography>
  );

  const navLinks: { text: string; href: string; icon: JSX.Element }[] = [
    ...($userData?.isAuthenticated
      ? [
          {
            text: 'Medicines',
            href: '#medicines',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            ),
          },
          {
            text: 'Upgrade Plan',
            href: '#upgrade-plan',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                />
              </svg>
            ),
          },
        ]
      : [
          {
            text: 'Pricing',
            href: '#pricing',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            ),
          },
        ]),
    {
      text: 'Collaborations',
      href: '#collaborations',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      text: 'About',
      href: '#about',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-1">
      {navLinks.map((nl) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="font-normal"
          key={nl.href}
        >
          <a href={nl.href} className="flex items-center">
            <Button
              variant="text"
              color="blue-gray"
              size="sm"
              className="w-full lg:w-max font-semibold capitalize"
            >
              <span className="flex items-center justify-center">
                {nl.icon}
                {nl.text}
              </span>
            </Button>
          </a>
        </Typography>
      ))}
      {($userData?.isLoading ||
        !$userData?.isAuthenticated ||
        !$userData.user) && <LoginButton />}
    </ul>
  );

  const accNavLinks: { text: string; href: string; icon: JSX.Element }[] = [
    {
      text: 'Subscription',
      href: '/subscription',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
    },
    {
      text: 'Favorites',
      href: '/favorites',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
  ];

  const accNavList = (
    <MenuList className="text-xs font-semibold ">
      {accNavLinks.map((anl) => (
        <MenuItem className="flex" key={anl.href}>
          {anl.icon}
          {anl.text}
        </MenuItem>
      ))}
      <LogoutButton />
    </MenuList>
  );

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <header>
      <Auth0Provider
        domain={
          import.meta.env.PUBLIC_AUTH0_DOMAIN || process.env.PUBLIC_AUTH0_DOMAIN
        }
        clientId={
          import.meta.env.PUBLIC_AUTH0_CLIENT_ID ||
          process.env.PUBLIC_AUTH0_CLIENT_ID
        }
        redirectUri={window.location.origin}
      >
        <div className="pt-[5.4rem]"></div>
        <div className="fixed w-full p-1.5 top-0 z-50">
          <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
              {logo}
              <div className="flex items-center">
                {/* lg-nav */}
                <div className="hidden lg:flex lg:space-x-4 lg:items-center">
                  {navList}
                </div>
                {/* avatar  */}
                {!$userData?.isLoading &&
                  $userData?.isAuthenticated &&
                  $userData.user && (
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          variant="text"
                          color="teal"
                          className="p-1.5 ml-2 rounded-full"
                        >
                          <Avatar
                            src={$userData?.user?.picture}
                            alt={$userData?.user?.name}
                            variant="circular"
                            className="ring ring-blue-gray-300 w-8 h-8"
                          />
                        </Button>
                      </MenuHandler>
                      {accNavList}
                    </Menu>
                  )}
                {/* Humbugger Icon */}
                <IconButton
                  variant="text"
                  className="h-6 w-6 ml-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  ripple={false}
                  onClick={() => setOpenNav(!openNav)}
                >
                  {openNav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </IconButton>
              </div>
            </div>
            {/* non-lg-nav */}
            <MobileNav open={openNav}>{navList}</MobileNav>
          </Navbar>
        </div>
      </Auth0Provider>
    </header>
  );
}
