import React from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { signoutSuccess } from '../redux/user/userSlice';

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
      </Link>
      <div className='flex gap-2 md:order-2'>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
