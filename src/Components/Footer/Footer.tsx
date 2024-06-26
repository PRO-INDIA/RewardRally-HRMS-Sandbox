import React, { FC } from "react";
import "./Footer.scss";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <div className="version-number">Version : v1.1.0</div>
);

export default Footer;
