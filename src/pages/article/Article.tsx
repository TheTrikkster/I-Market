import { useState, useEffect, useContext } from "react";
import "./Article.scss";
import { useParams } from "react-router-dom";
import { PostersType } from "../../components/main/Main";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { CartContext } from "../../components/cartprovider/CartProvider";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<null | PostersType>(null);
  const { addToCart }: any = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`/article/${id}`)
      .then((reponse) => setArticle(reponse.data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const putInCart = () => {
    return addToCart(article);
  };

  if (!article) {
    return <h1 className="article_loading">Loading...</h1>;
  }

  return (
    <>
      <Header />
      <div className="article_container">
        <img
          src={article.image}
          className="article_image"
          alt="poster of manga"
        />
        <div className="article_description_container">
          <h1>{article.name}</h1>
          <p>Date: {article.date}</p>
        </div>
        <button onClick={putInCart}>Add to cart</button>
      </div>
      <Footer />
    </>
  );
}

export default Article;
