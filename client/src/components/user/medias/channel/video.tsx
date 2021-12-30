import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../../apis/indexAPI";
import AccountHeaderC from "../../standard/accountNav";
import MenuHeaderC from "../../standard/menuNav";
import FooterC from "../../standard/footer";

const VideoC: FC = () => {
  const { product, id } = useParams();

    const [, setImageBuffer] = useState("");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const channelResponse = await IndexAPI.get(
          `/products/${product}/${id}`
        );

        if (channelResponse.data.data.item.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${channelResponse.data.data.item.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await IndexAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC/>
      <FooterC />
    </div>
  );
};

export default VideoC;
