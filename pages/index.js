import firebase from "firebase";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [initial, setInitial] = useState(false);
  useEffect(() => {
    if (!initial) {
      var firebaseConfig = {
        apiKey: "apiKey",
        authDomain: "authDomain",
        projectId: "projectId",
        storageBucket: "storageBucket",
        messagingSenderId: "messagingSenderId",
        appId: "appId",
        measurementId: "measurementId",
      };
      firebase.initializeApp(firebaseConfig);
      setInitial(true);
    }
  }, []);
  const signOut = async () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        console.log("Error -> ", err);
      });
  };
  const signIn = async () => {
    const provider = new firebase.auth.SAMLAuthProvider(
      "saml.ggolfz-firebase-saml"
    );
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        setUser(res.additionalUserInfo.profile);
      })
      .catch((err) => {
        console.log("Error -> ", err);
      });
  };
  return (
    <div className="container">
      <div className="box">
        <h1>Firebase SSO Demo with SAML</h1>
        <div>{user ? "You already sign in." : "You are not sign in yet."}</div>
        <div>
          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <button onClick={signIn}>Sign in with GGolfz Company SAML</button>
          )}
        </div>
        {user ? (
          <div>
            <div>Email: {user.email}</div>
            <div>
              Fullname: {user.firstname} {user.lastname}
            </div>
            <div>Display Name: {user.displayname}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
