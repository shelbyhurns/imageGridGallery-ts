import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import "styles/components/Lightbox.scss";

type ClickEvent = React.MouseEvent<HTMLElement>;

type LightboxContainerProps = {
  lightboxImageSrc: string | any;
};

type LeftArrowProps = {
  onPrevImage: (e: ClickEvent) => void;
};

type RightArrowProps = {
  onNextImage: (e: ClickEvent) => void;
};

type ArrowsProps = LeftArrowProps & RightArrowProps;

type LightboxProps = {
  images: any;
  onPrevImage: (e: ClickEvent) => void;
  onNextImage: (e: ClickEvent) => void;
  onClose: (el: ReactElement<HTMLDocument>) => void;
  open: boolean;
};

type Props = ArrowsProps & LightboxProps & LightboxContainerProps;

const LightboxContainer: React.SFC<LightboxContainerProps> = ({
  lightboxImageSrc,
  children
}) => (
  <div className="lightbox-container">
    <div className="lightbox-img-container">
      <img src={lightboxImageSrc} className="lightbox-img" />
    </div>
    {children}
  </div>
);

const LeftArrow: React.SFC<LeftArrowProps> = ({ onPrevImage }) => (
  <i className="icon-keyboard_arrow_left" onClick={onPrevImage} />
);

const RightArrow: React.SFC<RightArrowProps> = ({ onNextImage }) => (
  <i className="icon-keyboard_arrow_right" onClick={onNextImage} />
);

const Arrows: React.SFC<ArrowsProps> = ({ onNextImage, onPrevImage }) => (
  <div className="navigation-container">
    <LeftArrow onPrevImage={onPrevImage} />
    <RightArrow onNextImage={onNextImage} />
  </div>
);

export class Lightbox extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener("click", this.handleGlobalClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleGlobalClick);
  }

  handleGlobalClick = (e: any): void => {
    const { onClose } = this.props;
    const isLightboxOverlay: boolean =
      e.target.className === "lightbox-overlay";
    const lightboxWrapper: any = ReactDom.findDOMNode(this);

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */
    if (!lightboxWrapper.contains(e.target) || isLightboxOverlay) {
      onClose(e.target);
    }
  };

  render(): JSX.Element {
    const { lightboxImageSrc, onNextImage, onPrevImage } = this.props;

    return (
      <LightboxContainer lightboxImageSrc={lightboxImageSrc}>
        <Arrows onNextImage={onNextImage} onPrevImage={onPrevImage} />
        <div className="lightbox-overlay" />
      </LightboxContainer>
    );
  }
}
