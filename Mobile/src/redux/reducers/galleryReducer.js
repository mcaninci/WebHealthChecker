import { IMAGES_LOADED,START_IMAGES_LOADING, CLEAR_IMAGES } from '../actions/types';
  // Initial state
  const initialState = {
    isLoading: false,
    images: [],
  };
// Reducer
export default function GalleryStateReducer(state = initialState, action = {}) {
    switch (action.type) {
      case START_IMAGES_LOADING:
        return Object.assign({}, state, {
          isLoading: true,
        });
      case IMAGES_LOADED:
        return Object.assign({}, state, {
          isLoading: false,
          images: action.images,
        });
      case CLEAR_IMAGES:
        return Object.assign({}, state, {
          images: [],
        });
      default:
        return state;
    }
  }