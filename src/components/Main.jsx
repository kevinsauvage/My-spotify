import React, { useContext } from "react";
import "../assets/stylesheets/Main.scss";
import Content from "./Content";
import ControlBar from "./ControlBar";
import SearchBar from "./SearchBar";
import { AppContext } from "../context/AppContext";
import Loader from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";

const Main = React.memo(() => {
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
});

export default Main;
