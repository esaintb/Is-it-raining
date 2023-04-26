import { useEffect, useState } from 'react'
import axios from 'axios'
import animalLobbyBackgroundImage from '../assets/backgroundImages/8_png_by_cleopatrawolf_dfuq867.png'
import { CgProfile } from 'react-icons/cg'
import { IconContext } from 'react-icons'
import "../styles/profile-icon.css"
import "../styles/animalLobby.css"
import { Link } from 'react-router-dom'


export default function AnimalLobby({ handleLogout, token, username }) {
    const [animalList, setAnimalList] = useState(0)
    const [animalId, setAnimalId] = useState('')

    console.log(username.username)
    
    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/my-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            console.log(response)
            console.log(response.data)
            console.log(response.data.random_image)
            setAnimalList(response.data.random_image)
            setAnimalId(response.data.animal)
        })

        // setAnimalId(animalList.animal.name)
    }, [])

    console.log(animalList)
    console.log(animalId)

    function deleteAnimal(animalId) {
        console.log(animalId)
        axios.delete(`https://is-it-raining.herokuapp.com/captured/${animalId}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(() => setAnimalList((animalList) => animalList.filter((animal) => animal.id !== animalId)))
    }


    return (
        <>
            <div>
                <IconContext.Provider value={{ style: { fontSize: '75px', color: "black" } }}>
                    <div className='profile-icon'>
                        <CgProfile />
                    </div>
                </IconContext.Provider>

                <h2>{username}'s Animal Lobby</h2>

                <div className='animal-display'>
                {animalList && animalList.map((animal) => (
                    <div key={animal.id}>
                        <img src={animal.random_image} alt={animal.name} />
                        <button onClick={() => deleteAnimal(animal.id)}>Delete</button>
                    </div>
                ))}
                </div>

                <div className='lobby-background-image'>
                    <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
                </div>

                <div className='button-container'>
                    <Link to='/'>
                        <button className='back-to-weather'>Back to Weather!</button>
                    </Link>
                </div>

            <div className='lobby-background-image'>
                <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
            </div>


            <div className='logout'>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
        </>
    )
}