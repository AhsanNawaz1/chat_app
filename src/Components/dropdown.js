import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Shared/Redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
  const user = useSelector((state) => state.root.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();



  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }



  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-white inline-flex w-full justify-center p-2 bg-[#EDB0A0] hover:bg-[#EDB0A0]-400 text-white font-medium	  border-b-4 border-[#F09A84] hover:border-[#EDBDB1] rounded">
          <div className=' text-white flex items-center' >
            <img src={user?.imgUrl} className="rounded-full	h-6	w-6 mr-2" />
            <span>{user?.name}</span>
          </div>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleLogout()}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  logout
                </a>
              )}
            </Menu.Item>

            {/* <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
