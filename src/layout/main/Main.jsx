import { useContext } from "react";
import "./Main.scss";
import Content from "../../route/content/Content";
import ControlBar from "../../components/controlBar/ControlBar";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";
import NavbarMobile from "../../components/navbarMobile/NavbarMobile";

const Main = () => {
  const props = useContext(AppContext);

  return (
    <div className="main">
      <AnimatePresence>
        {props.firstLoad ? (
          <motion.div
            className="loader-full"
            key="child"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            exit={{ opacity: 0 }}>
            <Loader
              type="ThreeDots"
              color="#FFF"
              height={40}
              width={40}
              timeout={4000}
            />
          </motion.div>
        ) : (
          <>
            <div id="my-scrollbar">
              <Content />
            </div>
            <ControlBar />
          </>
        )}
      </AnimatePresence>
      <NavbarMobile />
    </div>
  );
};

export default Main;
