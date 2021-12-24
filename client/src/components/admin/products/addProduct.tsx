import React, { useState, useRef } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

interface IModalState {
  open: boolean,
}

const AdminCreateProductC = (props: IModalState) => {

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const [, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

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

      await IndexAPI.post("/admin/products/create", formData, {
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={{    
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
            }}
          > 
            <Grid container sx={{            
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "45px",
              color: "#000"}}>
              <Grid sx={{width: "400px"}}>
                <div className="image">
                  <div className="big-image-div">
                    <img className="big-image" src={displayedImage} alt="item" />
                  </div>
                </div>
              </Grid>
              <Grid sx={{width: "500px"}}>
                <form
                  className="admin-form"
                  action="/admin/products/create"
                  method="POST"
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
                        <label className=" radio">2D art</label>
                        <input
                          value={type}
                          ref={typeInput}
                          onChange={() => setType("2D")}
                          type="radio"
                          name="product"
                        />
                      </Grid>
                      <Grid>
                        <label className=" radio">3D art</label>
                        <input
                          value={type}
                          ref={typeInput}
                          onChange={() => setType("3D")}
                          type="radio"
                          name="product"
                        />
                      </Grid>
                      <Grid>
                        <label className=" radio">Comic</label>
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
                      onChange={(e: any) => setImages(e.target.files[0])}
                      name="images"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
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
                          onClick={handleSubmit}
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
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminCreateProductC;
