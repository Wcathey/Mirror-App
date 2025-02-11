import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './ManageAccountPage.css'
function ConfirmationPage() {
    const user = useSelector(state => state.session.user);

    return (

        <div className="confirmation-container">
            {user ?
                <div id="active">
                    <h1>Thank You!</h1>
                    <h2>Your Subscription has been updated!</h2>
                    <div id="cta-confirmation-page">
                        <NavLink to="/mirror">Take A Look In The Mirror</NavLink>
                    </div>
                </div>
                :
                <div id="inactive">
                    <h1>Account Successfully Deleted</h1>
                    <p>Feel Free to Come Back and Build A New Mirror</p>
                    <p>We Wish You The Best On Your New Journey</p>
                    <NavLink to="/">Return Home</NavLink>
                </div>
            }

        </div>



    )
}

export default ConfirmationPage;
