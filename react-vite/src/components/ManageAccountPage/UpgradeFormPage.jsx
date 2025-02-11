import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUserSubscription, getSubscriptionByTier} from "../../redux/subscription";
import { updateUserSubscriptionById } from "../../redux/session";

function UpgradeFormPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tier, setTier] = useState("");
    const [duration, setDuration] = useState("")
    const [subscriptionId, setSubscriptionId] = useState("")
    const user = useSelector(state => state.session.user)
    const subscriptionData = useSelector(state => state.subscription)
    console.log(subscriptionData)

    useEffect(() => {
        dispatch(getCurrentUserSubscription(user.subscription_id))
        if(tier && duration) {
         dispatch(getSubscriptionByTier(tier, duration)).then(res => {
          setSubscriptionId(res[0].id)
         })
        }
    }, [dispatch, tier, duration, user.subscription_id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user) {
            dispatch(updateUserSubscriptionById({userId: user.id, subscriptionId: subscriptionId}))
            .then(navigate("/manage-account/current/confirmation"))

          }
        }


    const handleChange = (e) => {
        setTier(e.target.value)
        setDuration(e.target.name)
      }

    return (
        <div className="upgrade-form-container">
            <h1 id="upgrade-headline">Upgrade Subscription</h1>
        <form id="upgrade-form" onSubmit={handleSubmit}>
          <div className="tier-wrapper">
            <h2>
              Standard
            </h2>
            <p>Includes All Standard Features</p>
            <p>*Additional Brands and Tutorials Available For Purchase</p>
            <p></p>
           <div className="duration-wrapper">
            <label>$4.99 a Month</label>
           <input

              type="radio"
              name="monthly"
              value="standard"
              checked={duration === 'monthly' && tier === 'standard'}
              onChange={handleChange}
            />
            <label>$49.99 a year</label>
             <input
              type="radio"
              name="annual"
              value="standard"
              checked={duration === 'annual' && tier === 'standard'}
              onChange={handleChange}
            />
            </div>
          </div>
          <div className="tier-wrapper">
            <h2>
              Premium
            </h2>
            <p>Includes All Standard Features</p>
            <p>+ Access to all brands and tutorials</p>
        <div className="duration-wrapper">
          <label>$9.99 a month</label>
            <input
              type="radio"
              name="monthly"
              value="premium"
              checked={duration === 'monthly' && tier === 'premium'}
              onChange={handleChange}
            />
            <label>$99.99 a year</label>
            <input
              type="radio"
              name="annual"
              value="premium"
              checked={duration === 'annual' && tier === 'premium'}
              onChange={handleChange}
            />
            </div>
          </div>
          <button id="upgrade-btn" type={"submit"}>Upgrade</button>
          </form>
        </div>






      )


}

export default UpgradeFormPage;
