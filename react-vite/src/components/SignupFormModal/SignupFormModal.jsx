import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { getSubscriptionByTier } from "../../redux/subscription";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tier, setTier] = useState("");
  const [duration, setDuration] = useState("")

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const subscriptions = useSelector(state => state.subscription.tiers)

  useEffect(() => {
    dispatch(getSubscriptionByTier(tier,duration))
  }, [dispatch, tier, duration])

  const handleChange = (e) => {
    setTier(e.target.value)
    setDuration(e.target.name)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }


    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        subscription_id: subscriptions[0].id
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };


  return (

    <div className="signup-modal-container">
      <h1 id="signup-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form id="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div className="subscription-container">

          <h1>Select a subscription plan</h1>
          <div className="tier-wrapper">
            <h2>
              Free
            </h2>
            <p>Basic facial scanning with recommendations to accessories and 2 filters</p>
            <input
              id="free-input"
              type="radio"
              name="annual"
              value="free"
              checked={tier === 'free' && duration === 'annual'}
              onChange={handleChange}
            />
          </div>

          <div className="tier-wrapper">
            <h2>
              Standard
            </h2>
            <p>Includes All Standard Features</p>
            <p>*Additional Brands and Tutorials Available For Purchase</p>
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
        </div>
        <button type="submit">Sign Up</button>

      </form>
    </div>
  );
}

export default SignupFormModal;
