import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterComp = () => {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand href="#" name="Simple Blog" />
          <Footer.LinkGroup>
            <Footer.Link as={"div"}>
              <Link to={"/about"}>About</Link>
            </Footer.Link>
            <Footer.Link as={"div"}>
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </Footer.Link>

            <Footer.Link as={"div"}>
              <Link to={"/contact"}>Contact</Link>
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by="WebSmith Creations™"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
};
export default FooterComp;
