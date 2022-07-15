import { CSSProperties } from 'react';
import { StickerStyled } from './Stickers.styled';

interface Iprops {
  text: string;
  style?: CSSProperties;
  className?: string;
}

const Sticker = ({ text, style, className }: Iprops) => {
  return (
    <StickerStyled className={className} style={style}>
      <p>{text}</p>
    </StickerStyled>
  );
};

export default Sticker;
