import { useRef } from "react";

function LoginForm({ fetchCredHandler }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    fetchCredHandler({
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });
  };

  const resetClickHandler = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center">Login Form</h1>
            <form onSubmit={submitHandler}>
              {/* email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=""
                  ref={emailInputRef}
                />
                <label htmlFor="email">Email:</label>
              </div>

              {/* password */}

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder=""
                  ref={passwordInputRef}
                />
                <label htmlFor="password">Password:</label>
              </div>

              {/* button */}
              <div className="row">
                <div className="col-6">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-grid">
                    <button
                      className="btn btn-secondary"
                      onClick={resetClickHandler}
                      type="reset"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
