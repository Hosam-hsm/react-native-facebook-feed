import React from "react";
import { makeAutoObservable } from "mobx"

export default class Store {
    reactionsLongPressed = false

    constructor() {
        makeAutoObservable(this)
    }

    toggleReactionsLongPressed = () => {
        this.reactionsLongPressed = !this.reactionsLongPressed
    }

}

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
    return <Component {...props} store={useStore()} />;
};