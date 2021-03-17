import { useContext } from "react";
import "./Main.scss";
import Content from "../content/Content";
import ControlBar from "../../components/controlBar/ControlBar";
import SearchBar from "../../components/searchBar/SearchBar";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";

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
            <div
              id="my-scrollbar"
              style={{
                transform: props.showSearch
                  ? "translateY(0)"
                  : "translateY(-106px)",
                height: props.showSearch ? "92vh" : "107vh",
              }}>
              <SearchBar />
              <Content />
            </div>
            <ControlBar />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
