import cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { logout } from "redux/user/userActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function Error({ statusCode, error }) {
  const accessToken = cookie.get("token");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => dispatch(logout());

  return (
    <div className="c-error__page">
      <div className="c-error__wrapper">
        <div className="c-login__header">
          <Image
            className="c-login__logo"
            alt="alva live"
            width="80"
            height="80"
            src={`${process.env.PUBLIC_URL}/img/alva-iso-white.svg`}
          />
        </div>
        <div className="c-login__form">
          <div style={{ textAlign: "center" }}>{error && `Error ${error}`}</div>
          <p className="c-error__message">
            {statusCode
              ? `An error ${statusCode} occurred on server.`
              : "An error occurred on client."}
          </p>
          <div className="c-error__actions">
            <Link href={router.pathname}>
              <a
                type="button"
                className="c-error__button c-error__button--reload"
              >
                Reload
              </a>
            </Link>
            {!accessToken && (
              <Link href="/login">
                <a
                  type="button"
                  className="c-error__button c-error__button--login"
                >
                  Login
                </a>
              </Link>
            )}
            {accessToken && (
              <button
                type="button"
                className="c-error__button c-error__button--logout"
                onClick={handleLogout}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const errCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errCode;
  return { statusCode };
};

export default Error;
