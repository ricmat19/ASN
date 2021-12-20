import React, { useState, useRef, FC } from "react";
import CollectionAPI from "../../apis/storeAPI";
import AdminHeaderC from "./header";
import FooterC from "../standard/footer";

const AdminCreateC: FC = () => {

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const titleInput = useRef(null);
  const typeInput = useRef(null);
  const quantityInput = useRef(null);
  const priceInput = useRef(null);
  const infoInput = useRef(null);

  //insures that the .env file is only run in a development environment and not a production environment
  if (process.env.NODE_ENV !== "production") {
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require("dotenv").config();
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("product", type);
      // formData.append("images", images);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("info", info);

      await CollectionAPI.post("/admin/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // createItem(response);

      // titleInput.current.value = "";
      // typeInput.current.value = "";
      // quantityInput.current.value = "";
      // priceInput.current.value = "";
      // infoInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage = "../../images/loading.svg";
  if (images !== null) {
    // displayedImage = URL.createObjectURL(images);
  }

  return (
    <div>
      {console.log(images)}
      <AdminHeaderC />
      <div className="main-body">
        <div className="center">
          <h1>admin</h1>
        </div>
        <div className="admin-item-div">
          <div className="admin-image-div">
            <div className="image">
              <div className="big-image-div">
                <img className="big-image" src={displayedImage} alt="item" />
              </div>
            </div>
          </div>
          <form
            className="admin-form"
            action="/admin/create"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="admin-form-title">
              <h1>Create</h1>
            </div>
            <div className="admin-form-field">
              <label className="admin-label">Title:</label>
              <input
                value={title}
                ref={titleInput}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="name"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <div>
                <label className="admin-label">Type:</label>
              </div>
              <div className="radio-div">
                <div>
                  <label className=" radio">2D art</label>
                  <input
                    value={type}
                    ref={typeInput}
                    onChange={() => setType("2D")}
                    type="radio"
                    name="product"
                  />
                </div>
                <div>
                  <label className=" radio">3D art</label>
                  <input
                    value={type}
                    ref={typeInput}
                    onChange={() => setType("3D")}
                    type="radio"
                    name="product"
                  />
                </div>
                <div>
                  <label className=" radio">Comic</label>
                  <input
                    value={type}
                    ref={typeInput}
                    onChange={() => setType("comic")}
                    type="radio"
                    name="product"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="admin-form-field">
              <label className="admin-label">Images:</label>
              <input
                type="file"
                onChange={(e: any) => setImages(e.target.files[0])}
                name="images"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-label">Quantity:</label>
              <input
                value={quantity}
                ref={quantityInput}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                name="quantity"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-label">Price:</label>
              <input
                value={price}
                ref={priceInput}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-label">Info:</label>
              <textarea
                value={info}
                ref={infoInput}
                onChange={(e) => setInfo(e.target.value)}
                name="message"
                rows={5}
                required
              ></textarea>
            </div>
            <div className="admin-form-button">
              <div></div>
              <div className="text-center">
                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn form-button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminCreateC;
