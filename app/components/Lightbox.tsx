import React, { ReactElement, HTMLProps } from "react";
import ReactDom from "react-dom";
import "styles/components/Lightbox.scss";

type ClickEvent = React.MouseEvent<HTMLElement>;

type LightboxContainerProps = {
  lightboxImageSrc: string;
};

type ArrowsProps = {
  onPrevImage: (e: ClickEvent) => void;
  onNextImage: (e: ClickEvent) => void;
};

type LightboxProps = {
  images: Array<object>;
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

const LeftArrow: React.SFC<HTMLProps<HTMLElement>> = ({ ...rest }) => (
  <i className="icon-keyboard_arrow_left" {...rest} />
);

const RightArrow: React.SFC<HTMLProps<HTMLElement>> = ({ ...rest }) => (
  <i className="icon-keyboard_arrow_right" {...rest} />
);

const Arrows: React.SFC<ArrowsProps> = ({ onNextImage, onPrevImage }) => (
  <div className="navigation-container">
    <LeftArrow onClick={onPrevImage} />
    <RightArrow onClick={onNextImage} />
  </div>
);

export class Lightbox extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener("click", this.handleGlobalClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleGlobalClick);
  }

  handleGlobalClick = ({ target }: any) => {
    const { onClose } = this.props;
    const isLightboxOverlay = target.className === "lightbox-overlay";
    const lightboxWrapper = ReactDom.findDOMNode(this)!;

    /**
     * Close the displayed image if the click doesn't match
     * any of the target className elements
     */
    if (!lightboxWrapper.contains(target) || isLightboxOverlay) {
      onClose(target);
    }
  };

  render() {
    const { lightboxImageSrc, onNextImage, onPrevImage } = this.props;

    return (
      <LightboxContainer lightboxImageSrc={lightboxImageSrc}>
        <Arrows onNextImage={onNextImage} onPrevImage={onPrevImage} />
        <div className="lightbox-overlay" />
      </LightboxContainer>
    );
  }
}
