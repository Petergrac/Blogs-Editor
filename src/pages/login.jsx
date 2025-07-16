import "../App.css";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isMobile = useMediaQuery({ maxWidth: 760 });
  // Animation
  useGSAP(() => {
    if (isMobile) {
      gsap.from(".anim", {
        y: -200,
        duration: 1,
        rotate: 45,
        ease: "bounce.out",
      });
    } else {
      const tl = gsap.timeline();
      tl.from(".anim", {
        y: -200,
        duration: 1,
        ease: "bounce.out",
      }).from(".log", {
        y: +700,
        rotation: 270,
        duration: 3,
        ease: "power2.out",
      });
    }
  }, []);
  //   Handle form
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Submitting the data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit data to server
  };
  return (
    <div
      className={`bg-slate-900 min-h-[100vh] anim ${isMobile ? "" : "flex"}`}
    >
      <div className={`${isMobile ? "hidden" : ""} relative`}>
        <p className="log absolute top-1/4 left-1/4 text-8xl text-white/75 backdrop-blur-xs backdrop-hue-rotate-30 font-bold">
          LOGIN
        </p>
        <img src="/authors.jpeg" alt="log image" className="log_image" />
      </div>
      <div className="flex min-h-[100vh] w-full md:w-[60vw] items-center justify-center flex-col">
        <div>
          <h2 className="heading ">Welcome to Authors Page</h2>
          <h2 className="subheading">Let's log you in quickly.</h2>
        </div>
        <div>
          <form
            className="flex flex-col "
            action="/login"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="text-blue-300/85 label">
              Email *:
              <input
                className="input"
                name="email"
                type="email"
                onChange={handleForm}
                value={formData.email}
                placeholder="example123@email.com"
                required
              />
            </label>
            <p className="text-red-500 hidden">Incorrect Email</p>
            <label className="text-blue-300/85 label" htmlFor="">
              Password *:
              <input
                className="input"
                type="password"
                name="password"
                onChange={handleForm}
                value={formData.password}
                required
                placeholder="Your password"
              />
            </label>
            <p className="text-red-500 hidden">Incorrect password</p>
            <div className="flex justify-center">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
