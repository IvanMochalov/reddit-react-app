import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { MenuItemList } from './MenuItemList';
import { MenuIcon } from '../../../Icons'
import { Text } from '../../../Text';
import { EColors } from '../../../../exports';
import styles from './menu.css';


export function Menu() {
  return (
    <div className={styles.menu}>
        <Dropdown
          onClose={() => console.log('closed')}
          onOpen={() => console.log('opened')}
          isOpen={false}
          button={
            <button className={styles.menuButton}>
              <MenuIcon />
            </button>
          }
        >
          <div className={styles.dropdown}>
            <MenuItemList />
            <button className={styles.closeButton}>
              <Text mobileSize={12} size={14} color={EColors.grey66}>
                Закрыть
              </Text>
            </button>
          </div>
        </Dropdown>
    </div>
  );
}
