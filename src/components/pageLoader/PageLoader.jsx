import { AnimatePresence, motion } from "framer-motion";
import Loader from "react-loader-spinner";
import "./PageLoader.scss";

const PageLoader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="loader-full"
        key="child"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}>
        <Loader
          type="ThreeDots"
          color="#FFF"
          height={40}
          width={40}
          timeout={3000}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
