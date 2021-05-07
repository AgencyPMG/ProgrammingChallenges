import React from 'react';

export class Todo extends React.Component {
    render() {
        const { todo, additionalProp } = this.props;
        return <h4
        >
            {todo.content} {additionalProp}
        </h4>;
    }
}

// export function Todo({ todo, additionalProp }) {
//     return <h4
//     >
//         {todo.content} {additionalProp}
//     </h4>;
// }
