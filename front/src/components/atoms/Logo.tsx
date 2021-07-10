import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to="/">
      <img src="/img/logo.png" alt="ロゴ" />
    </Link>
  );
};

export default Logo;
