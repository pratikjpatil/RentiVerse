import React, {useState} from "react";
import { Header, Sidebar } from "../../components";
import "./ProductPage.css";
import Image from "../../assets/Stickle.png";
import Image1 from "../../assets/Stickle1.png";

function ProductPage() {
  const [count, setCount] = useState(0);

const formSubmissionHandler = (e) => {
  e.preventDefault();
}

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="body-productpage">
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
              <img
                className="small-images-productpage image"
                src={Image1}
                alt="Sickle"
              />
              <img
                className="small-images-productpage image"
                src={Image1}
                alt="Sickle"
              />
              <img
                className="small-images-productpage image"
                src={Image1}
                alt="Sickle"
              />
            </div>
          </div>
        </div>
        <div className="right-box">
          <h3 className="owner-productpage">
            <span className="author">By </span> RAJ PATIL
          </h3>
          <button className="grey-button">250Rs/day</button>
          <p className="description-productpage">
            Description: <br /> It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout.
          </p>
          <form onSubmit={formSubmissionHandler}>
            <label className="label-productpage" htmlFor="till-date">
              Available Quantity:
            </label>
            <button className="grey-button">4</button>
            <label className="label-productpage" htmlFor="till-date">
              Till Date:
            </label>
            <input
              className="input-productpage-date"
              type="date"
              id="till-date"
              name="till-date"
              placeholder="DD/MM/YY"
            />
            <label className="label-productpage" htmlFor="message">
              Quantity:
            </label>
            <div class="input-group">
              <button class="btn-minus" onClick={handleDecrease}>-</button>
              <input type="text" class="input-number" value={count} />
              <button class="btn-plus" onClick={handleIncrease}>+</button>
            </div>
            <input
              className="submit-button-productpage"
              type="submit"
              value="Send Request"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
