import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Home( { user, onLogout } ) {

  function handleUserLogout(){
    fetch("/logout",{
      method: "DELETE"
    }).then(() => onLogout())
  }

  return(
    <>
      <h1>home page content</h1>
    { !user ?
      <> 
        <p>this is the page before the user logs into their account</p> 
          <Button as={Link} to="/login" >Login</Button>
          <br></br>
          <Button as={Link} to="signup" >Sign up</Button>
      </>
      :
      <>
        <p>this is the home page for {user.screenname} now that they are logged in</p>
        <Button onClick={handleUserLogout}>Logout</Button>
      </>
    } 
    </>
  );
}

export default Home;