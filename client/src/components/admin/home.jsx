import React, { useContext, useEffect, useState } from "react";
import AdminHeaderC from "./header";
import FooterC from "../footer";
import CollectionAPI from "../../apis/collectionAPI";
import { CollectionContext } from "../../context/collectionContext";

const HomeC = () => {
  const { setCollection } = useContext(CollectionContext);
  const [twoDImage, setTwoDImage] = useState("");
  const [threeDImage, setThreeDImage] = useState("");
  const [comicImage, setComicImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await CollectionAPI.get(`/collection`);

        for (let i = 0; i < productResponse.data.data.collection.length; i++) {
          if (productResponse.data.data.collection[i].imagekey !== null) {
            let imagesResponse = await CollectionAPI.get(
              `/images/${productResponse.data.data.collection[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "2D"
            ) {
              setTwoDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "3D"
            ) {
              setThreeDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "comic"
            ) {
              setComicImage(`data:image/png;base64,${imagesResponse}`);
            }
          }
        }
        setCollection(productResponse.data.data.collection);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminHeaderC />
      <div className="main-body home-menu">
        <a href="collection/2D">
          <div className="menu-item">
            <img className="menu-image" src={twoDImage} alt="2d art" />
            <p className="title">2D art</p>
          </div>
        </a>
        <a href="collection/3D">
          <div className="menu-item">
            <img className="menu-image" src={threeDImage} alt="3d art" />
            <p className="title">3D art</p>
          </div>
        </a>
        <a href="collection/comic">
          <div className="menu-item">
            <img className="menu-image" src={comicImage} alt="comics" />
            <p className="title">comics</p>
          </div>
        </a>
      </div>
      <FooterC />
    </div>
  );
};

export default HomeC;
