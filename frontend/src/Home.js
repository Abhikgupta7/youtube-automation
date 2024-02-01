import React, { useState } from 'react'
import Loader from './Loader';
import logo from './logo/logo4.png';

const Home = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [inputerror, setInputError] = useState('');
    const [loader, setLoader] = useState(false);

    const searchVideos = async () => {
        if (searchQuery == "") {
            setInputError("Input Field Empty")
            return;
        }
        setLoader(true)
        try {
            const response = await fetch(`${baseUrl}/search?query=${searchQuery}`);
            const data = await response.json();
            console.log(data);
            setVideos(data);
            setError('');
        } catch (error) {
            setVideos([]);
            setError(error);
        }
        setLoader(false)
    };
    return (
        <div className='home_container'>
            <div className='home_text'>
                <h1 className='animate fadeInDown two'>Welcome To The World Of YouTube</h1>
                <h6 className='animate fadeInDown two'>Automation/Web Scraping</h6>
                <div className='InputContainer animate fadeInUp one' >
                    <div>
                        {inputerror == "" ? null : <p style={{ fontSize: "12px" }}>Search field is empty</p>}

                        <input type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setInputError("")
                                setVideos([])
                                setSearchQuery(e.target.value)
                            }}
                            style={inputerror == "" ? { borderColor: "" } : { borderColor: "red" }}
                            className='input_field'
                            placeholder='Search'
                        />
                    </div>

                    <span style={inputerror == "" ? { marginTop: "" } : { marginTop: "5vh" }} className="material-symbols-outlined" onClick={searchVideos}>
                        search
                    </span>
                </div>
                <h3 className='animate fadeIn three'>Perform <span style={{ color: "red" }}>Automation</span> and <span style={{ color: "red" }}>Web Scraping
                </span> on Youtube</h3>
            </div>
            {
                loader ? < div className='home_image loader'>
                    <Loader />
                </div> : null
            }

            {
                videos.length === 0 && error === "" && !loader ? < div className='home_image animate fadeInRight four'>
                    <img src={logo} alt="Logo" width="500" height="500"></img>
                </div> : null
            }
            {error === "" ? null : <div className='home_data animate fadeIn one'>
                <h2 style={{ display: "flex", marginTop: "30vh", color: "white" }}>Network Error Has Occured Please Search Again</h2>
            </div>}


            {
                videos.length > 0 && (
                    <div className='home_data'>
                        <span style={{ color: "white", fontSize: "2vw" }}>Top Youtube Videos Data Fetched</span>
                        <table className="customers">
                            <tr>
                                <th>Video Title</th>
                                <th>Link</th>
                            </tr>
                            {videos.map((video, index) => (
                                <tr key={index}>
                                    <td>{video.title}</td>
                                    <td>
                                        <a className='links' href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                                            {video.videoUrl}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </table>

                    </div>
                )
            }

        </div >
    )
}

export default Home