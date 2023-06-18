import { useRef, useContext } from "react";
import "./Header.scss";
import search from "../../images/chercher.png";
import caddie from "../../images/caddie.png";
import utilisateur from "../../images/utilisateur.png";
import { Link } from "react-router-dom";
import { CartContext } from "../cartprovider/CartProvider";
import { getArticlesByCategory, getArticlesByFilter } from "../api";

function Header({
  setData,
  setHaveMorePages,
  setTotalPages,
  setCategory,
  category,
  setCurrentPage,
}: any) {
  const ref = useRef<HTMLInputElement>(null);
  const { cart }: any = useContext(CartContext);

  const fetchPosters = async (
    func: (param: string) => Promise<any>,
    parameter: string
  ) => {
    try {
      const chosedData = await func(parameter);
      setData(chosedData.articles);
      setHaveMorePages(chosedData.hasMore);
      setTotalPages(chosedData.numberOfTotalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setCategory(category);
    fetchPosters(getArticlesByCategory, category);
    setCurrentPage(1);
  };

  const handleSearch = async (filter: string) => {
    fetchPosters(getArticlesByFilter, filter);
  };
  return (
    <header className="header_container">
      <h1 className="header_title">
        <Link className="header_title_link" to="/">
          I-Market
        </Link>
      </h1>
      <div className="header_search_container">
        <select
          value={category}
          onChange={(event) => {
            handleCategoryChange(event.target.value);
          }}
          className="header_categories_container"
        >
          <option>all categories</option>
          <option>popular</option>
          <option>recent</option>
          <option>limited edition</option>
        </select>
        <input
          type="text"
          placeholder="Que cherchez vous ?"
          className="header_input"
          ref={ref}
          onKeyDown={(event) => {
            if (event.key === "Enter" && ref.current) {
              handleSearch(ref.current.value.toLowerCase());
            }
          }}
        />
        <img
          src={search}
          alt="button search"
          className="header_search_img"
          onClick={() => {
            if (ref.current) {
              handleSearch(ref.current.value.toLowerCase());
            }
          }}
        />
      </div>
      <Link to="/cart" className="header_cart">
        <img src={caddie} className="header_logo" />
        {cart.length > 0 && (
          <span className="header_number_of_articles">{cart.length}</span>
        )}
      </Link>
      <Link to="/authentication">
        <img src={utilisateur} className="header_logo" />
      </Link>
    </header>
  );
}

export default Header;
