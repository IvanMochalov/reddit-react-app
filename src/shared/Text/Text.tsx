import React from 'react';
import styles from './text.css';
import classNames from 'classnames';
import { EColors } from '../../exports';



type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

interface ITextProps {
  As?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColors;
}

export function Text(props: ITextProps) {
  const {
    As = 'span',
    color = EColors.black,
    children,
    size,
    mobileSize,
    tabletSize,
    desktopSize,
  } = props;

  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
  );

  return (
    <As className={classes}>
      {children}
    </As>
  );
}
