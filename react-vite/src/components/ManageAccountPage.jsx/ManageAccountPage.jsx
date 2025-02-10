import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import { getCurrentUserSubscription } from "../../redux/subscription";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import "./ManageAccountPage.css"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteAccountForm from "./DeleteAccountForm";
import { clearVerificationStatus } from "../../redux/verification";
function ManageAccountPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ulRef = useRef()
    const [showMenu, setShowMenu] = useState(false);


    const user = useSelector(state => state.session.user)
    const subscriptionData = useSelector(state => state.subscription)


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

    useEffect(() => {
        dispatch(getCurrentUserSubscription(user.subscription_id))
    }, [dispatch, user.subscription_id])

    const closeMenu = () => setShowMenu(false);

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate(`/manage-account/current/subscription`)

    }

    const handleChange = (e) => {
        e.preventDefault();
        navigate('/manage-account/current/change-password')
    }

    const handleModalClose = () => {
        dispatch(clearVerificationStatus())
    }
    if (user && subscriptionData) {
        return (
            <div className="manage-account-container">
                <h1 id="manage-headline">Manage Account</h1>

                <div className="edit-user-cred-wrapper">
                    <h1>User Details</h1>
                    <h3>Username: <span>{user.username}</span></h3>
                    <h3>Email: <span> {user.email}</span></h3>
                </div>

                <div className="edit-subscription-wrapper">
                    <h1>Subscription</h1>
                    <h2>Current Plan</h2>
                    <h3>Tier: <span>{subscriptionData.tier}</span></h3>
                    {subscriptionData.tier !== 'free' &&
                        <div id="paid-tier-wrapper">
                            <p>Price: <span>${subscriptionData.price}</span></p>
                            <p>Duration: <span>{subscriptionData.duration}</span></p>
                        </div>
                    }

                </div>

                    <div className="account-settings-wrapper">
                        <h1>Settings</h1>
                        <div id="account-sub-btns">
                            <p className="manage-btn" onClick={handleRedirect}>Upgrade Subscription</p>
                        {subscriptionData.tier !== 'free' &&
                        <OpenModalMenuItem
                            modalComponent={<CancelSubscriptionModal user={user}/>}
                            itemText={"Cancel Subscription"}
                            onItemClick={closeMenu}
                        />
                        }
                    </div>
                        <div className="edit-password-wrapper">
                        <button className="manage-btn" onClick={handleChange}>Change Password</button>
                    </div>
                        <OpenModalMenuItem
                            modalComponent={<DeleteAccountForm/>}
                            itemText={'Delete Account'}
                            onItemClick={closeMenu}
                            onModalClose={handleModalClose}
                        />
                    </div>
            </div>
        )
    }
    else {
        return (
            <div className="no-access">
                <p>No Account found</p>
                <NavLink to="/">Return Home</NavLink>
            </div>
        )
    }
}

export default ManageAccountPage;
