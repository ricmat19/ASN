import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import FooterC from "../../standard/footer";
import AdminHeaderC from "../header";

const AdminEventsC: FC = () => {
    return (
        <div>
            <AdminHeaderC />
            <div className="main-body">
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
                <div className="collection-menu">{displayItems}</div>
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
    
    export default AdminEventsC;