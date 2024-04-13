/* eslint-disable react/prop-types */
import "./Modal.css";
import { useForm } from "react-hook-form";
import { XCircle } from "react-feather";

export default function Modal({
  form,
  setForm,
  setIsModalOpen,
  modalType,
  handleSubmitForm,
}) {
  const {
    register,
    // handleSubmit,
    // watch,
    formState: { errors },
    trigger,
  } = useForm();

  return (
    <div className="modal-rework">
      <div className="edit-modal-rework">
        <button
          onClick={() => setIsModalOpen(false)}
          className="edit-modal-btn-cerr"
        >
          <XCircle />
        </button>
        {modalType === "new" ? (
          <h2>Add New Product</h2>
        ) : (
          <h2>Edit Producto</h2>
        )}
        <form
          className="modal-formul-container"
          onSubmit={handleSubmitForm}
        >
          <label htmlFor="title">Title</label>
          {errors.title && (
            <p className="modal-formul-error">{errors.title.message}</p>
          )}
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Please enter a title",
              maxLength: {
                value: 40,
                message: "Please enter a title with less than 40 characters",
              },
              minLength: {
                value: 5,
                message: "Please enter a title with more than 5 characters",
              },
              onBlur: () => trigger("title"),
            })}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <label htmlFor="price">Price</label>
          {errors.price && (
            <p className="modal-formul-error">{errors.price.message}</p>
          )}
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Please enter a price",
              min: {
                value: 0.01,
                message: "Please enter a price greater than 0",
              },
              onBlur: () => trigger("price"),
            })}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <label htmlFor="description">Description</label>
          {errors.description && (
            <p className="modal-formul-error">{errors.description.message}</p>
          )}
          <textarea
            type="text"
            id="description"
            {...register("description", {
              required: "Please enter a description",
              maxLength: {
                value: 200,
                message:
                  "Please enter a description with less than 20 characters",
              },
              minLength: {
                value: 10,
                message:
                  "Please enter a description with more than 10 characters",
              },
              onBlur: () => trigger("description"),
            })}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <label htmlFor="category">Category</label>
          {errors.category && (
            <p className="modal-formul-error">{errors.category.message}</p>
          )}
          <input
            type="text"
            id="category"
            {...register("category", {
              required: "Please enter a category",
              maxLength: {
                value: 20,
                message: "Please enter a category with less than 20 characters",
              },
              minLength: {
                value: 3,
                message: "Please enter a category with more than 3 characters",
              },
              onBlur: () => trigger("category"),
            })}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <label htmlFor="image">Image</label>
          {errors.image && (
            <p className="modal-formul-error">{errors.image.message}</p>
          )}
          <input
            type="text"
            id="image"
            {...register("image", {
              required: "Please enter an image URL",
              validate: (value) => {
                let pattern = new RegExp(
                  "^(https?:\\/\\/)?" + // protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                    "(\\:\\d+)?" + // port
                    "(\\/[-a-z\\d%_.~+]*)*" + // path
                    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                    "(\\#[-a-z\\d_]*)?$",
                  "i"
                ); // fragment locator
                return !!pattern.test(value) || "Please enter a valid URL";
              },
              onBlur: () => trigger("image"),
            })}
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
