import { useState, useRef, useEffect } from "react";
import "./Main.scss";
import search from "../../images/chercher.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { watch } from "fs";

export type PostersType = {
  _id: string;
  name: string;
  date: string;
  image: string;
};

const Main = () => {
  const [data, setData] = useState<PostersType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/home?page=${currentPage}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();
  }, [currentPage]);

  const deleteArticle = async (id: string) => {
    try {
      await axios.delete(`/home/${id}`);
      setData((prevData) => prevData.filter((article) => article._id !== id));
    } catch (error) {
      setError("An error occurred while deleting the poster");
    }
  };

  const changePage = (step: number) => {
    setCurrentPage((prev) => Math.max(prev + step, 1));
  };

  const postersFilter = async (filter: string) => {
    try {
      const chosedData = await axios(`/home?category=${filter}`);
      setData(chosedData.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <main className="main_container">
      <div className="main_search_container">
        <select
          onChange={(event) => {
            postersFilter(event.target.value);
          }}
          className="main_categories_container"
        >
          <option>all categories</option>
          <option>popular</option>
          <option>recent</option>
          <option>limited edition</option>
        </select>
        <input
          type="text"
          placeholder="Que cherchez vous ?"
          className="main_input"
          ref={ref}
          onKeyDown={(event) => {
            if (event.key === "Enter" && ref.current) {
              setSearchTerm(ref.current.value.toLowerCase());
            }
          }}
        />
        <img
          src={search}
          alt="button search"
          className="main_search_img"
          onClick={() => {
            if (ref.current) {
              setSearchTerm(ref.current.value.toLowerCase());
            }
          }}
        />
      </div>
      <div className="main_posters_container">
        {data &&
          data
            .filter((poster: PostersType) => {
              const transIntoSmall = poster.name.toLowerCase();
              return transIntoSmall.includes(searchTerm);
            })
            .map((poster) => {
              return (
                <div key={poster._id} className="main_poster">
                  <Link
                    to={`/article/${poster._id}`}
                    className="main_poster_link"
                  >
                    <img
                      src={
                        typeof poster.image === "string"
                          ? poster.image
                          : URL.createObjectURL(poster.image)
                      }
                      alt="poster of manga"
                      className="main_poster_img"
                    />
                    <p>{poster.name}</p>
                    <p>{poster.date}</p>
                  </Link>
                  <div className="main_poster_update_delete">
                    <Link
                      className="main_poster_link_update"
                      to={`/update/${poster._id}`}
                    >
                      update
                    </Link>
                    <button onClick={() => deleteArticle(poster._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="main_change">
        <button onClick={() => changePage(-1)}>previous</button>
        <button onClick={() => changePage(1)}>next</button>
      </div>
    </main>
  );
};

export default Main;
