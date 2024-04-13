import "./MainContent.css";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import Modal from "./Modal";
import useProductModal from "../../otherhook/ModalShop";
import { UserContext } from "../../contextos/UserContext";
import { useContext } from "react";
import { getAllProducts } from "../../redux/reducers/itemsReducer";
import { useSelector } from "react-redux";

export default function MainContent() {
  const {
    form,
    setForm,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    openEditProductModal,
    handleSubmitForm,
  } = useProductModal();

  const products = useSelector(getAllProducts);

  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  if (!products) {
    return;
  }

  function handleOpenNewProductModal() {
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "https://via.placeholder.com/150/92c952",
    });
    setModalType("new");
    setIsModalOpen(true);
  }

  function filteredProducts(data) {
    if (!search) {
      return data;
    } else {
      return data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  const mapeo = filteredProducts(products).map((product) => (
    <ProductCard
      setIsModalOpen={setIsModalOpen}
      key={product.id}
      product={product}
      openEditProductModal={openEditProductModal}
      setModalType={setModalType}
    />
  ));

  return (
    <>
      <main className="princi-container">{mapeo}</main>
      {user.isLogged && user.role === "admin" && (
        <button
          onClick={handleOpenNewProductModal}
          className="btn-modal"
        >
          Add New Item
        </button>
      )}
      {isModalOpen && (
        <Modal
          form={form}
          setForm={setForm}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          handleSubmitForm={handleSubmitForm}
        />
      )}
    </>
  );
}
