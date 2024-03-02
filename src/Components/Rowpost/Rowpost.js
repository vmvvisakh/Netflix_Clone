
import React,{useEffect,useState} from 'react'
import axios from '../../axios'
// import YouTube from 'react-youtube'
import { imageUrl,API_KEY } from '../../Constants/Constants'
import './Rowpost.css'

function Rowpost(props) {
  const [movies,setMovies] = useState([])
  const [urlId,seturld]=useState('')
          useEffect(() => {
              axios.get(props.url).then((Response)=>{
                  console.log(Response.data)
                  setMovies(Response.data.results)
               })//.catch(err=>{
              //   alert('Network Error')
              // })
          }, [])
          const opts = {
            height: '390',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
          
          const handleMovie=(id)=>{
            
            console.log(id)
            axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
                 
                  if(Response.data.results.length!==0){
                    seturld(Response.data.results[0])
                  }else{
                    console.log("Array Empty")
                  }

            })
          }
          
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)}  className={props.isSmall ? 'smallposter':"poster"} src={`${imageUrl+obj.backdrop_path}`} />
           )}
           
           </div>
           { urlId &&  < YouTube opts={opts} videoId={urlId.key} /> }
    </div>


  )
}

export default Rowpost
