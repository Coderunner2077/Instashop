import { useEffect, useState, useCallback } from "react";
import http from "../../lib/http";
import { formatError } from "../../utils";
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/actions";

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        if (!document) return;
        const listener = (event) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target) || null)) {
                return;
            }

            handler(event); // Call the handler only if the click is outside of the element passed.
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]); // Reload only if ref or handler changes
};

export const useRequest = ({ url, method = "post", onSuccess, message = "", params = {}, data = {}, onError = () => { }, headers }) => {
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState(null);
    const dispatch = useDispatch();

    const submit = useCallback(() => {
        setLoading(true);
        http.request({ method, url, params, headers, data })
            .then((res) => {
                setLoading(false);
                setResData(res.data);
                if (res.status % 200 < 99)
                    onSuccess(res.data);
                dispatch(addAlert({ type: res.status % 200 < 99 ? "success" : "warning", message: res.data?.message || message }));
            })
            .catch(error => {
                console.log("error: ", error);
                dispatch(addAlert({ type: "error", message: formatError(error) }))
                if (onError) onError(error);
                setLoading(false);
            })
    }, [url, data, params]);

    return { submit, loading, data: resData };
}

export function useDebounceEffect(
    fn,
    waitTime,
    deps,
) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps)
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
    }, deps)
}

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

export const useFetch = ({ url, method = "get", onSuccess, message = "", params = {}, data = {}, onError = () => { }, headers = { "Content-type": "application/json" } }) => {
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const query = useCallback(() => {
        setLoading(true);
        http.get(url)
            .then((res) => {
                setLoading(false);
                setResData(res.data);
                if (res.status % 200 < 99 && onSuccess)
                    onSuccess(res.data);
                if (message)
                    dispatch(addAlert({ type: res.status % 200 < 99 ? "success" : "warning", message: res.data?.message || message }));
            })
            .catch(error => {
                setError(error);
                dispatch(addAlert({ type: "error", message: formatError(error) }))
                if (onError) onError(error);
                setLoading(false);
            })
    }, [url, data, params]);

    useEffect(() => {
        query();
    }, []);

    return { query, loading, data: resData };
}
