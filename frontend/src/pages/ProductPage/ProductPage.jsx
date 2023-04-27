import React from 'react';
import { Header, Sidebar } from '../../components';
import './ProductPage.css';
import Image from '../../assets/Stickle.png';
import Image1 from '../../assets/Stickle1.png';

function ProductPage() {
  return (
    <div className='body-productpage'>
    <Header />
    <Sidebar />
      <React.Fragment className="header-productpage">
        <div className="container-productpage">
          <h1 className="title-productpage">Renting Request</h1>
        </div>
      </React.Fragment>
      <div className="container-productpage" id="white-box">
        <div className="left-box">
          <h2 className="heading-productpage">Sickle</h2>
          <div className="gallery-productpage">
            <img className="big-image image" src={Image} alt="Sickle" />
            <div className="small-images">
              <img className='small-images-productpage image' src={Image1} alt="Sickle" />
              <img className='small-images-productpage image' src={Image1} alt="Sickle" />
              <img className='small-images-productpage image' src={Image1} alt="Sickle" />
            </div>
          </div>
        </div>
        <div className="right-box">
          <h3 className='owner-productpage'><span className="author">By </span> RAJ PATIL</h3>
          <button className="grey-button">250Rs/day</button>
          <p className="description-productpage">Description: <br/> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          <form>
            <label className="label-productpage" htmlFor="till-date">Till Date:</label>
            <input className="input-productpage-date" type="date" id="till-date" name="till-date" placeholder="DD/MM/YY" />
            <label className="label-productpage" htmlFor="message">Message:</label>
            <textarea className="textarea-productpage" id="message" name="message"></textarea>
            <input className="submit-button-productpage" type="submit" value="Send Request" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
