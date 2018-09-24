import React, { MouseEvent } from "react";
import { Lightbox } from "app/components/Lightbox";
import "styles/components/ImageGrid.scss";

type ImageDataProperties = {
  thumbnail: string;
  thumbnailSrc: string;
  lightboxImage: string;
  lightboxImageSrc: string;
};

type State = {
  open: boolean;
  imageLength: null | number;
  atIndex: null | number;
};

type Props = {
  images: Array<ImageDataProperties>;
};

export class ImageGrid extends React.Component<Props, State> {
  state: State = {
    open: false,
    imageLength: null,
    atIndex: null
  };

  openImage = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
    const { images } = this.props;
    const { open } = this.state;
    const indexNumber = currentTarget.getAttribute("data-image-index");

    if (!open && indexNumber) {
      this.setState({
        open: true,
        imageLength: images.length,
        atIndex: parseInt(indexNumber, 10)
      });
    }
  };

  closeImage = () => {
    this.setState({
      open: false
    });
  };

  nextImage = () => {
    const { atIndex, imageLength } = this.state;

    if (atIndex !== null && imageLength) {
      this.setState({
        atIndex: (atIndex + 1) % imageLength
      });
    }
  };

  prevImage = () => {
    const { atIndex, imageLength } = this.state;

    //Set state to last image to loop the images
    if (atIndex !== null && imageLength) {
      const lastImage = imageLength - 1;
      let imageIndex = atIndex < 1 ? lastImage : atIndex - 1;

      this.setState({
        atIndex: imageIndex
      });
    }
  };

  getLightboxImageSrc = () => {
    const { atIndex } = this.state;
    const { images } = this.props;
    let lightboxImageSrc = "";
    let imageDataProperties;

    if (atIndex !== null) {
      imageDataProperties = images[atIndex];
      lightboxImageSrc = `${imageDataProperties.lightboxImageSrc}${
        imageDataProperties.lightboxImage
      }`;
    }
    return lightboxImageSrc;
  };

  render() {
    const { open } = this.state;
    const { images } = this.props;

    return (
      <div className="thumbnail-container">
        <div className="grid">
          {images.map((list, index) => (
            <div
              className="cell"
              onClick={this.openImage}
              key={index}
              data-image-index={index}
            >
              <img
                src={`${list.thumbnailSrc}${list.thumbnail}`}
                className="image"
              />
            </div>
          ))}
        </div>
        {open && (
          <Lightbox
            images={images}
            lightboxImageSrc={this.getLightboxImageSrc()}
            open={open}
            onPrevImage={this.prevImage}
            onNextImage={this.nextImage}
            onClose={this.closeImage}
          />
        )}
      </div>
    );
  }
}
