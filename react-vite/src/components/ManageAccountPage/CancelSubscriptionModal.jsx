import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getSubscriptionByTier } from "../../redux/subscription";
import { updateUserSubscriptionById } from "../../redux/session";


function CancelSubscriptionModal({user}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    console.log(user.id)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSubscriptionByTier("free","annual" ))
        .then(subscriptionData => dispatch(updateUserSubscriptionById({userId: user.id, subscriptionId: subscriptionData[0].id})))
        closeModal()
        navigate("/manage-account/current/confirmation")
    }

    const handleViewPlans = (e) => {
        e.preventDefault()
        closeModal()
        navigate("/manage-account/current/subscription")


    }

    return (
        <div className="cancel-subscription-container">
            <form id="cancel-subscription-form" onSubmit={handleSubmit}>
            <h1>Would You Like To Switch To A Cheaper Plan?</h1>
            <button onClick={handleViewPlans}>View Plans</button>
            <p>By Canceling your subscription you will still have access to all features until expiration date</p>
            <p>After expiration date your plan will switched to a Free Tier Plan</p>
            <button type="submit">Cancel Subscription Plan</button>
            </form>
        </div>
    )
}

export default CancelSubscriptionModal;
