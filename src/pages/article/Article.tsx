import { useState, useEffect } from "react";
import "./Article.scss";
import { useParams } from "react-router-dom";
import { PostersType } from "../../components/main/Main";
import axios from "axios";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<null | PostersType>(null);

  useEffect(() => {
    axios
      .get(`/article/${id}`)
      .then((reponse) => setArticle(reponse.data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  if (!article) {
    return <h1 className="article_loading">Loading...</h1>;
  }

  return (
    <div className="article_container">
      <img
        src={article.image}
        className="article_image"
        alt="poster of manga"
      />
      <div className="article_description_container">
        <h1>{article.name}</h1>
        <p>{article.date}</p>
      </div>
    </div>
  );
}

export default Article;
