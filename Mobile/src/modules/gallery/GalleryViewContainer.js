import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import GalleryScreen from './GalleryView';
import { loadImages, refreshImages } from './../../redux/actions/galleryActions';

export default compose(
  connect(
    state => ({
      isLoading: state.gallery.isLoading,
      images: state.gallery.images,
      composestatevalue:false
    }),
    dispatch => ({
      loadImages: () => dispatch(loadImages()),
      refreshImages: () => dispatch(refreshImages()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadImages();
    },
  }),
)(GalleryScreen);
