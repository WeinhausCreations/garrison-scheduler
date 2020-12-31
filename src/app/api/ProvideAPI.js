import apiContext from "./apiContext";
import useProvideAPI from "./useProvideAPI";

const ProvideAPI = ({ children }) => {
    const api = useProvideAPI();
    return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export default ProvideAPI;
