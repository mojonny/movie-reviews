import './index.css';
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
			<nav className="pb-24 bg-gray">
				<ul className="flex z-10 w-screen gap-x-10 border-4 rounded-b-xl border-pink text-md bg-purple shadow-lg text-white fixed px-5 items-center">
					<Link to="/" className="font-serif text-xl">
						The
						<br />
						Movie
						<br />
						Search
					</Link>
					<li>
						<Link
							to="/movies"
							className="bg-dark-green p-2 rounded-xl shadow-lg font-serif hover:bg-green hover:text-purple"
						>
							Movies
						</Link>
					</li>
					<li>
						{user ? (
							<button onClick={logout}>Logout User</button>
						) : (
							<Link
								to="/login"
								className="bg-dark-green p-2 rounded-xl shadow-lg font-serif hover:bg-green hover:text-purple"
							>
								Login
							</Link>
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
