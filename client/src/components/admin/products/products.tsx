import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import { IProduct } from "../../../interfaces";
import StoreMenuC from "./productsMenu";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";
import AddProduct from "./addProduct";
import { Grid, Button } from "@mui/material";

const AdminProductsC: FC = () => {

  const { product } = useParams();

  const [products, setProducts ] = useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((product) => {
      return (
        <Grid
          className="collection-item-div"
          key={product.id}
          onClick={() => displayItem(product.product, product.id)}
        >
          <Grid className="collection-item">
            <img className="collection-thumbnail" src={product.imageBuffer} />
          </Grid>
          <Grid>
            <Grid xs={12}>{product.title}</Grid>
          </Grid>
        </Grid>
      );
    });

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  let navigation = useNavigate();

  let productResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        productResponse = await IndexAPI.get(`/products/${product}`);
        console.log(productResponse.data.data)

        for (let i = 0; i < productResponse.data.data.products.length; i++) {
          if (productResponse.data.data.products[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${productResponse.data.data.products[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            productResponse.data.data.products[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setProducts(productResponse.data.data.products);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const displayItem = async (product: string, id: string) => {
    try {
      navigation(`/admin/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddProduct open={open} handleClose={handleClose}/>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <Button onClick={handleOpen}>Add Product</Button>
        <StoreMenuC />
        <div className="thumbnail-display">{displayItems}</div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"} pageRangeDisplayed={5} marginPagesDisplayed={5}/>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminProductsC;
