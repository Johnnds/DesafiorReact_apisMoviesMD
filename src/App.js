import React, { useState, useEffect } from 'react';
import './App.css';
import Descubrir from './Descubrir';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';


const API_Search = 'https://api.themoviedb.org/3/search/movie?api_key=fd3e3b49c9e6f23e1fe7bf95cfe08a89'


const App = () => {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=fd3e3b49c9e6f23e1fe7bf95cfe08a89');
      const discovery = await response.json();
      console.log(discovery);
      setMovies(discovery.results)
    }

    getMovies();
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=fd3e3b49c9e6f23e1fe7bf95cfe08a89&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch (e) {
      console.log(e);
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>

      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Mundo Pelis</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Buscar Pelicula"
                className="me-2"
                aria-label="search"
                name="query"
                value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className='container'>
        <div>
        <div><h2>PARA DESCUBRIR</h2></div>
          {movies.length > 0 ? (
            <div className="container">
              <div className="grid">
                {movies.map((movieReq) =>
                  <Descubrir  key={movieReq.id} {...movieReq} />)}
              </div>
            </div>
          ) : (
            <h2>Ha ocurrido un error :c </h2>
          )}
        </div>

      </main>
    </>
  );
}

export default App;

