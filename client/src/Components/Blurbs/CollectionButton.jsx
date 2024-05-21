import React, {useEffect, useState} from 'react';
import minus_icon from '../../assets/minus.png';
import plus_icon from '../../assets/plus.png';

const CollectionButton = ({id, data, team, setData}) => {
	const [inCollection, setInCollection] = useState(false);

	//console.log(`collection button : ${JSON.stringify(data)} and id = ${JSON.stringify(id)}`);

	// check for status
	useEffect (() => {
		if (data && Object.keys(data).length > 0)
		{
			if (team)
			{
				if (data['teams'].includes(id))
				{
					setInCollection(true);
				}
				else
				{
					setInCollection(false);
				}
			}
			else
			{
				if (data['players'].includes(id))
				{
					setInCollection(true);
				}
				else
				{
					setInCollection(false);
				}
			}
		}
	}, [id, data, team])

	const removeFromCollection = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (team)
		{
			fetch(`http://localhost:5000/users/remove/team/${id}/${data['_id']}`)
				.then((response) => {
					if (response.ok){
						return response.json();
					}
					else{
						return Promise.reject(response);
					}
				})
				.then((response) => {setData(response);})
				.catch((response) => {console.log('SERVER MAY BE DOWN');})
		}
		else
		{
			fetch(`http://localhost:5000/users/remove/player/${id}/${data['_id']}`)
				.then((response) => {
					if (response.ok){
						return response.json();
					}
					else{
						return Promise.reject(response);
					}
				})
				.then((response) => {setData(response);})
				.catch((response) => {console.log('SERVER MAY BE DOWN');})
		}
		
	}

	const addToCollection = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (team)
		{
			fetch(`http://localhost:5000/users/add/team/${id}/${data['_id']}`)
				.then((response) => {
					if (response.ok){
						return response.json();
					}
					else{
						return Promise.reject(response);
					}
				})
				.then((response) => {setData(response);})
				.catch((response) => {console.log('SERVER MAY BE DOWN');})
		}
		else
		{
			fetch(`http://localhost:5000/users/add/player/${id}/${data['_id']}`)
				.then((response) => {
					if (response.ok){
						return response.json();
					}
					else{
						return Promise.reject(response);
					}
				})
				.then((response) => {setData(response);})
				.catch((response) => {console.log('SERVER MAY BE DOWN');})
		}
	}

	//give button
	if (inCollection)
	{
		return(
			<button onClick={removeFromCollection}>
				<img
		    	src={minus_icon}
		    	width='20px'
		    	alt='remove'
		    	/>
			</button>
		);
	}

	return (
		<button onClick={addToCollection}>
			<img
	    	src={plus_icon}
	    	width='20px'
	    	alt='add'
	    	/>
		</button>
	);
}

export default CollectionButton;