import { AnimatePresence, motion } from "framer-motion";
import Loader from "react-loader-spinner";

const PageLoader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        key="child"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}>
        <Loader
          type="ThreeDots"
          color="#FFF"
          height={40}
          width={40}
          timeout={2000}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
