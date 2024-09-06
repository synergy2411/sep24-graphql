import LoginForm from "../../Components/Login";

function AuthPage() {
  const fetchCredHandler = ({ email, password }) => {
    console.log(email, password);
    //   write mutation for Sign In
  };

  return (
    <div className="container">
      <LoginForm fetchCredHandler={fetchCredHandler} />
    </div>
  );
}

export default AuthPage;
