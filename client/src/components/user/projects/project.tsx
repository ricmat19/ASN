import React, { FC } from "react";
// import { useParams } from "react-router";
// import IndexAPI from "../../../apis/indexAPI";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";
// import { ICart, IProduct } from "../../../interfaces";

const ProjectC: FC = () => {
  // const { product, id } = useParams();

  // const [, setCart] = useState<ICart[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([]);
  // const [title, setTitle] = useState<string>("");
  // const [price, setPrice] = useState<number>(0);
  // const [qty, setQty] = useState<number>(0);
  // const [info, setInfo] = useState<string>("");
  // const [imageBuffer, setImageBuffer] = useState("../../images/loading.svg");

  // useEffect((): void => {
  //   const fetchData = async () => {
  //     try {
  //       const productResponse = await IndexAPI.get(
  //         `/products/${product}/${id}`
  //       );

  //       if (productResponse.data.data.item.imagekey !== null) {
  //         let imagesResponse = await IndexAPI.get(
  //           `/images/${productResponse.data.data.item.imagekey}`,
  //           {
  //             responseType: "arraybuffer",
  //           }
  //         ).then((response) =>
  //           Buffer.from(response.data, "binary").toString("base64")
  //         );

  //         setImageBuffer(`data:image/png;base64,${imagesResponse}`);
  //       }
  //       setSelectedProduct(productResponse.data.data.item)
  //       setTitle(productResponse.data.data.item.title);
  //       setPrice(productResponse.data.data.item.price);
  //       setQty(productResponse.data.data.item.qty);
  //       setInfo(productResponse.data.data.item.info);

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const addToCart = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     const response = await IndexAPI.post("/cart", {
  //       id: id,
  //     });

  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await IndexAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

    // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <div className="main-body item-details"></div>
      <FooterC />
    </div>
  );
};

export default ProjectC;
