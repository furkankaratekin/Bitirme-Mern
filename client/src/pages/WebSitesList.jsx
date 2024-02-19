import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebsitesList = () => {
    const [websites, setWebsites] = useState([]);
    const [displayWebsites, setDisplayWebsites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/websites');
                setWebsites(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchWebsites();
    }, []);

    // Function to perform the search and filter operation
    const filterWebsites = () => {
        const filtered = websites.filter(website =>
            website.kısa_link.toLowerCase().includes(searchTerm.toLowerCase()) ||
            website.uzun_link.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 6); // Keep only the first 6 results

        setDisplayWebsites(filtered);
    };

    // Call the filter function when the button is clicked or enter is pressed
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        filterWebsites();
    };

    return (
        <div>
            <h2>Websites List</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter URL..."
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {displayWebsites.map(website => (
                    <li key={website.id}>
                        <img src={website.img_logo} alt={`${website.ana_baslik} logo`} />
                        <a href={website.uzun_link} target="_blank" rel="noopener noreferrer">
                            {website.ana_baslik}
                        </a>
                        <p>Short URL: {website.kısa_link}</p>
                        <p>Long URL: {website.uzun_link}</p>
                        <p>Baslik: {website.ana_baslik}</p>
                        <p>Aciklama: {website.uzun_aciklama}</p>
                        <p>Meta Etiketleri: {website.meta_etiketleri}</p>

                        {/* Display other content as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebsitesList;
