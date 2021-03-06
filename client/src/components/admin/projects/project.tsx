import React, { useEffect, FC, useState, useRef } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../apis/indexAPI";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";
import { IProject } from "../../../interfaces";
import { Grid } from "@mui/material";

const AdminProjectC: FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [, setImages] = useState(null);
  const [info, setInfo] = useState<string>("");

  const [, setSelectedProduct] = useState<IProject[]>([]);
  const [imageBuffer, setImageBuffer] = useState("");

  const titleInput = useRef(null);
  const infoInput = useRef(null);

  useEffect((): void => {
    const fetchData = async () => {
      try {

        const projectResponse = await IndexAPI.get(
          `/admin/projects/${id}`
        );

        if (projectResponse.data.data.project.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${projectResponse.data.data.project.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(projectResponse.data.data.project)
        setTitle(projectResponse.data.data.project.title);
        setInfo(projectResponse.data.data.project.info);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateProject = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      // formData.append("images", images);
      formData.append("info", info);

      await IndexAPI.post("/admin/project/create", formData, {
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
        action="/admin/project/create"
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
                onClick={updateProject}
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

export default AdminProjectC;
