import axios from 'axios'
import {useEffect, useState} from 'react'


interface CatInterface {
      breeds: [],
      id: string,
      url: string,
      width: number,
      height: number
  }

interface FavouriteInterface {
    id: string;
    user_id: string;
    image_id: string;
    sub_id: null;
    created_at: string;
    image: {
        id: string;
        url: string;
    }
}


const headers = {
    headers: {
      'x-api-key' : 'fcb8f3d8-f2fb-4423-ac02-28e513b07514 '
    }
  }
  

export default function MainContent(): JSX.Element{
    const [cat, setCat] = useState<CatInterface>({breeds: [],
        id: '',
        url: '',
        width: 0,
        height: 0})
    const [toggle, setToggle] = useState<boolean>(false)
    const [favourites, setFavourites] = useState<FavouriteInterface[]>([])

    useEffect(() => {
    async function fetchCat(){
      const res = await axios.get('https://api.thecatapi.com/v1/images/search', headers)
      const data = await res.data
      setCat(data[0])
    }
    async function fetchFavourites(){
        const res = await axios.get('https://api.thecatapi.com/v1/favourites', headers)
        const data = await res.data
        setFavourites(data)
    }
    fetchCat()
    fetchFavourites()
    }, [toggle])

    function handleNewCat() {
        setToggle(!toggle)
    }

    async function handleFavourites(id:string){
        try{
            const res = await axios.post('https://api.thecatapi.com/v1/favourites', {image_id: id}, headers)
        }catch(e){
            console.log(e)
        }
        setToggle(!toggle)

    }
    console.log('this is data otuside', favourites)

    const shortFavourites = favourites.slice(Math.max(0, favourites.length-10)).reverse()
    return (
        <> 
            <h1 className = 'app-title'>Cat Time 🐱</h1>
            <div className= 'cat-container'>
                <div className = 'cat-favourites-container'>
                    <h2 className='favourites-title'>Favourites</h2><br/>
                    {shortFavourites.map((cat) => (
                        <div key={cat.id}>
                            <img className='favourite-cat-image' src={cat.image.url}></img>
                        </div>
                    ))}
                </div>
                <div className = 'cat-image-container'>
                    <img className = 'cat-image' src={cat.url}></img>
                    <div className ='button-container'>
                        <button className = 'cat-get-button' onClick={handleNewCat}>New Cat</button>
                        <button className = 'cat-favourite-button' onClick={() => handleFavourites(cat.id)}>🤍</button>
                    </div>
                </div>
            </div>
        </>
    )
}