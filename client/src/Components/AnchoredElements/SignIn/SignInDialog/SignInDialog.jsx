import React, {useState, useEffect, useRef} from 'react';

const SignInDialog = ({isOpen, onSubmit, onClose}) => {
	const [isDialogOpen, setDialogOpen] = useState(isOpen);
	const [currentText, setCurrentText] = useState('');

	const dialogRef = useRef(null);

	useEffect(() => {
		setDialogOpen(isOpen);
	}, [isOpen])

	useEffect(() => {
		const dialogBox = dialogRef.current;

		if (dialogBox)
		{
			if (isDialogOpen) {
				dialogBox.showModal();
			}
			else
			{
				dialogBox.close();
			}
		}
	}, [isDialogOpen])



	const handleCloseButton = () => {
		if (onClose)
		{
			onClose();
		}
		setDialogOpen(false);
	}

	const submitHandler = (e) => {
		if (currentText)
		{
			e.preventDefault();
			onSubmit(currentText);
			setCurrentText('');
		}
	}

	return (
		<dialog ref={dialogRef} className="EmailDialog">
			<button onClick={handleCloseButton} className="CloseButton">
			X
			</button>
			<form onSubmit={submitHandler}>
				<label>Email </label>
				<input type="email"
				value = {currentText}
				onChange={(e) => {setCurrentText(e.target.value)}} 
				required />
				<button type="submit">Submit</button>
			</form>
		</dialog>
	);
}

export default SignInDialog;