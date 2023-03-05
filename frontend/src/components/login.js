import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
	const [name, setName] = useState('');
	const [id, setId] = useState('');

	const navigate = useNavigate();

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
		navigate('/');
	};
	return (
		<div className="bg-pink p-5 pt-32 min-w-full min-h-screen fixed">
			<div className="flex-col bg-dark-green p-5 w-80 rounded-xl shadow-xl mx-auto">
				<div>
					<label className="font-bold p-5">Username </label>
					<input
						type="text"
						className="bg-pink p-5 m-2 rounded-md text-purple placeholder:text-white"
						placeholder="Enter username"
						value={name}
						onChange={onChangeName}
					/>
				</div>
				<div>
					<label className="font-bold p-5">User ID </label>
					<input
						className="bg-pink p-5 m-2 rounded-md text-purple placeholder:text-white"
						type="text"
						placeholder="Enter id"
						value={id}
						onChange={onChangeId}
					/>
				</div>
				<button
					className="mt-2 rounded-md py-3 px-5 w-full text-md text-purple bg-pink font-semibold shadow-lg hover:bg-purple hover:text-white "
					onClick={login}
				>
					Log me in!
				</button>
			</div>
		</div>
	);
}
