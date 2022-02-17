/**
 * This is a React function component without logic, it relies on the
 * callback functions and values provided by its presenter SignIn.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function SignInView({ handleSubmit, handleChange, result, goToSignUp }) {
    return (
        <div className="App">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange}></input>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                </div>
                <div>
                    <br />
                    <button>Sign in</button>
                </div>
            </form>
            <p>{result ? result : ''}</p>
            <div>
                <button onClick={goToSignUp}>Don't have an account? Sign up!</button>
            </div>
        </div>
    );
}

export default SignInView;
