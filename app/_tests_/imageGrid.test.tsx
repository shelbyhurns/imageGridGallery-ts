import React from 'react';
import { mount } from 'enzyme';
import { ImageGrid } from '../components/ImageGrid';
import { Lightbox } from '../components/Lightbox';

const Images = [
  {
    thumbnail: 'apple_thumb.png',
    lightboxImage: 'apple.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  },
  {
    thumbnail: 'orange_thumb.png',
    lightboxImage: 'orange.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  },
  {
    thumbnail: 'grape_thumb.png',
    lightboxImage: 'grape.png',
    thumbnailSrc: '../Images/thumbnails/',
    lightboxImageSrc: '../Images/'
  }
];

describe('Thumbnail Gallery', () => {
  let imageGrid = mount(<ImageGrid images={Images} />);

  it('renders the `ImageGrid` component', () => {
    const thumbnailContainer = imageGrid.find('div.thumbnail-container');
    expect(thumbnailContainer.length).toEqual(1);
  });

  describe('when the `ImageGrid` is rendered', () => {
    it('should have three image thumbnails displayed', () => {
      const thumbnailContainer = imageGrid.find('img.image');
      expect(thumbnailContainer.length).toEqual(3);
    });
  });

  describe('when the `Lightbox` component is not rendered', () => {
    it('should not be rendered if none of the images are clicked', () => {
      const lightbox = imageGrid.find(Lightbox);
      expect(lightbox.exists()).toBe(false);
    });
  });

  describe('when the `Lightbox` component is rendered', () => {
    it('renders the `Lightbox` component when one of the images are clicked', () => {
      const thumbnailContainer = imageGrid.find('div.cell').first();
      thumbnailContainer.simulate('click');
      const lightbox = imageGrid.find(Lightbox);
      expect(lightbox.exists()).toBe(true);
    });
    it('unmounts the `Lightbox` component when one of the images are clicked', () => {});
  });
});
