import React, { MouseEvent } from "react";
import { Lightbox } from "app/components/Lightbox";
import "styles/components/ImageGrid.scss";

type imageDataProperties<T> = {
  thumbnail: T;
  thumbnailSrc: T;
  lightboxImage: T;
  lightboxImageSrc: T;
};

type State = {
  open: boolean;
  imageLength: Partial<null | number>;
  atIndex: Partial<null | number>;
};

type Props = {
  images: imageDataProperties<string>[];
};

export class ImageGrid extends React.Component<Props, State> {
  state: State = {
    open: false,
    imageLength: null,
    atIndex: null
  };

  public openImage = (e: MouseEvent<HTMLDivElement>): void => {
    const { images } = this.props;
    const { open } = this.state;
    const indexNumber: string | null = e.currentTarget.getAttribute(
      "data-image-index"
    );

    if (!open && indexNumber) {
      this.setState({
        open: true,
        imageLength: images.length,
        atIndex: parseInt(indexNumber, 10)
      });
    }
  };

  public closeImage = (): void => {
    this.setState({
      open: false
    });
  };

  public nextImage = (): void => {
    const { atIndex, imageLength } = this.state;

    if (atIndex !== null && imageLength !== null) {
      this.setState({
        atIndex: (atIndex + 1) % imageLength
      });
    }
  };

  public prevImage = (): void => {
    const { atIndex, imageLength } = this.state;

    //Set state to last image to loop the images
    if (atIndex !== null && imageLength !== null) {
      const lastImage: number = imageLength - 1;
      let imageIndex: number = atIndex < 1 ? lastImage : atIndex - 1;

      this.setState({
        atIndex: imageIndex
      });
    }
  };

  render(): JSX.Element {
    const { open, atIndex } = this.state;
    const { images } = this.props;
    let imageDataProperties;
    let lightboxImageSrc: any;

    if (atIndex !== null) {
      imageDataProperties = images[atIndex];
      lightboxImageSrc = `${imageDataProperties.lightboxImageSrc}${
        imageDataProperties.lightboxImage
      }`;
    }

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
            lightboxImageSrc={lightboxImageSrc}
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
