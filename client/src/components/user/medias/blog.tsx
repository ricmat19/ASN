import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../standard/footer";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";

const BlogC: FC = () => {
  const { media, id } = useParams();

  const [, setTitle] = useState<string>("");
  const [, setInfo] = useState<string>("");
  const [, setImageBuffer] = useState("../../images/loading.svg");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        console.log(id)
        const mediaResponse = await IndexAPI.get(
          `/admin/medias/${media}/${id}`
        );
        console.log(mediaResponse.data.data.media)

        if (mediaResponse.data.data.media.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${mediaResponse.data.data.media.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setTitle(mediaResponse.data.data.media.title);
        setInfo(mediaResponse.data.data.media.info);
        
        // setSelectedProduct(mediaResponse.data.data.media)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div>
    <AccountHeaderC />
    <MenuHeaderC />
    <div className="main-body item-details"></div>
    <FooterC />
  </div>
  );
};

export default BlogC;
