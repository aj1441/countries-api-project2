import UserForm from '../customComponents/UserForm.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"

function SavedCountries() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
      };
    

    return (
       <> 
        <div>
             <Button className ="BackButton" onClick={handleBackClick}>Back</Button>
           </div>
        <div>
            <h1 className='SavedContriesTitle'>My Saved Countries</h1>
             {/* <main className="cardContainer">
                            {countries.map(country => (
                                <Card.Root className='cardRoot' key={country.cca3}>
                                    <Image
                                        src={country.flags.png}
                                        alt="Image of {country.name.common}"
                                    />
                                    <Card.Header className='cardHeader'>{country.name.common}</Card.Header>
                                    <Card.Body className='cardBody'>
                                        <ul>
                                            <li>Population: {country.population}</li>
                                            <li>Region: {country.region}</li>
                                            <li>Capital: {country.capital}</li>
                                        </ul>
            
                                    </Card.Body>
                                </Card.Root>
                            ))}
                        </main> */}
        </div>
        <UserForm />
        </>
    )
}
export default SavedCountries;