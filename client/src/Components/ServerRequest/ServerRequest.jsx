import React, {useEffect, useState} from "react";

const ServerRequest = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [serverStatus, setServerStatus] = useState('Down');
	
	useEffect(() => {
		fetch("http://localhost:5000/")
			.then((response) => {
				if (response.ok) {
					setServerStatus('Up');
					console.log('SERVER IS UP')
					return response.text();
				}
				else{
					setServerStatus('Down');
					return Promise.reject(response);
				}
			})
			.then((data) => {console.log(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoading(false);})
	}, [])
	

	if (isLoading)
	{
		return (
			<div>Loading Request From Server</div>
		)
	}

	return (
		<div>Server {serverStatus}</div>
	)
};

export default ServerRequest;