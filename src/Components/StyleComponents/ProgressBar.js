import React from "react";

export const ProgressBar = (props) => {  
    const percent = () => (props.value / props.total) * 100;

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 5
    }
  
    const fillerStyles = {
        height: '100%',
        width: `${percent()}%`,
        backgroundColor: props.bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width .02s ease-in-out',
    }
  
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}></span>
            </div>
        </div>
    );
};
  
export default ProgressBar;