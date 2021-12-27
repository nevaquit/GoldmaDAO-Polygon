import HectorIcon from "../../assets/icons/papa-nav-header.svg";
import "./notfound.scss";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <a href="https://dolamadao.co" target="_blank">
          <img className="branding-header-icon" src={HectorIcon} alt="GoldmaDao" />
        </a>

        <h2 style={{ textAlign: "center" }}>Page not found</h2>
      </div>
    </div>
  );
}
