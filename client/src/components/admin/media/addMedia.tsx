import React, { useState, useRef } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

interface IModalState {
  open: boolean,
  handleClose: () => void
}

const AdminCreateMediaC = (props: IModalState) => {

  const [title, setTitle] = useState<string>("");
  const [media, setMedia] = useState<string>("");
  const [images, setImages] = useState<File>();
  const [info, setInfo] = useState<string>("");

  const titleInput = useRef(null);
  const typeInput = useRef(null);
  const infoInput = useRef(null);

  //insures that the .env file is only run in a development environment and not a production environment
  if (process.env.NODE_ENV !== "production") {
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require("dotenv").config();
  }

  const createMedia = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if(images){
        let formData = new FormData();

        formData.append("title", title);
        formData.append("media", media);
        formData.append("images", images);
        formData.append("info", info);

        await IndexAPI.post("/admin/media/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      }

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

  let displayedImage = "";
  if (images !== undefined) {
    displayedImage = URL.createObjectURL(images);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
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
              color: "#000"}}>
              <Grid sx={{padding: "0 15px 0 0"}}>
                <div className="image">
                  <div className="big-image-div">
                    <img className="big-image" src={displayedImage} />
                  </div>
                </div>
              </Grid>
              <Grid sx={{width: "500px", padding: "0 0 0 15px", borderLeft: "1px #000 solid"}}>
                <form
                  className="admin-form"
                  action="/admin/media/create"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <Grid className="admin-form-title">
                    <h1 className="align-center">Create</h1>
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
                        <label className=" radio">blog</label>
                        <input
                          value={media}
                          ref={typeInput}
                          onChange={() => setMedia("blog")}
                          type="radio"
                          name="media"
                        />
                      </Grid>
                      <Grid>
                        <label className=" radio">podcast</label>
                        <input
                          value={media}
                          ref={typeInput}
                          onChange={() => setMedia("podcast")}
                          type="radio"
                          name="media"
                        />
                      </Grid>
                      <Grid>
                        <label className=" radio">channel</label>
                        <input
                          value={media}
                          ref={typeInput}
                          onChange={() => setMedia("channel")}
                          type="radio"
                          name="media"
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
                      className="form-control file-input"
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
                          onClick={createMedia}
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

export default AdminCreateMediaC;
