import React from "react";

export const withIdKey = withKey('id');
export const withIndexKey = withKey();

function withKey(key?: string) {
  return <E extends object, T extends React.ComponentType<E>>(component: T) =>
    (props: E, index: number) =>
      React.createElement(
        component,
        { ...props, key: key ? props[key as keyof E] : index },
        [],
      );
}
// Examples

// function Feed(props: { blocks: IBlockProps[] }) {
//   return (
//     <div>
//       {props.blocks.map(withIdKey(Block))}
//     </div>
//   );
// }

// interface IBlockProps {
//   title: string;
//   id: string;
// }

// function Block(props: IBlockProps) {
//   return (
//     <div>{props.title}</div>
//   )
// }





