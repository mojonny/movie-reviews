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
				<ul>
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
				<Route exact path="/" element={<MoviesList />} />
				<Route exact path="/movies" element={<MoviesList />} />
				<Route path="/movies/:id/review" element={<AddReview user={user} />} />
				<Route path="/movies/:id/" element={<Movie user={user} />} />
				<Route path="/login" element={<Login login={login} />} />
			</Routes>
		</div>
	);
}

export default App;
