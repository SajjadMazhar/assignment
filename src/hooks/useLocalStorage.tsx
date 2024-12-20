import { useState } from "react";

function useLocalStorage(key: string, initialValue: any) {
    // Get the initial value from localStorage or use the initial value if it doesn't exist
    const storedValue = JSON.parse(localStorage.getItem(key)??'{list:null}');

    // If storedValue is not null, parse it as JSON. Otherwise, use the initialValue.
    const parsedValue = storedValue.list.length > 0 ? storedValue: {list:initialValue};

    // Use state to store the current value
    const [storedValueState, setStoredValueState] = useState(parsedValue.list);

    // Update localStorage whenever the state changes
    const setStoredValue = (value: any) => {
        setStoredValueState(value);
        localStorage.setItem(key, JSON.stringify({list:value}));
    };

    // Return the current value and the setter function
    return [storedValueState, setStoredValue];
}

export default useLocalStorage;
