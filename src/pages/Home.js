// import components
import PokeCard from '../components/PokeCard';
import Loading from '../components/Loading';

// import useState and useEffect hooks
import { useState, useEffect } from 'react'; 

// import axios library
import axios from 'axios'; 

// impot link from react router dom
import { Link } from 'react-router-dom';



const Home = () => {

    // set state hooks
    const [ pokemon, setPokemon ] = useState([]);
    const [ loading, setLoading  ] = useState(true);
    const [ error, setError ] = useState(undefined);

    // create regexp to match the last 1-3 digits of the URL followed by slash character, used in JSX return
    const regExp = /[0-9]{1,3}\/$/;


    // add useEffect hook and get data of 151 pokemon using axios get request
    // destructure data from response and pass into setPokemon to store in pokemon object and setLoading to false, catch any errors and setLoading to false, set timeout to 1500 milliseonds
    useEffect( () => {

            setTimeout( () => {
                axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then( (response) => {
                    const {data} = response;
                    setPokemon(data);
                    setLoading(false);
                })
                .catch(error => {
                    const { status, data } = error.response;
                    setError(`${status} ${data}`);
                    setLoading(false);
                });
            }, 1500); 

    // eslint-disable-next-line        
    }, []);
    

    // return JSX to populate homepage with pokemon cards, add loading component
    return (
        
        <div>
            <h3>Poke API</h3>
            <p className="lead">Check out our Top 151 Pokemon!</p>

            {/* if loading is true add Loading spinner component */}
            {loading && (
                <Loading />
            )}

            {/* If loading is false and error is false and pokemon results length equals zero, then display "There are no pokemons here" */}
            {!loading && !error && pokemon.results.length === 0 && (
                <p className="lead text-center">There are no pokemons here</p>
            )}

            {/* If loading is false and error is true, then display the error state */}
            {!loading && error && (
                <p className="lead text-center">{error}</p> 
            )}  



            {/* if loading is false and pokemon results array length is more than 0 then return div with populated cards*/}
            {!loading && pokemon.results.length > 0 && (   
                <div className="container-fluid text-center">
                    <div className="col" >

                        {/* map through pokemon.results array and return each pokemon(poke) object with its index*/}
                        {pokemon.results.map((poke, i) => (
                            // add PokeCard component with link to each pokemon's url page
                            <PokeCard key={i}>
                                {/* use our regExp expression to match last 3 digits of the url property of each poke object and set it to our url path (pokemon/{1-3 digits}) */}
                                <Link to={`pokemon/${pokemon.results[i].url.match(regExp)}`} className="link-underline-light link-secondary link-underline-opacity-0-hover">{poke.name}</Link>
                            </PokeCard>

                        ))}
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default Home;