import React, {useState, useEffect, useContext} from "react";
import SignInDialog from './SignInDialog/SignInDialog';
import {SearchAndDataContext} from '../../FlowController';

const SignIn = () => {

	const [userEmail, setUserEmail] = useState(undefined);
	const [isSignedIn, setSignedIn] = useState(false);
	const [loadingUserData, setLoadingUser] = useState(true);

	const [dialogIsOpen, setDialogOpen] = useState(false);

	const dataContext = useContext(SearchAndDataContext);

	useEffect(() => {
		//server connect for user data
		if (isSignedIn)
		{
			fetch('http://localhost:5000/users/sign-in/' + userEmail)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					else{
						return Promise.reject(response);
					}
				})
				.then((data) => {
					//console.log(`from signing in: ${JSON.stringify(data)}`);
					dataContext.setUserData(data);
				})
				.catch((response) => {setSignedIn(false);
									console.log('SERVER MAY BE DOWN');})
				.finally(() => {setLoadingUser(false);})
		}
		else
		{
			setLoadingUser(true);
		}
	}, [isSignedIn])


	const handleSignInDialog = () => {
		setDialogOpen(true);
	};

	const handleEmailSubmit = (email) => {
		setUserEmail(email);
		setSignedIn(true);
		handleCloseDialog();
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleSignOut = () => {
		setUserEmail('');
		dataContext.setUserData(undefined);
		setSignedIn(false);
	}

	if (isSignedIn)
	{
		if (!loadingUserData)
		{
			if (dataContext.userData)
			{
				return (
					<div className="SignOut">
						<div>
						{userEmail}
						</div>
						<div>
							<button onClick={handleSignOut} className="SignOutButton">
							Sign Out 
							</button>
						</div>
					</div>
				);
			}
			else
			{
				console.log("SIGNING IN ERROR");
			}
			
		}
		else
		{
			console.log("LOADING SIGN IN");
		}
	}

	return (
		<div className="SignIn">
			<div>
				<button onClick={handleSignInDialog} className="DisplayButton">
				Sign In 
				</button>
			</div>

			<SignInDialog isOpen={dialogIsOpen} onSubmit={handleEmailSubmit} onClose={handleCloseDialog}/>
		</div>
	);
}

export default SignIn;