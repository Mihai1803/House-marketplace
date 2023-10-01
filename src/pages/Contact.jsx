import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Contact() {
  const [message, setMessage] = useState('');
  const [landLord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const inlineStyle = {
    marginTop: '2rem',
  };

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
        const docRef = doc(db, 'users', params.landLordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setLandlord(docSnap.data()); 
        } else {
            toast.error('Could not get landlord data');
        }
    }
    getLandlord();
  }, [params.landLordId]);

  const onChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  
  return (
    <div className='pageContainer'>
        <header className='pageHeader'>
            Contat Landlord
        </header>
        {landLord !== null && (
            <main>
                <div className='contactLandlord'>
                    <p className='landlordName'>
                        Contact {landLord.name}
                    </p>
                </div>
                <form className='messageForm'>
                    <div className='messageDiv'>
                        <label htmlFor="message" className='messageLabel'>
                            Message
                        </label>
                        <textarea
                            name='message'
                            id='message'
                            className='textarea'
                            value={message}
                            onChange={onChange}
                        >
                        </textarea>
                        <a href={`mailto:${landLord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type='button' className='primaryButton' style={inlineStyle}>
                                Send Message
                            </button>
                        </a>
                    </div>
                </form>
            </main>
        )}
        
    </div>
  )
}

export default Contact