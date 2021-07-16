import { FC } from "react";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

const Logo: FC = () => {
  return (
    <>
      <MediaQuery query="(min-width: 600px)">
        <Link to="/">
          <img src="/img/logo.png" alt="ロゴ" height="50px" />
        </Link>
      </MediaQuery>
      <MediaQuery query="(max-width: 599px)">
        <Link to="/">
          <img src="/img/logo.png" alt="ロゴ" height="30px" width="160px" />
        </Link>
      </MediaQuery>
    </>
  );
};

export default Logo;
