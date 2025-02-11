import { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiMenuBurger } from "react-icons/ci";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>

        <div id="menu-dropdown"><CiMenuBurger onClick={toggleMenu}/></div>

      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>

          {user ? (
            <div id="user-logged-in">

              <li><p>Username:</p> <span>{user.username}</span></li>
              <li><p>Email:</p>  <span>{user.email}</span></li>
              <li>
                <NavLink to="/manage-account/current" onClick={closeMenu}>Manage Account</NavLink>
              </li>
              <li>
                <button id="log-out-btn"onClick={logout}>Log Out</button>
              </li>
              </div>
          ) : (

            <div className="user-cred-options">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
