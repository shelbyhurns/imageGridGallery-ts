import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import "styles/components/Lightbox.scss";

type ClickEvent = React.MouseEvent<HTMLElement>;

type LightboxContainerProps = {
  lightboxImageSrc: string;
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
  <i className="icon-keyboard_arrow_lef" onClick={onPrevImage} />
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
    const { open, onClose } = this.props;
    const isLightboxOverlay: boolean =
      e.currentTarget.className === "lightbox-overlay";
    const lightboxWrapper: any = ReactDom.findDOMNode(this);

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */
    if (!lightboxWrapper.contains(e.currentTarget) || isLightboxOverlay) {
      onClose(e.target);
    }
  };

  render(): JSX.Element {
    const { open, lightboxImageSrc, ...arrowProps } = this.props;

    return (
      <LightboxContainer lightboxImageSrc={lightboxImageSrc}>
        <Arrows {...arrowProps} />
        <div className="lightbox-overlay" />
      </LightboxContainer>
    );
  }
}
