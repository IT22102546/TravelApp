import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiShoppingBag, HiUser, HiMenu } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const imageStyle = {
    height: '100px',
    objectFit: 'cover',
  };

  return (
    <Navbar className="border-b-2 relative z-50 bg-green-500" >
      <div className="container mx-auto flex items-center justify-between py-4">

        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="self-center whitespace-nowrap text-3xl font-semibold font-tangerine text-white">
            <img
              src={""}
              alt="Logo"
              style={imageStyle}
            />
          </NavLink>
        </div>

        {/* Right Section: Navigation links and user controls */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-black" : "text-white"}>
              Home
            </NavLink>
           

            
            <NavLink to="/itinerary" className={({ isActive }) => isActive ? "text-black" : "text-white"}>
              Travel Itinerary
            </NavLink>

            

          </div>

          {/* User controls */}
          <div className="flex items-center space-x-4">
           

            {currentUser ? (
              <Dropdown arrowIcon={false} inline label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded className="h-10 w-10" />
              }>
                <DropdownHeader>
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                </DropdownHeader>
                <Link to={'/dashboard?tab=profile'}>
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <HiUser className="text-white" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Navbar.Toggle>
              <HiMenu className="text-white text-3xl" />
            </Navbar.Toggle>
          </div>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      <Navbar.Collapse>
        <div className="flex flex-col space-y-4 md:hidden">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-black" : "text-white"}>
            Home
          </NavLink>
            
          <NavLink to="/itinerary" className={({ isActive }) => isActive ? "text-black" : "text-white"}>
             Travel Itinerary
          </NavLink>
          
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
