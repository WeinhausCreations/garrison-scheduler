import { useContext } from "react";
import apiContext from "./apiContext";

const useAPI = () => {
    return useContext(apiContext);
};

export default useAPI;
