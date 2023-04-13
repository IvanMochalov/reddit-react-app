import React from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface IDropdownPositionState {
  x: number;
  y: number;
}

const NOOP = () => {};

export function Dropdown({ button, children, isOpen, onClose = NOOP, onOpen = NOOP }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

  const [positionState, setPositionState] = React.useState<IDropdownPositionState>({ x: 0, y: 0 });

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
    setIsDropdownOpen(!isDropdownOpen)
    setPositionState(() => ({x: event.pageX, y: event.pageY}));
  }

  const node = document.querySelector('#dropdown_root');
  if (!node) return null;

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        { button }
      </div>
      {isDropdownOpen && ReactDOM.createPortal((
        <div className={styles.listContainer} style={{left: `${positionState.x-145}px`, top: `${positionState.y+30}px`}}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            { children }
          </div>
        </div>
      ), node)}
    </div>
  );
}
