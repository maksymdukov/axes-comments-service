import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { fetchImagesApi } from "../apis/get-images.api";
import { getLanguagesMap } from "utils/languages";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    ownerFilter: "true",
    ...paginationState,
    ...fetchState(),
  },
  reducers: {
    updateImage: (state, { payload }) => {
      const { id, updatedImage } = payload;
      state.items = state.items.map((img) => {
        if (img.id === id) {
          const updLanguages = getLanguagesMap(updatedImage);
          img.languages = img.languages.map((lng) => {
            return {
              ...lng,
              title: updLanguages[lng.language.name].title,
            };
          });
        }
        return img;
      });
    },
    updateOwnerFilter: (state, { payload }) => {
      const { value } = payload;
      state.ownerFilter = value;
    },
    ...fetchReducers,
    ...paginationReducer,
  },
});

export const {
  fetchFail,
  fetchStart,
  fetchSuccess,
  updatePagination: updateGalleryPagination,
  updateImage,
  updateOwnerFilter: updateImageOwnerFilter,
} = gallerySlice.actions;

export const getGalleryLoading = (state) => state.gallery.loading;
export const getGalleryOwnerFilter = (state) => state.gallery.ownerFilter;
export const getGalleryPagination = makePaginationSelector("gallery");
export const getGalleryImages = (state) => state.gallery.items;

export const fetchGallery = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getGalleryPagination(state);
    const isAdmin = getGalleryOwnerFilter(state);
    dispatch(fetchStart());
    const { data } = await fetchImagesApi({ page, size, isAdmin });
    dispatch(fetchSuccess({ items: data.items, total: data.total }));
  } catch (error) {
    console.log(error);

    dispatch(fetchFail({}));
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const galleryReducer = gallerySlice.reducer;
