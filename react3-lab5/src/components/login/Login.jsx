import { useContext } from "react";
import "./Login.css";
import { UserContext } from "../../contextos/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const navegate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = handleSubmit((form) => {
    if (user.isLogged) {
      setUser({
        ...user,
        isLogged: false,
      });
      navegate("/");
    } else if (!user.isLogged) {
      if (!form.name || !form.email) {
        alert("Please, add camps");
        return;
      }
      const role = form.email.includes("@admin") ? "admin" : "user";
      setUser({
        ...user,
        ...form,
        isLogged: true,
        role,
      });
      navegate(location.state?.pathname);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="login-formulario"
    >
      {!user.isLogged && (
        <>
          <label htmlFor="name">Name:</label>
          {errors.name && (
            <p className="login-formulario-error-msg">{errors.name.message}</p>
          )}
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Please name is qualifiqued:",
              minLength: { value: 4, message: "Minimum 4 characteres" },
              maxLength: { value: 25, message: "Maximum 25 characteres" },
              onBlur: () => trigger("name"),
            })}
          />

          <label htmlFor="email">Email:</label>
          {errors.email && (
            <p className="login-formulario-msg">{errors.email.message}</p>
          )}
          <input
            type="email"
            id="email"
            {...register("email", {
              required: " Enter your email:",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,6}$/,
                message: "Invalid  format",
              },
              onBlur: () => trigger("email"),
            })}
          />
          <label htmlFor="password">Password:</label>
          {errors.password && (
            <p className="login-formulario-msg">{errors.password.message}</p>
          )}
          <input
            type="password"
            id="password"
            {...register("password", {
              required: " Enter your password:",
              minLength: { value: 10, message: "Minimum 10 characteres" },
              onBlur: () => trigger("password"),
            })}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          {errors.confirmPassword && (
            <p className="login-formulario-msg">
              {errors.confirmPassword.message}
            </p>
          )}
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Can you repeat your password:",
              onBlur: () => trigger("confirmPassword"),
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
          />
        </>
      )}

      {user.isLogged ? <button>Logoff</button> : <button>Login</button>}
      {user.isLogged && <p>{`${user.name}, Close session ?`}</p>}
    </form>
  );
}
