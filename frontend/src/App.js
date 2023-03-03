import './App.css';
import AddReview from './components/addReview';
import MoviesList from './components/moviesList';
import Movie from './components/movie';
import Login from './components/login';
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
	const [user, setUser] = useState(null);

	async function login(user = null) {
		setUser(user);
	}

	async function logout() {
		setUser(null);
	}
	return (
		<div className="App">
			<nav>
				<ul
					style={{
						display: 'flex',
						gap: '50px',
						listStyleType: 'none',
					}}
				>
					<li>
						<Link to="/movies">Movies</Link>
					</li>
					<li>
						{user ? (
							<button onClick={logout}>Logout User</button>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<MoviesList user={user} />} />
				<Route path="/movies">
					<Route index element={<MoviesList user={user} />} />
					<Route path=":id/" element={<Movie user={user} />} />

					<Route path=":id/review" element={<AddReview user={user} />} />
				</Route>
				<Route path="/login" element={<Login login={login} />} />
			</Routes>
		</div>
	);
}

export default App;
