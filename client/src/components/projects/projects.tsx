import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CollectionAPI from "../../apis/storeAPI";
import { IProduct } from "../../interfaces";
import AccountNavC from "../standard/accountNav";
import MenuNavC from "../standard/menuNav";
import FooterC from "../standard/footer";

const ProjectsC: FC = () => {

  const { project } = useParams();

  const [collection, setCollection ] = useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

  const displayItems = collection
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item) => {
      return (
        <div
          className="collection-item-div"
          key={item.id}
          onClick={() => displayItem(item.project)}
        >
          <div className="collection-item">
            <img className="collection-thumbnail" src={item.imageBuffer} />
          </div>
          <div className="collection-thumbnail-footer">
            <div>{item.title}</div>
            <div className="price">${item.price}.00</div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(collection.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  let navigation = useNavigate();

  let productResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        productResponse = await CollectionAPI.get(`/projects/${project}`);

        for (let i = 0; i < productResponse.data.data.product.length; i++) {
          if (productResponse.data.data.product[i].imagekey !== null) {
            let imagesResponse = await CollectionAPI.get(
              `/images/${productResponse.data.data.product[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            productResponse.data.data.product[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setCollection(productResponse.data.data.product);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const displayItem = async (project: string) => {
    try {
      navigation(`/projects/${project}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
        <div className="project-thumbnail-display">{displayItems}</div>
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

export default ProjectsC;