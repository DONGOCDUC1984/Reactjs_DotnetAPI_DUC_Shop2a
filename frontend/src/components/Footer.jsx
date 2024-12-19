import React from "react";
import shop1 from "../images/shop1.png";
import "../style/Footer.css";
import { Zoom } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
function Footer() {
  return (
    <div className="container-fluid mt-1 ">
      <Zoom>
        <div className="row" id="Footerrow">
          <div className="Footerp1 col mt-1 d-flex justify-content-start ">
            <img src={shop1} alt="shop1" className="logoshop1"></img>
            <h3>DUC SHOP</h3>
          </div>

          <div className="col mt-1">
            <b>Contact us:</b>
            <p>
              {" "}
              <FontAwesomeIcon icon={faPhone} />
              Tel: 001122XXYY
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faEnvelope} /> Email: ducshop@gmail.com
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faLocationDot} /> Address: ABC Street
            </p>
          </div>

          <div className="col mt-1">
            <b>Follow DUC SHOP on:</b>
            <div className="Footericons">
              <a href="# ">
                <Facebook className="Footericon1" />
              </a>

              <a href="# ">
                <Twitter className="Footericon1" />
              </a>

              <a href="# ">
                <Instagram className="Footericon1" />
              </a>

              <a href="# ">
                <LinkedIn className="Footericon1" />
              </a>

              <a href="# ">
                <YouTube className="Footericon1" />
              </a>

              <a href="# ">
                <FontAwesomeIcon icon={faTiktok} className="Footericon2" />
              </a>
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
}

export default Footer;
