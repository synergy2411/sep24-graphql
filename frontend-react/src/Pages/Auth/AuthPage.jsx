import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import LoginForm from "../../Components/Login";
import USER_LOGIN from "../../Apollo/userLogin";

function AuthPage() {
  const [onUserLogin] = useMutation(USER_LOGIN);
  const navigate = useNavigate();

  const fetchCredHandler = async ({ email, password }) => {
    const { data } = await onUserLogin({
      variables: {
        email,
        password,
      },
    });

    localStorage.setItem("token", data.signIn.token);
    navigate("/posts");
  };

  return (
    <div className="container">
      <LoginForm fetchCredHandler={fetchCredHandler} />
    </div>
  );
}

export default AuthPage;
