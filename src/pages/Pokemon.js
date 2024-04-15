// import useState and useEffect hooks
import { useState, useEffect } from 'react';

// import useParams and Link from react router dom
import { useParams, Link } from 'react-router-dom';

// import axios library
import axios from 'axios';

// import loading component
import Loading from '../components/Loading';



const Pokemon = () => {

    // Use destructing assignment
    const { pokemonNum } = useParams();

    // Setup states
    const [pokemon, setPokemon] = useState(undefined);
    const  [loading, setLoading] = useState(true);
    const [ error, setError ] = useState(undefined);

    // add useEffect hook and use axios to get data from url that matches pokemonNum path, catch any errors and setLoading to false, set timeout to 1500 milliseonds 
    useEffect( () => {
        
        setTimeout( () => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`)
            .then((response) => {
                const { data } = response;
                setPokemon(data);
                setLoading(false);
            })
            .catch( (error) => {
                const { status, data } = error.response;
                setError(`${status} ${data}`);
                setLoading(false);
             })
        }, 1500);

    // eslint-disable-next-line    
    }, []);




    // return JSX
    return(
        <div>
            {/* if loading is true return loading component */}
            {loading && (
                <Loading />
            )}


            {/* If loading is false, and error is true, then display the error */}
            {!loading && error && (
                <div className="text-center">
                    <p className="lead">Pokemon not found</p>
                </div>
            )}

            {/* if loading is false and pokemon is true, return table with pokemon's picture/name and stats/values */}
            {!loading && pokemon &&  (   
            <table className="table table-striped table-sm container text-center">          
                    <thead>
                        <tr>
                            <th>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} width="200"/>
                            </th>
                            
                            <th>
                            <h3 className="text-capitalize mb-5">{pokemon.name}</h3>
                            </th>
                        </tr>
                        
                        <tr >
                            <th>Stats</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pokemon.stats[0].stat.name}</td>
                            <td>{pokemon.stats[0].base_stat}</td>
                        </tr>
                        <tr>
                            <td>{pokemon.stats[1].stat.name}</td>
                            <td>{pokemon.stats[1].base_stat}</td>
                        </tr>
                        <tr>
                            <td>{pokemon.stats[2].stat.name}</td>
                            <td>{pokemon.stats[2].base_stat}</td>
                        </tr>
                        <tr>
                            <td>{pokemon.stats[3].stat.name}</td>
                            <td>{pokemon.stats[3].base_stat}</td>
                        </tr>
                        <tr>
                            <td>{pokemon.stats[4].stat.name}</td>
                            <td>{pokemon.stats[4].base_stat}</td>
                        </tr>
                        <tr>
                            <td>{pokemon.stats[5].stat.name}</td>
                            <td>{pokemon.stats[5].base_stat}</td>
                        </tr>
                    </tbody>
             </table>
            ) } 
            {/* Add button with link to go back to home page */}
            <Link to="/" className="btn btn-primary mt-3 mb-5">Go Back</Link>
        </div>
    );
}

export default Pokemon;