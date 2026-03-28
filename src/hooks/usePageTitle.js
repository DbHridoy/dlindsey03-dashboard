import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../store/slices/layoutSlice";

export function usePageTitle(title) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [dispatch, title]);
}
