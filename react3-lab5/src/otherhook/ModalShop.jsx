import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllProducts } from "../redux/reducers/itemsReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductThunk,
  updateProductThunk,
} from "../redux/reducers/itemsReducer";

export default function useProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  // Manejar SUBMIT en el formulari en el MODAL para editar o crear un producto
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (modalType === "new") {
      const newProduct = {
        id: uuidv4(),
        title: form.title,
        price: form.price,
        description: form.description,
        category: form.category,
        image: form.image,
      };

      try {
        dispatch(addProductThunk(newProduct));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating object", error);
      }
    } else if (modalType === "edit") {
      const findProduct = products.find(
        (product) => product.id.toString() === form.id.toString()
      );
      const editedProduct = {
        ...findProduct,
        title: form.title,
        price: form.price,
        description: form.description,
        category: form.category,
        image: form.image,
      };

      try {
        dispatch(updateProductThunk(editedProduct));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating object", error);
      }
    }
  };

  // Para el boton de editar producto en el componente CARD
  const openEditProductModal = (id) => {
    const filteredProduct = products.filter(
      (product) => product.id.toString() === id.toString()
    );
    setForm({
      ...filteredProduct[0],
    });
    setIsModalOpen(true);
  };

  return {
    form,
    setForm,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    openEditProductModal,
    handleSubmitForm,
  };
}
