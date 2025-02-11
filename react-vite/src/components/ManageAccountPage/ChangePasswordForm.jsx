import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { changePassword } from "../../redux/session";
import { NavLink } from "react-router-dom";
function ChangePasswordForm() {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setErrors({
              confirmPassword:
                "Confirm Password field must be the same as the Password field",
            });
          }
         const serverResponse = await dispatch(
              changePassword({
                id: user.id,
                password: currentPassword,
                newPassword: newPassword
              })
            );

            if(serverResponse) {
                setErrors(serverResponse);
            } else {
                console.log("success")
            }
    }

    return (
        <div className="change-password-container">
            <form id="change-password-form" onSubmit={handleSubmit}>
                <h1>Change Password</h1>
                <label>Current Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    />
                 {errors.currentPassword && <p>{errors.currentPassword}</p>}

                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    />
                {errors.newPassword && <p>{errors.newPassword}</p>}

                <label>Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type="submit">Submit</button>
                <NavLink to="/manage-account/current">Cancel</NavLink>


            </form>
        </div>
    )
}

export default ChangePasswordForm;
