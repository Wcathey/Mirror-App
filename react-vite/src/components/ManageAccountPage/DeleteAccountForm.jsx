import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { verifyPassword } from "../../redux/verification";
import { deleteUserAccount } from "../../redux/session";
import { useNavigate } from "react-router-dom";
function DeleteAccountForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verified, setVerified] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [errors, setErrors] = useState({});

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setErrors({
              confirmPassword:
                "Confirm Password field must be the same as the Password field",
            });
          }

          const serverResponse = await dispatch(
                        verifyPassword({
                          id: user.id,
                          password: password

                        })
                      );

                      if(serverResponse) {
                          setErrors(serverResponse);
                      } else {
                          setVerified(true)
                      }
    }

    const handleOptionSave = (e) => {
        e.preventDefault();
        closeModal()



    }

    const handleOptionDelete = (e) => {
        e.preventDefault()
        setDeleteAccount(true)
    }

    const handleDeleteAccount = (e) => {
        e.preventDefault()
        dispatch(deleteUserAccount({verified: verified, id: user.id}))
        closeModal()
        navigate("/manage-account/current/confirmation")


    }

    return (
        user &&
        <div className="delete-account-container">
            <form id="delete-account-form" onSubmit={handleSubmit}>
                <h1>Are you sure you want to delete your account?</h1>
                <p>This can not be undone and all data and saved features will be deleted</p>
                {deleteAccount && !verified &&
                <div id="verify-delete">
                    <p>Please enter your password details</p>
                    <label>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    {errors.password && <p>{errors.password}</p>}

                    <label>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    <button type="submit">Verify Credentials</button>
                </div>
                }
                 {verified &&
                    <div id="verified-wrapped">
                        <p>Your credentials have been verifed</p>
                        <p>You can still cancel account deletion by selecting cancel</p>

                        <button onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                    }
                <div id="delete-confirmation-btns">
                    {!deleteAccount &&
                    <button onClick={handleOptionDelete}>Yes, Delete Account</button>
                    }
                    <button onClick={handleOptionSave}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteAccountForm;
