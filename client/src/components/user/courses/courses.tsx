import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import { ICourse } from "../../../interfaces";
import AccountNavC from "../standard/accountNav";
import FooterC from "../standard/footer";
import CoursesMenuC from "./coursesMenu";
import MenuNavC from "../standard/menuNav";

const CoursesC: FC = () => {

  const { subject } = useParams();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  let courseResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        courseResponse = await IndexAPI.get(`/courses/${subject}`);
        console.log(courseResponse)

        for (let i = 0; i < courseResponse.data.data.courses.length; i++) {
          if (courseResponse.data.data.courses[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${courseResponse.data.data.courses[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            courseResponse.data.data.courses[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setCourses(courseResponse.data.data.courses);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  const displayCourses = courses
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((course) => {
      return (
        <div
          className="collection-item-div"
          key={course.id}
          onClick={() => displayCourse(course.subject, course.id)}
        >
          <div className="collection-item">
            <img className="collection-thumbnail" src={course.imageBuffer} />
          </div>
          <div className="collection-thumbnail-footer">
            <div>{course.title}</div>
            <div className="price">${course.price}.00</div>
          </div>
        </div>
      );
    });

  let navigation = useNavigate();

  const displayCourse = async (subject: string, id: string) => {
    try {
      navigation(`/courses/${subject}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
        <CoursesMenuC />
        <div className="thumbnail-display">{displayCourses}</div>
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

export default CoursesC;
CoursesC