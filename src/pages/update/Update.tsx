import React, { useCallback, useEffect, useState } from "react";
import "./Update.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type UpdateType = {
  _id: string;
  name: string;
  date: number;
  image: any;
  category: string;
};

function Update() {
  const { id } = useParams();
  const [article, setArticle] = useState<null | UpdateType>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFile(event.target.files ? event.target.files[0] : null);
    },
    []
  );

  useEffect(() => {
    axios
      .get(`/article/${id}`)
      .then((reponse) => {
        setArticle(reponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const formData = new FormData();

      if (article) {
        formData.append("id", article._id);
        formData.append("name", article.name);
        formData.append("date", article.date.toString());
        formData.append("category", article.category);
        formData.append("image", article.image);
      }

      if (file) {
        formData.append("image", file);
      }

      axios
        .put(`/update/${id}`, formData)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error:", error));
    },
    [article, file, navigate, id]
  );

  if (isLoading) {
    return <h1 className="update_loading">Loading...</h1>;
  }

  return (
    <>
      <h1 className="update_title">Update Article</h1>
      <form onSubmit={handleSubmit} className="update_container">
        <input
          type="text"
          value={article?.name}
          onChange={(event) =>
            setArticle((e: any) => ({
              ...e,
              name: event.target.value,
            }))
          }
        />
        <input
          type="text"
          value={article?.date}
          onChange={(event) =>
            setArticle((e: any) => ({
              ...e,
              date: event.target.value,
            }))
          }
        />
        <img
          src={file ? URL.createObjectURL(file) : article?.image}
          className="update_image"
          alt="image of poster"
        />
        <input
          type="text"
          value={article?.image}
          onChange={(event) =>
            setArticle((e: any) => ({
              ...e,
              image: event.target.value,
            }))
          }
        />
        <select
          className="update_categories"
          value={article?.category}
          onChange={(event) =>
            setArticle((e: any) => ({ ...e, category: event.target.value }))
          }
        >
          <option value="popular">popular</option>
          <option value="recent">recent</option>
          <option value="limited edition">limited edition</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button className="update_button" type="submit">
          Upload
        </button>
      </form>
    </>
  );
}

export default Update;
