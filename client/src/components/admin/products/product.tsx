import React, { useEffect, FC, useState, useRef } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../apis/indexAPI";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";
import { IProduct } from "../../../interfaces";
import { Grid } from "@mui/material";

const AdminProductC: FC = () => {
  const { product, id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [, setImages] = useState(null);
  const [qty, setQty] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const [, setSelectedProduct] = useState<IProduct[]>([]);
  const [imageBuffer, setImageBuffer] = useState("");

  const titleInput = useRef(null);
  const typeInput = useRef(null);
  const qtyInput = useRef(null);
  const priceInput = useRef(null);
  const infoInput = useRef(null);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const productResponse = await IndexAPI.get(
          `/admin/products/${product}/${id}`
        );

        if (productResponse.data.data.product.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${productResponse.data.data.product.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(productResponse.data.data.item)
        setTitle(productResponse.data.data.item.title);
        setPrice(productResponse.data.data.item.price);
        setQty(productResponse.data.data.item.qty);
        setInfo(productResponse.data.data.item.info);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateProduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("product", type);
      // formData.append("images", images);
      formData.append("quantity", qty);
      formData.append("price", price);
      formData.append("info", info);

      await IndexAPI.put(`/admin/products/update/${id}`, formData, {
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

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await CollectionAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

    // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <Grid className="main-body item-details">
        <Grid className="item-images">
          <Grid className="image-div">
            <Grid className="big-image-div">
              <img className="big-image" src={imageBuffer} alt="main" />
            </Grid>
          </Grid>
        </Grid>
        <form
          className="admin-form"
          action="/admin/products/update/:id"
          method="PUT"
          encType="multipart/form-data"
        >
          <Grid className="admin-form-title">
            <h2 className="align-center">Create</h2>
          </Grid>
          <Grid className="admin-form-field">
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
          </Grid>
          <Grid className="admin-form-field">
            <Grid>
              <label className="admin-label">Type:</label>
            </Grid>
            <Grid className="radio-div">
              <Grid>
                <label className=" radio">print</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("print")}
                  type="radio"
                  name="product"
                />
              </Grid>
              <Grid>
                <label className=" radio">model</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("model")}
                  type="radio"
                  name="product"
                />
              </Grid>
              <Grid>
                <label className=" radio">painting</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("painting")}
                  type="radio"
                  name="product"
                  required
                />
              </Grid>
              <Grid>
                <label className=" radio">sculpture</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("sculpture")}
                  type="radio"
                  name="product"
                  required
                />
              </Grid>
              <Grid>
                <label className=" radio">book</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("book")}
                  type="radio"
                  name="product"
                  required
                />
              </Grid>
              <Grid>
                <label className=" radio">comic</label>
                <input
                  value={type}
                  ref={typeInput}
                  onChange={() => setType("comic")}
                  type="radio"
                  name="product"
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Images:</label>
            <input
              type="file"
              // ref={imageInput}
              onChange={(e: any) => setImages(e.target.files[0])}
              name="images"
              className="form-control file-input"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Quantity:</label>
            <input
              value={qty}
              ref={qtyInput}
              onChange={(e) => setQty(e.target.value)}
              type="number"
              name="quantity"
              className="form-control"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
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
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Info:</label>
            <textarea
              value={info}
              ref={infoInput}
              onChange={(e) => setInfo(e.target.value)}
              name="message"
              rows={5}
              required
            ></textarea>
          </Grid>
          <Grid className="admin-form-button">
            <Grid className="text-center">
              <Grid>
                <button
                  onClick={updateProduct}
                  type="submit"
                  className="btn form-button"
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <FooterC />
    </div>
  );
};

export default AdminProductC;
