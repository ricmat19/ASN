import React, { FC, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import CollectionAPI from "../../apis/collectionAPI";
// import { CollectionContext } from "../../context/collectionContext";
import AdminHeaderC from "../admin/header";
import FooterC from "../footer";
// import Buffer from "buffer";
// import { Product } from "../../interfaces";

const AdminCollectionC: FC = () => {
  const { product } = useParams();
//   const { collection, setCollection } = useState<Product[]>([]);
  // const [pageNumber, setPageNumber] = useState<number>(0);

  // const itemsPerPage = 9;
  // const pagesVisted = pageNumber * itemsPerPage;

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const productResponse = await CollectionAPI.get(
          `/admin/collection/${product}`
        );
        console.log(productResponse);

//         for (let i = 0; i < productResponse.data.data.product.length; i++) {
//           if (productResponse.data.data.product[i].imagekey !== null) {
//             let imagesResponse = await CollectionAPI.get(
//               `/images/${productResponse.data.data.product[i].imagekey}`,
//               {
//                 responseType: "arraybuffer",
//               }
//             ).then((response) =>
//               Buffer.from(response.data, "binary").toString("base64")
//             );

//             productResponse.data.data.product[
//               i
//             ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
//           }
//         }

//         setCollection(productResponse.data.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

//   const displayItems = collection
//     .slice(pagesVisted, pagesVisted + itemsPerPage)
//     .map((item) => {
//       return (
//         <div key={item.id}>
//           <div className="collection-item-div">
//             <div className="collection-item">
//               <img
//                 className="collection-thumbnail"
//                 src={item.imageBuffer}
//                 alt="thumbnail"
//               />
//             </div>
//             <div className="collection-thumbnail-footer">
//               <div className="Title">{item.title}</div>
//               <div className="Price">${item.price}.00</div>
//             </div>
//           </div>
//           <div className="admin-buttons">
//             <div className="admin-collection-button-div text-center">
//               <div>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="btn form-button delete"
//                 >
//                   Delete
//                 </button>
//               </div>
//               <div>
//                 <button
//                   onClick={() => handleUpdate(item.id)}
//                   type="submit"
//                   className="btn form-button"
//                 >
//                   Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     });

//   const pageCount = Math.ceil(collection.length / itemsPerPage);

//   const changePage = ({ selected }): void => {
//     setPageNumber(selected);
//   };

//   let navigation = useNavigate();

//   const handleDelete = async (id: string) => {
//     try {
//       await CollectionAPI.delete(`/admin/delete/${id}`);
//       setCollection(
//         collection.filter((item) => {
//           return item.id !== id;
//         })
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUpdate = async (id: String) => {
//     try {
//       navigation.push(`/admin/update/${id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <div>
      <AdminHeaderC />
      {/* <div className="main-body">
        <div className="center subtitle-div">
          <a className="subtitle-anchor" href="/admin/collection/2D">
            <h1>2D art</h1>
          </a>
          <a className="subtitle-anchor" href="/admin/collection/3D">
            <h1>3D art</h1>
          </a>
          <a className="subtitle-anchor" href="/admin/collection/comic">
            <h1>comics</h1>
          </a>
        </div>
        <div className="collection-menu">{displayItems}</div> */}
        {/* <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"} pageRangeDisplayed={undefined} marginPagesDisplayed={undefined}/>
      </div> */}
      <FooterC />
    </div>
  );
};

export default AdminCollectionC;