import React from 'react'
import { Button } from './styledComponents'
import { OutLineButton } from './OutLineButton'
class Buttons extends React.Component {
    static defaultProps = {
        children: 'buttonName',
        disabled: false,
        buttonType: "filled"
    }


    render() {
        const { buttonType } = this.props
        switch (buttonType) {
            case "filled":
                return (
                    <Button {...this.props}/>
                )
            case "outline":
                {
                    console.log("outline")
                    return (
                        <OutLineButton {...this.props}/>
                    )
                }
            default:
                {
                    console.warn("warn")
                    return null
                }
        }
    }
}

export { Buttons }
