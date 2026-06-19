function Login() {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="card-body">

          <h2 className="text-center mb-4">
            Login
          </h2>

          <form>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="d-flex justify-content-between mb-3">

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />

                <label
                  className="form-check-label"
                  htmlFor="rememberMe"
                >
                  Remember Me
                </label>
              </div>

              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-decoration-none">
              Register
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;