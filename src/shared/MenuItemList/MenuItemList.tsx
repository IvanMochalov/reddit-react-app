import React from 'react';
import { Icon } from './../Icons';
import { Text } from './../Text';
import { EIcons, EColors } from './../../exports';
import styles from './menuitemlist.css';

export function MenuItemList() {
  return (
    <ul className={styles.menuItemsList}>
      <li className={styles.menuItem} >
        <Icon name={EIcons.comment} size={15} />
        <Text size={14} color={EColors.grey99}>Комментарии</Text>
      </li>

      <div className={styles.divider} />

      <li className={styles.menuItem}>
        <Icon name={EIcons.share} size={14} />
        <Text size={14} color={EColors.grey99}>Поделиться</Text>
      </li>
      <div className={styles.divider} />

      <li className={styles.menuItem}>
        <Icon name={EIcons.block} size={14} />
        <Text size={14} color={EColors.grey99}>Скрыть</Text>
      </li>
      <div className={styles.divider} />

      <li className={styles.menuItem}>
        <Icon name={EIcons.save} size={14} />
        <Text size={14} color={EColors.grey99}>Сохранить</Text>
      </li>
      <div className={styles.divider} />

      <li className={styles.menuItem}>
        <Icon name={EIcons.warning} size={16} />
        <Text size={14} color={EColors.grey99}>Пожаловаться</Text>
      </li>
    </ul>
  );
}
