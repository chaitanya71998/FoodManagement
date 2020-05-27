import React from 'react'
import { ButtonKind } from './styledComponent'
import { BrightBlue } from '../../themes/Colors'
class Button extends React.Component {
    static defaultProps = {
        width: '100%',
        backgroundColor: "#1db05f",
        children: "buttonName",
        color: "white"
    };
    render() {
        const { width, backgroundColor, children, color, onClick } = this.props
        return (
            <ButtonKind 
            width={width}
            backgroundColor={backgroundColor}
            color={color}
            onClick={onClick}
            >{children}</ButtonKind>
        )
    }

}

export { Button }
