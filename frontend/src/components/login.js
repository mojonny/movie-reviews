import React, { useState } from 'react';

export default function Login(props) {
	const [name, setName] = useState('');
	const [id, setId] = useState('');

	const onChangeName = (e) => {
		const name = e.target.value;
		setName(name);
	};

	const onChangeId = (e) => {
		const id = e.target.value;
		setId(id);
	};

	const login = () => {
		props.login({ name: name, id: id });
		props.history.push('/');
	};
	return (
		<div>
			<div>
				<label>Username </label>
				<input
					type="text"
					placeholder="Enter username"
					value={name}
					onChange={onChangeName}
				/>
			</div>
			<div>
				<label>User ID </label>
				<input
					type="text"
					placeholder="Enter id"
					value={id}
					onChange={onChangeId}
				/>
			</div>
			<button onClick={login}>Log me in!</button>
		</div>
	);
}
