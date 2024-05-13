import React, {useEffect, useState} from "react";

const ServerRequest = ({server_endpoint}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [serverStatus, setServerStatus] = useState('Down');
	const [serverResponse, setServerResponse] = useState(null);
	
	useEffect(() => {
		fetch({server_endpoint})
			.then((response) => {
				if (response.ok) {
					setServerStatus('Up');
					console.log('SERVER IS UP')
					return response.json();
				}
				else{
					setServerStatus('Down');
					return Promise.reject(response);
				}
			})
			.then((data) => {	console.log(data);
								setServerResponse(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoading(false);})
	}, [])
	

	if (isLoading)
	{
		return (
			<div>Loading Request From Server</div>
		);
	}

	if (serverResponse)
	{
		return (
			serverResponse
		);
	}

	return (
		<div>Server {serverStatus}</div>
	);
};

export default ServerRequest;