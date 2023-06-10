import { useState } from "react";
import "./AddArticle.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const InputField = ({
  value,
  setValue,
  placeholder,
  maxLength,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxLength: number;
}) => (
  <>
    <label>{placeholder}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      required
      maxLength={maxLength}
      onChange={(e) => setValue(e.target.value)}
    />
  </>
);

function AddArticle() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("all categories");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const add = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name, date, image, category };

    try {
      await axios.post("/add-article", data);
      navigate("/");
    } catch (error) {
      setError("An error occurred while adding the article");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="addArticle_container">
      <h1 className="addArticle_title">Create Article</h1>
      <form onSubmit={add} method="POST" className="addArticle_form">
        <div className="addArticle_fields_container">
          <InputField
            value={name}
            setValue={setName}
            placeholder="name you want attribute to this poster"
            maxLength={60}
          />
          <InputField
            value={date}
            setValue={setDate}
            placeholder="date when it was created"
            maxLength={40}
          />
          <InputField
            value={image}
            setValue={setImage}
            placeholder="URL of the poster"
            maxLength={150}
          />
        </div>
        <label>Choose the category your poster will be </label>
        <select
          className="addArticle_categories"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all categories">all categories</option>
          <option value="popular">popular</option>
          <option value="recent">recent</option>
          <option value="limited edition">limited edition</option>
        </select>
        <br />
        <input
          type="submit"
          value="create"
          className="addArticle_create_button"
        />
      </form>
    </div>
  );
}

export default AddArticle;
