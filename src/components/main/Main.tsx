import { useState, useEffect } from "react";
import "./Main.scss";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Pagination from "../pagination/Pagination";
import { getArticles, deleteArticle } from "../api";

export type PostersType = {
  _id: string;
  name: string;
  date: string;
  image: string;
};

const Main = () => {
  const [data, setData] = useState<PostersType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [haveMore, setHaveMore] = useState(false);
  const [category, setCategory] = useState("all categories");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getArticles(currentPage, category);
        setData(response.articles);
        setTotalPages(response.numberOfTotalPages);
        setHaveMore(response.hasMore);
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, category]);

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
      setData((prevData) => prevData.filter((article) => article._id !== id));
    } catch (error) {
      setError("An error occurred while deleting the poster");
    }
  };

  const renderArticles = () =>
    data.map((poster) => (
      <div key={poster._id} className="main_poster">
        <Link to={`/article/${poster._id}`} className="main_poster_link">
          <img
            src={
              typeof poster.image === "string"
                ? poster.image
                : URL.createObjectURL(poster.image)
            }
            alt="poster of manga"
            className="main_poster_img"
          />
        </Link>
        <div className="main_poster_update_delete">
          <Link
            className="main_poster_link_update"
            to={`/update/${poster._id}`}
          >
            update
          </Link>
          <button onClick={() => handleDelete(poster._id)}>Delete</button>
        </div>
      </div>
    ));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <Header
        setData={setData}
        setHaveMorePages={setHaveMore}
        setTotalPages={setTotalPages}
        category={category}
        setCategory={setCategory}
        setCurrentPage={setCurrentPage}
      />
      <main className="main_container">
        <div className="main_posters_container">
          {data.length > 0 ? renderArticles() : <p>No articles available</p>}
        </div>
        <div className="main_change">
          {haveMore && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
