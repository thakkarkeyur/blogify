import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  MenuIcon,
  XIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import logo from '../../../images/BlogifyLogo.png';

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Create", href: "/create-post", current: false },
  { name: "Posts", href: "/posts", current: false },
  { name: "Register", href: "/register", current: false },
  { name: "Login", href: "/login", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PublicNavbar = () => {
  return (
    <Disclosure as="nav" className="bg-[#FFFFFF]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-[#221638] focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <img className="h-6" src={logo} alt={logo} />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-[#221638] hover:text-[#FE4A55]"
                          : "text-[#221638] hover:text-[#FE4A55]",
                        "px-3 py-2 rounded-md text-base font-nunito font-bold"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/login"
                    type="button"
                    className="font-nunito font-bold relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm rounded-md text-white bg-[#FE4A55] hover:bg-[#221638] focus:outline-none"
                  >
                    <LoginIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Login</span>
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Link
                    to="/create-post"
                    className="font-nunito font-bold relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm rounded-md text-white bg-[#221638] hover:bg-[#FE4A55] focus:outline-none"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Post</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-[#221638] hover:text-[#FE4A55]"
                      : "text-[#221638] hover:text-[#FE4A55]",
                    "block px-3 py-2 rounded-md text-base font-nunito font-bold"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;
